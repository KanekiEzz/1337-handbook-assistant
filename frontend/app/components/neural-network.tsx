"use client"

import { useEffect, useRef } from "react"

interface NeuralNetworkProps {
  activeLayer: number
  mode: "inference" | "training" | "optimization"
}

export function NeuralNetwork({ activeLayer, mode }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const draw = () => {
      time += 0.015
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const width = canvas.offsetWidth
      const height = canvas.offsetHeight
      const layerCount = 7
      const maxNeuronsPerLayer = 12

      const colors = {
        inference: { node: "rgb(100, 150, 255)", edge: "rgba(100, 150, 255, 0.2)", active: "rgb(255, 100, 150)" },
        training: { node: "rgb(100, 255, 150)", edge: "rgba(100, 255, 150, 0.2)", active: "rgb(255, 200, 100)" },
        optimization: { node: "rgb(255, 150, 100)", edge: "rgba(255, 150, 100, 0.2)", active: "rgb(100, 200, 255)" },
      }

      const colorScheme = colors[mode]

      for (let layer = 0; layer < layerCount; layer++) {
        const x = (width / (layerCount + 1)) * (layer + 1)
        const neuronsCount = Math.min(maxNeuronsPerLayer, 3 + Math.floor(layer * 1.5))

        for (let neuron = 0; neuron < neuronsCount; neuron++) {
          const y = (height / (neuronsCount + 1)) * (neuron + 1)

          const isActive = Math.abs(layer - activeLayer / 20) < 1.5
          const pulseAmount = isActive ? Math.sin(time * 3) * 0.3 + 0.7 : 0.3
          const radius = 4 + pulseAmount * 4

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = isActive ? colorScheme.active : colorScheme.node
          ctx.fill()

          ctx.beginPath()
          ctx.arc(x, y, radius + 2, 0, Math.PI * 2)
          ctx.strokeStyle = isActive ? `rgba(255, 100, 150, ${0.3 * pulseAmount})` : `rgba(100, 150, 255, 0.1)`
          ctx.lineWidth = 2
          ctx.stroke()

          if (layer < layerCount - 1) {
            const nextNeuronCount = Math.min(maxNeuronsPerLayer, 3 + Math.floor((layer + 1) * 1.5))
            const nextX = (width / (layerCount + 1)) * (layer + 2)

            for (let j = 0; j < Math.min(2, nextNeuronCount); j++) {
              const targetIdx = (neuron + j) % nextNeuronCount
              const nextY = (height / (nextNeuronCount + 1)) * (targetIdx + 1)

              ctx.beginPath()
              ctx.moveTo(x, y)
              ctx.lineTo(nextX, nextY)
              ctx.strokeStyle = isActive ? `rgba(255, 100, 150, 0.4)` : colorScheme.edge
              ctx.lineWidth = isActive ? 2 : 1
              ctx.stroke()
            }
          }
        }
      }

      for (let i = 0; i < 5; i++) {
        const progress = (time * 0.5 + i / 5) % 1
        const x = width * progress - 20
        const y = height / 2 + Math.sin(time + i) * 40

        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 150, 100, ${0.6 - progress * 0.6})`
        ctx.fill()
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
  }, [activeLayer, mode])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
