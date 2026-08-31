-- Public share links for prompts (GH: Run & Compare + Share features)
-- Adds an opt-in "is_public" flag and RLS policies so anyone (including
-- anonymous visitors) can read a prompt the owner has explicitly published.

alter table public.prompts
  add column if not exists is_public boolean not null default false;

-- Partial index: we only ever query for the public ones.
create index if not exists prompts_is_public_idx
  on public.prompts(is_public)
  where is_public = true;

-- Anyone can read a prompt that is marked public. This is additive to the
-- existing owner-only policy (RLS SELECT policies are OR'd), and unpublishing
-- (is_public = false) immediately revokes anonymous access.
drop policy if exists "Public prompts are viewable by anyone" on public.prompts;
create policy "Public prompts are viewable by anyone"
  on public.prompts for select
  using (is_public = true);

-- Tags of a public prompt are readable by anyone, so the public page can
-- show them without exposing tags of private prompts.
drop policy if exists "Tags of public prompts are viewable by anyone" on public.tags;
create policy "Tags of public prompts are viewable by anyone"
  on public.tags for select
  using (
    exists (
      select 1 from public.prompts
      where prompts.id = tags.prompt_id
        and prompts.is_public = true
    )
  );
