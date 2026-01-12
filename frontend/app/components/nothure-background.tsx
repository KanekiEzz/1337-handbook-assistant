"use client"

import { useEffect, useRef } from "react"

export function NothureBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      ctx.strokeStyle = "rgba(100, 150, 255, 0.15)"
      ctx.lineWidth = 1

      for (let i = 0; i < 50; i++) {
        ctx.beginPath()
        const radius = 100 + i * 15
        const offset = Math.sin(time + i * 0.1) * 50

        for (let a = 0; a < Math.PI * 2; a += 0.1) {
          const x = centerX + Math.cos(a) * (radius + offset)
          const y = centerY + Math.sin(a) * (radius + offset)
          if (a === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        ctx.closePath()
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    window.addEventListener("resize", resize)
    resize()
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale contrast-125"
      >
        <source src="/images/banner_1337.mp4" type="video/mp4" />
      </video>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full mix-blend-screen opacity-50" />

      <div className="absolute inset-0 nothure-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />

      <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/20 animate-scanline shadow-[0_0_15px_rgba(100,150,255,0.5)]" />
    </div>
  )
}









