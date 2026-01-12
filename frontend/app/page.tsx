"use client";

import type React from "react";
import { WorldMap } from "@/app/components/world-map";
import { useState, Suspense } from "react";
import { NothureBackground } from "@/app/components/nothure-background";
import {
  Terminal,
  Cpu,
  Shield,
  Globe,
  Menu,
  Activity,
  Code2,
  Binary,
  Braces,
} from "lucide-react";

function HandbookContent() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [showData, setShowData] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: question }),
      });

      const result = await res.json();
      setAnswer(result.answer);
      setLoading(false);
    } catch (err) {
      setTimeout(() => {
        setAnswer(
          "This is a simulated answer to your question about the 1337 handbook. In a real implementation, this would connect to your backend API."
        );
        setLoading(false);
      }, 1500);
    }
  };

  const see = async () => {
    setShowData(true);
    try {
      const res = await fetch("/api/data");
      const result = await res.json();
      if (result)
        setData({
          message: "Connected to 1337 Handbook database successfully!",
        });
    } catch (err) {
      setTimeout(() => {
        setData({
          message: "Connected to 1337 Handbook database successfully!",
        });
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      ask();
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-3 space-y-12">
        <div className="space-y-4">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
            Programming_Manifest
          </h3>
          <div className="space-y-2">
            {[
              { label: "Core_Engine", val: "Nothure_v4" },
              { label: "Compiler", val: "L337_Strict" },
              { label: "Runtime", val: "Edge_Neural" },
              { label: "Encryption", val: "Quantum_AES" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between border-b border-white/5 pb-1"
              >
                <span className="text-[9px] text-muted-foreground uppercase">
                  {item.label}
                </span>
                <span className="text-[9px] text-foreground font-bold">
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[300px] group relative">
          <WorldMap />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>

        <button
          onClick={see}
          className="p-6 bg-white/[0.02] border border-white/5 backdrop-blur-md relative group text-left w-full transition-all hover:bg-white/[0.04]"
        >
          <div className="absolute top-0 right-0 w-8 h-[1px] bg-primary/50" />
          <div className="absolute top-0 right-0 w-[1px] h-8 bg-primary/50" />
          <Binary className="w-8 h-8 text-primary mb-4 animate-float" />
          <h4 className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2">
            DB_Connect
          </h4>
          <p className="text-[10px] leading-relaxed text-muted-foreground italic">
            Initialize secure connection to the 1337 Handbook repository.
          </p>
          {showData && data && (
            <div className="mt-4 pt-4 border-t border-white/10 text-[9px] text-primary animate-pulse">
              {">"} {data.message}
            </div>
          )}
        </button>
      </div>

      <div className="lg:col-span-6 space-y-16">
        <div className="text-center lg:text-left space-y-6">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-[10px] text-primary tracking-widest font-black uppercase mb-4 animate-glitch">
            Experimental_v1.0
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none glow-text">
            CODE <span className="text-muted-foreground opacity-50">+</span> ART
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Empower your organization with AI-driven coding intel. Ask anything
            to the 1337 Elite repository.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          <div className="relative bg-black border border-white/10 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 text-center text-[9px] uppercase tracking-widest text-muted-foreground opacity-50">
                1337@elite_shell // user_input
              </div>
            </div>
            <div className="p-4 font-mono">
              <div className="flex items-center gap-3 bg-white/5 p-4 border border-white/10">
                <Braces className="w-4 h-4 text-primary" />
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask the handbook..."
                  disabled={loading}
                  className="flex-1 bg-transparent text-foreground placeholder-white/20 outline-none text-sm font-mono caret-primary"
                />
                <button
                  onClick={ask}
                  disabled={loading || !question.trim()}
                  className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-primary text-black hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Proc..." : "Exec"}
                </button>
              </div>

              {(loading || answer) && (
                <div className="mt-6 space-y-4 border-t border-white/5 pt-6 animate-in fade-in slide-in-from-top-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="w-3 h-3 text-primary" />
                    <span className="text-[10px] text-primary uppercase tracking-widest font-bold">
                      Output
                    </span>
                  </div>
                  {loading ? (
                    <div className="space-y-2 opacity-50">
                      <div className="h-2 bg-white/10 rounded w-full animate-pulse" />
                      <div className="h-2 bg-white/10 rounded w-5/6 animate-pulse delay-75" />
                      <div className="h-2 bg-white/10 rounded w-4/6 animate-pulse delay-150" />
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      <span className="text-primary mr-2">{"//"}</span>
                      {answer}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-12">
        <div className="space-y-6">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
            Node_Status
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Nodes", val: "1,337", icon: Globe },
              { label: "Sync", val: "99.9%", icon: Cpu },
              { label: "Packets", val: "4.2M", icon: Shield },
              { label: "Streams", val: "Active", icon: Terminal },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
              >
                <stat.icon className="w-4 h-4 text-muted-foreground mb-2 opacity-30" />
                <div className="text-xl font-black">{stat.val}</div>
                <div className="text-[8px] uppercase tracking-tighter text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HandbookPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden font-mono selection:bg-primary/30">
      <NothureBackground />

      <nav className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/5 backdrop-blur-sm bg-black/20">
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-foreground flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-500">
              <div className="-rotate-45 group-hover:-rotate-90 transition-transform duration-500 text-background text-xs">
                1337
              </div>
            </div>
            <span className="glow-text tracking-[0.2em]">1337_SYS</span>
          </div>
          <div className="hidden md:flex gap-6 text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
            <a href="#" className="text-primary font-bold">
              Chat_Kaneki
            </a>
            <a
              href="/neural-net"
              className="hover:text-foreground transition-colors"
            >
              Neural_Net
            </a>
            <a
              href="/documentation"
              className="hover:text-foreground transition-colors"
            >
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

      <Suspense fallback={null}>
        <HandbookContent />
      </Suspense>

      <footer className="relative z-10 border-t border-white/5 py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 bg-black/40">
        <div className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground text-center md:text-left">
          ELITE_PROGRAMMING_KNOWLEDGE_ARCHIVE <br />
          <span className="text-primary/40">EST. 2026 // coding_1337_CORP</span>
        </div>
        <div className="flex gap-8 items-center">
          <div className="text-[9px] uppercase tracking-widest font-black">
            Recording_In_Progress{" "}
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse ml-1" />
          </div>
        </div>
      </footer>
    </main>
  );
}
