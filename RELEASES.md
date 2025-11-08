# Release Strategy

> How we ship updates to closedNote, keeping things simple and reliable.

---

## 🏷️ Version Numbers

We use **MAJOR.MINOR.PATCH** format (like `1.2.3`):

- **MAJOR** (1.x.x): Big changes that might break things
- **MINOR** (x.2.x): New features that work with existing stuff
- **PATCH** (x.x.3): Bug fixes and small improvements

**Current version**: v0.01 (still early, expect changes!)

---

## 📅 When We Release

- **Bug fixes**: Whenever needed (could be daily!)
- **New features**: Every few weeks when ready
- **Big updates**: When we hit major milestones

No strict schedule, we ship when it's ready and tested. 🚀

---

## 🚀 How We Ship Updates

1. **Someone spots a bug or suggests a feature** → GitHub issue
2. **We (or a contributor) fix/build it** → Pull request
3. **Quick review and testing** → Make sure it works
4. **Merge to main** → Vercel auto-deploys to production
5. **Tag the release** → Create a version (e.g., v0.2.0)
6. **Update CHANGELOG.md** → Document what changed
7. **Announce it** → LinkedIn, X (Twitter), GitHub releases

Simple as that. No complicated pipelines or enterprise processes.

---

## 📝 What Goes in Each Release

Every release note includes:

- ✨ **New features** - What you can now do
- 🐛 **Bug fixes** - What we fixed
- 🔄 **Changes** - What works differently
- 🗑️ **Removed** - What's gone (rarely happens)

Example:
```markdown
## v0.2.0 - December 2025

✨ New
- Export prompts to JSON
- Offline mode (work without internet)

🐛 Fixed
- Search not working on mobile
- Dark mode button hiding on small screens
```

---

## 🚨 Emergency Fixes

If something breaks badly in production:

1. Create a hotfix branch
2. Fix it fast
3. Test quickly
4. Deploy immediately
5. Let everyone know

We'll patch critical bugs within hours, not days.

---

## 🎯 Release Checklist

Before shipping:

- [ ] Works on desktop and mobile
- [ ] Tested in Chrome, Firefox, Safari
- [ ] No console errors
- [ ] Dark mode looks good
- [ ] README updated if needed
- [ ] CHANGELOG updated
- [ ] Screenshots updated (for UI changes)

---

## 🔐 Security Updates

Found a security issue? Email **samuelaboderin@gmail.com** privately.

We'll:
1. Fix it quietly
2. Deploy the patch
3. Announce it after it's live
4. Credit you (if you want)

---

## 📢 Where We Announce Releases

- GitHub Releases page
- LinkedIn: [@samuelaboderin](https://www.linkedin.com/in/samuelaboderin)
- X: [@aboderinsamuel](https://x.com/aboderinsamuel)

Big milestones (like v1.0) might get:
- Product Hunt launch
- Blog post
- Email to contributors

---

## 🎉 Upcoming Milestones

### v0.2 (Next)
- Export/import prompts
- Offline support
- Better mobile navigation

### v1.0 (When ready)
- Super stable and tested
- All core features polished
- Ready for everyone to use daily

### v2.0 (Future)
- Team features
- Browser extension
- Mobile apps

See [ROADMAP.md](./ROADMAP.md) for the full plan.

---

## 🤝 How You Can Help

- Test pre-releases and report bugs
- Share feedback on new features
- Help with documentation
- Spread the word!

---

**Current Version**: v0.1  
**Last Updated**: November 2025  
**Built by a student, for everyone** 🇳🇬

---

Questions? Open an issue or DM [@aboderinsamuel](https://github.com/aboderinsamuel).
