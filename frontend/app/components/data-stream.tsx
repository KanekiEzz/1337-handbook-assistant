"use client"

import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"

interface DataStreamProps {
  name: string
}

export function DataStream({ name }: DataStreamProps) {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const initialLogs = Array.from({ length: 4 }, (_, i) => generateLog(i))
    setLogs(initialLogs)

    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLog = generateLog(Math.random() * 100)
        return [newLog, ...prev.slice(0, 3)]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-6 bg-white/[0.02] border border-white/5 backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 right-0 w-8 h-[1px] bg-primary/50" />
      <div className="absolute top-0 right-0 w-[1px] h-8 bg-primary/50" />

      <h4 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-4">{name}</h4>

      <div className="space-y-2 max-h-48 overflow-y-auto font-mono">
        {logs.map((log, i) => (
          <div
            key={i}
            className="text-[9px] text-muted-foreground flex items-start gap-2 animate-in fade-in slide-in-from-top-2"
          >
            <ChevronRight className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
            <span className="break-all">{log}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[8px] text-primary font-bold uppercase tracking-widest">Live</span>
      </div>
    </div>
  )
}

function generateLog(seed: number): string {
  const types = [
    `[PROCESS] chunk_${Math.floor(seed * 1000)} @ ${Math.random().toFixed(3)}s`,
    `[COMPUTE] matrix_mul completed: ${(Math.random() * 100).toFixed(1)}ms`,
    `[CACHE] hit_rate: ${(50 + Math.random() * 50).toFixed(1)}%`,
    `[STREAM] tokens: ${Math.floor(Math.random() * 5000 + 1000)}/batch`,
    `[SYNC] replica_${Math.floor(Math.random() * 8)} synchronized`,
    `[QUEUE] depth: ${Math.floor(Math.random() * 100 + 10)} items`,
  ]
  return types[Math.floor(seed * types.length)]
}
