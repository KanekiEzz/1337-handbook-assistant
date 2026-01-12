"use client"

import { useEffect, useState } from "react"
import { NothureBackground } from "@/app/components/nothure-background"
import { NeuralNetwork } from "@/app/components/neural-network"
import { DataStream } from "@/app/components/data-stream"
import { Zap, Brain, Radio, Activity, BarChart3, Lock } from "lucide-react"

export default function NeuralNetPage() {
  const [stats, setStats] = useState({
    layers: 127,
    neurons: 8192,
    weights: "42.3M",
    throughput: "12.7 GB/s",
    accuracy: 99.87,
    latency: 2.3,
  })

  const [activeLayer, setActiveLayer] = useState(0)
  const [mode, setMode] = useState<"inference" | "training" | "optimization">("inference")

  // Simulate real-time data stream updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        throughput: (Math.random() * 20 + 5).toFixed(1) + " GB/s",
        latency: (Math.random() * 5 + 0.5).toFixed(2),
        accuracy: Math.min(99.99, prev.accuracy + Math.random() * 0.05).toFixed(2),
      }))
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-background relative overflow-hidden font-mono selection:bg-primary/30">
      <NothureBackground />

      <nav className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/5 backdrop-blur-sm bg-black/20">
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-foreground flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-500">
              <div className="-rotate-45 group-hover:-rotate-90 transition-transform duration-500 text-background text-xs">
                V0
              </div>
            </div>
            <span className="glow-text tracking-[0.2em]">1337_SYS</span>
          </div>
          <div className="hidden md:flex gap-6 text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            <a href="/" className="hover:text-foreground transition-colors">
              Chat_Kaneki
            </a>
            <a href="/neural-net" className="text-primary font-bold">
              Neural_Net
            </a>
            <a href="/documentation" className="hover:text-foreground transition-colors">
              Documentation
            </a>
            <a href="/data" className="hover:text-foreground transition-colors">
              Data_Viewer
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[9px] text-muted-foreground uppercase tracking-tighter">
            <Activity className="w-3 h-3 text-primary animate-pulse" />
            <span>System_Stable</span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-16 pb-32">
        <div className="mb-12 space-y-6">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-[10px] text-primary tracking-widest font-black uppercase mb-4 animate-glitch">
            Neural_Processing_Unit_v2.0
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none glow-text">
              NEURAL <span className="text-muted-foreground opacity-50">|</span> NET
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Real-time neural network visualization with live data stream processing, model metrics, and adaptive
              optimization.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-3 space-y-6">
            <div className="p-6 bg-white/[0.02] border border-white/5 backdrop-blur-md space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Processing_Mode</h3>
              <div className="space-y-2">
                {(["inference", "training", "optimization"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`w-full p-3 text-[10px] uppercase tracking-widest font-bold transition-all ${
                      mode === m
                        ? "bg-primary text-black border border-primary"
                        : "bg-white/[0.01] border border-white/5 text-muted-foreground hover:bg-white/[0.02]"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 backdrop-blur-md space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Model_Parameters</h3>
              <div className="space-y-3">
                {[
                  { label: "Architecture", val: "Transformer_XL" },
                  { label: "Precision", val: "FP32_Mixed" },
                  { label: "Batch_Size", val: "256" },
                  { label: "Learning_Rate", val: "2e-4" },
                ].map((param, i) => (
                  <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-[9px] text-muted-foreground uppercase">{param.label}</span>
                    <span className="text-[9px] text-primary font-bold font-mono">{param.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 backdrop-blur-md space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Active_Layer</h3>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="127"
                  value={activeLayer}
                  onChange={(e) => setActiveLayer(Number.parseInt(e.target.value))}
                  className="flex-1 h-1 bg-white/10 accent-primary cursor-pointer"
                />
                <span className="text-[9px] font-mono text-primary font-bold">{activeLayer}/127</span>
              </div>
              <div className="text-[8px] text-muted-foreground">
                Neurons: {((activeLayer + 1) * 64).toLocaleString()} | Weights: {((activeLayer + 1) * 0.33).toFixed(1)}M
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <div className="relative h-[500px] bg-black border border-white/10 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 text-center text-[9px] uppercase tracking-widest text-muted-foreground opacity-50">
                    neural_processor // layer_{activeLayer}
                  </div>
                </div>
                <NeuralNetwork activeLayer={activeLayer} mode={mode} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "Layers", val: stats.layers, icon: Brain, color: "text-blue-400" },
                { label: "Neurons", val: stats.neurons, icon: Zap, color: "text-cyan-400" },
                { label: "Throughput", val: stats.throughput, icon: Radio, color: "text-green-400" },
                { label: "Latency", val: stats.latency + "ms", icon: BarChart3, color: "text-purple-400" },
                { label: "Accuracy", val: stats.accuracy + "%", icon: Lock, color: "text-red-400" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-4 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <stat.icon className={`w-4 h-4 ${stat.color} opacity-70`} />
                    <span className="text-[8px] text-muted-foreground uppercase tracking-tighter">{stat.label}</span>
                  </div>
                  <div className="text-lg font-black font-mono">{stat.val}</div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 backdrop-blur-md space-y-3">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Security_Status</h3>
              <div className="space-y-2 text-[9px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Encryption</span>
                  <span className="text-green-400">AES-256</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RLS_Active</span>
                  <span className="text-green-400 animate-pulse">●</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attestation</span>
                  <span className="text-green-400">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Real_Time_Data_Streams</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {["input_stream", "processing_queue", "output_buffer", "error_log"].map((stream) => (
              <DataStream key={stream} name={stream} />
            ))}
          </div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/5 py-8 px-8 flex flex-col md:flex-row justify-between items-center gap-8 bg-black/40 mt-12">
        <div className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground text-center md:text-left">
          NEURAL_PROCESSING_UNIT <br />
          <span className="text-primary/40">EST. 2026 // v0_1337_NEURAL</span>
        </div>
        <div className="text-[9px] uppercase tracking-widest font-black">
          Processing_Active <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-1" />
        </div>
      </footer>
    </main>
  )
}
