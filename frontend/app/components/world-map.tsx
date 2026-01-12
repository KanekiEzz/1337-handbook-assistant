"use client"

import { useEffect, useRef } from "react"

export function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const dots: { x: number; y: number; alpha: number; speed: number }[] = []
    const connections: { start: number; end: number; progress: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      dots.length = 0
      for (let i = 0; i < 40; i++) {
        dots.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          alpha: Math.random(),
          speed: 0.005 + Math.random() * 0.01,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "rgba(100, 150, 255, 0.1)"
      ctx.lineWidth = 0.5

      dots.forEach((dot, i) => {
        dot.alpha += dot.speed
        if (dot.alpha > 1 || dot.alpha < 0) dot.speed *= -1

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(100, 150, 255, ${dot.alpha * 0.5})`
        ctx.fill()

        for (let j = i + 1; j < dots.length; j++) {
          const d2 = dots[j]
          const dist = Math.hypot(dot.x - d2.x, dot.y - d2.y)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(dot.x, dot.y)
            ctx.lineTo(d2.x, d2.y)
            ctx.stroke()
          }
        }
      })

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
    <div className="w-full h-full relative overflow-hidden bg-black/40 border border-white/5 backdrop-blur-sm">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Live_Node_Mapping</span>
      </div>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
