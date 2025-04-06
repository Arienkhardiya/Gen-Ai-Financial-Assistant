"use client"

import type React from "react"

import { useRef, useEffect } from "react"

interface AnimatedGradientBackgroundProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
}

export function AnimatedGradientBackground({
  children,
  className = "",
  colors = ["#3b82f6", "#2563eb", "#1d4ed8", "#60a5fa"],
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }

    // Set up particles
    const particles: {
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number
    }[] = []

    const createParticles = () => {
      const { width, height } = canvas

      // Clear existing particles
      particles.length = 0

      // Create new particles
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 20 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
        })
      }
    }

    const drawGradient = () => {
      const { width, height } = canvas

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, colors[0])
      gradient.addColorStop(1, colors[colors.length - 1])

      // Fill background
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }

    const drawParticles = () => {
      const { width, height } = canvas

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw background gradient
      drawGradient()

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1

        // Draw particle with glow
        ctx.save()
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius)
        gradient.addColorStop(0, particle.color + "40") // 25% opacity
        gradient.addColorStop(1, particle.color + "00") // 0% opacity

        ctx.fillStyle = gradient
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    }

    const animate = () => {
      drawParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    // Set up
    resize()
    createParticles()

    // Start animation
    animate()

    // Handle window resize
    window.addEventListener("resize", () => {
      resize()
      createParticles()
    })

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [colors])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

