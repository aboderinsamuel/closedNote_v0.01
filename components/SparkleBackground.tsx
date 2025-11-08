"use client"

import { useEffect, useState } from "react"

export function SparkleBackground() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
      }))
      setSparkles(newSparkles)
    }

    generateSparkles()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden dark:block hidden">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

