"use client"

import { useEffect, useState } from "react"
import { NothureBackground } from "../components/nothure-background"
import { Activity, RefreshCw, Copy, Trash2 } from "lucide-react"

interface DataEntry {
  id: number
  question: string
  answer: string
  createdAt: string
}

export default function DataPage() {
  const [data, setData] = useState<DataEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEntry, setSelectedEntry] = useState<DataEntry | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<string>("Connecting...")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setConnectionStatus("Fetching...")
    try {
      const response = await fetch("/api/data")

      if (response.ok) {
        const result = await response.json()
        setData(Array.isArray(result) ? result : [])
        setConnectionStatus("Connected")
        if (result.length > 0) setSelectedEntry(result[0])
      } else {
        setConnectionStatus("Connection Failed")
      }
    } catch (err) {
      console.error("[v0] Failed to fetch data:", err)
      setConnectionStatus("Connection Failed")
      const demoData: DataEntry[] = [
        {
          id: 1,
          question: "What is the 1337 handbook about?",
          answer:
            "The 1337 handbook is a comprehensive guide for programming and elite coding practices. It covers mandatory and bonus requirements for developers.",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          question: "What are the requirements?",
          answer:
            "Requirements include proper project structure, following code conventions, and completing all mandatory parts of the handbook.",
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
      ]
      setData(demoData)
      if (demoData.length > 0) setSelectedEntry(demoData[0])
    }
    setLoading(false)
  }

  const deleteEntry = async (id: number) => {
    try {
      await fetch(`/api/data/${id}`, { method: "DELETE" })

      // await fetch(`http://127.0.0.1:8080/data/${id}`, { method: "DELETE" })
      setData(data.filter((entry) => entry.id !== id))
      if (selectedEntry?.id === id) setSelectedEntry(data.length > 1 ? data[0] : null)
    } catch (err) {
      console.error("[v0] Failed to delete entry:", err)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

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
            <a href="/neural-net" className="hover:text-foreground transition-colors">
              Neural_Net
            </a>
            <a href="/documentation" className="hover:text-foreground transition-colors">
              Documentation
            </a>
            <a href="/data" className="text-primary font-bold">
              Data_Viewer
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[9px] text-muted-foreground uppercase tracking-tighter">
            <Activity className="w-3 h-3 text-primary animate-pulse" />
            <span>{connectionStatus}</span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-16 pb-32">
        <div className="mb-12 space-y-6">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-[10px] text-primary tracking-widest font-black uppercase mb-4 animate-glitch">
            Data_Viewer_v1.0
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none glow-text">
              DATA <span className="text-muted-foreground opacity-50">/</span> VIEWER
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              View and manage all data stored at KanekiEzz
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Data_Entries</h3>
                <button
                  onClick={fetchData}
                  className="text-[9px] px-2 py-1 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Refresh
                </button>
              </div>

              {loading ? (
                <div className="p-4 text-center text-[9px] text-muted-foreground border border-white/5 animate-pulse">
                  Loading data...
                </div>
              ) : data.length === 0 ? (
                <div className="p-4 text-center text-[9px] text-muted-foreground border border-white/5">
                  No data found
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {data.map((entry) => (
                    <div
                      key={entry.id}
                      onClick={() => setSelectedEntry(entry)}
                      className={`p-4 border cursor-pointer transition-all text-left ${
                        selectedEntry?.id === entry.id
                          ? "bg-primary/20 border-primary/80"
                          : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03]"
                      }`}
                    >
                      <h4 className="text-[9px] font-bold text-foreground truncate mb-1">{entry.question}</h4>
                      <p className="text-[8px] text-muted-foreground truncate">{entry.answer.substring(0, 60)}...</p>
                      <p className="text-[7px] text-muted-foreground/50 mt-2">{formatDate(entry.createdAt)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 backdrop-blur-md space-y-3">
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-[9px]">
                  <span className="text-muted-foreground">Total_Entries</span>
                  <span className="text-primary font-bold">{data.length}</span>
                </div>
                <div className="flex justify-between text-[9px]">
                  <span className="text-muted-foreground">Status</span>
                  <span className={`font-bold ${connectionStatus === "Connected" ? "text-green-400" : "text-red-400"}`}>
                    {connectionStatus}
                  </span>
                </div>
                <div className="flex justify-between text-[9px]">
                  <span className="text-muted-foreground">Endpoint</span>
                  <span className="text-primary font-mono text-[8px]">127.0.0.1:8080</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <div className="relative bg-black border border-white/10 overflow-hidden h-full min-h-[600px] flex flex-col">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex-1 text-center text-[9px] uppercase tracking-widest text-muted-foreground opacity-50">
                    data_viewer // entry_detail
                  </div>
                </div>

                {selectedEntry ? (
                  <div className="flex-1 p-6 flex flex-col gap-6 overflow-auto">
                    <div className="space-y-3 border-b border-white/10 pb-6">
                      <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Question</h3>
                      <div className="bg-white/[0.02] border border-white/5 p-4">
                        <p className="text-sm text-foreground font-bold">{selectedEntry.question}</p>
                      </div>
                    </div>

                    <div className="space-y-3 border-b border-white/10 pb-6">
                      <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Answer</h3>
                      <div className="bg-white/[0.02] border border-white/5 p-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">{selectedEntry.answer}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Metadata</h3>
                      <div className="grid grid-cols-2 gap-4 text-[9px]">
                        <div className="bg-white/[0.02] border border-white/5 p-3">
                          <p className="text-muted-foreground mb-1">ID</p>
                          <p className="text-foreground font-mono">{selectedEntry.id}</p>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-3">
                          <p className="text-muted-foreground mb-1">Created</p>
                          <p className="text-foreground font-mono text-[8px]">{formatDate(selectedEntry.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => copyToClipboard(selectedEntry.answer)}
                        className="flex-1 px-4 py-2 text-[9px] uppercase font-bold bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
                      >
                        <Copy className="w-3 h-3" />
                        Copy Answer
                      </button>
                      <button
                        onClick={() => deleteEntry(selectedEntry.id)}
                        className="flex-1 px-4 py-2 text-[9px] uppercase font-bold bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                        No Entry Selected
                      </div>
                      <p className="text-[9px] text-muted-foreground/50">
                        Select an entry from the list to view details
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/5 py-8 px-8 flex flex-col md:flex-row justify-between items-center gap-8 bg-black/40 mt-12">
        <div className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground text-center md:text-left">
          DATA_VIEWER_SYSTEM <br />
          <span className="text-primary/40">EST. 2026 // v0_1337_DATA</span>
        </div>
        <div className="text-[9px] uppercase tracking-widest font-black">
          Data_Active <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse ml-1" />
        </div>
      </footer>
    </main>
  )
}
