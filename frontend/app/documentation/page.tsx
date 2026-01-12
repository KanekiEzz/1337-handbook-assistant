"use client";

import { useState, useEffect } from "react";
import { FileText, Activity, Loader } from "lucide-react";
import { NothureBackground } from "../components/nothure-background";

// Background Component
// function NothureBackground() {
//   return (
//     <div className="fixed inset-0 z-0">
//       <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black" />
//       <div className="absolute inset-0 opacity-20">
//         {[...Array(50)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute bg-cyan-500/20 rounded-full blur-3xl"
//             style={{
//               width: Math.random() * 300 + 100,
//               height: Math.random() * 300 + 100,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animation: `float ${
//                 Math.random() * 10 + 10
//               }s ease-in-out infinite`,
//               animationDelay: `${Math.random() * 5}s`,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

export default function DocumentationPage() {
  const [pdfContent, setPdfContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPDF();
  }, []);

  //   const loadPDF = async () => {
  //     setLoading(true)
  //     setError("")

  //     try {
  //       const response = await window.fs.readFile('/pdf/1337_Student_Han_dbook.pdf', { encoding: 'utf8' })
  //       setPdfContent(response)
  //     } catch (err) {
  //       setError(`Failed to load PDF: ${err.message}`)
  //       console.error('Error loading PDF:', err)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  const loadPDF = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/pdf/1337_Student_Han_dbook.pdf");
      if (!response.ok) {
        throw new Error("PDF not found");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setPdfContent(url);
    } catch (err) {
      setError(`Failed to load PDF: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black relative overflow-hidden font-mono">
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
            <a href="/neural-net" 
              className="hover:text-foreground transition-colors">
              Neural_Net
            </a>
            <a
              href="/documentation"
            className="text-primary font-bold"
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

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-16 pb-32">
        <div className="mb-12 space-y-6">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-[10px] text-primary tracking-widest font-black uppercase mb-4 animate-glitch">
            Knowledge_Archive_v1.0
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none glow-text">
              DOCUMENTATION{" "}
              <span className="text-muted-foreground opacity-50">/</span>{" "}
              ARCHIVE
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Reading 133_student.pdf - Elite programming documentation and knowledge base.
            </p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur opacity-25 group-hover:opacity-50 transition duration-1000" />
          <div className="relative bg-black border border-white/10 overflow-hidden min-h-[600px] flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 text-center text-[9px] uppercase tracking-widest text-slate-500">
                pdf_viewer // document_processor
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col gap-6 overflow-auto">
              <div className="space-y-4 border-b border-white/10 pb-6">
                <div className="flex items-start gap-3">
                  <FileText className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      133_student.pdf
                    </h2>
                    <p className="text-[9px] text-slate-400 mt-1">
                      Status:{" "}
                      {loading ? "Loading..." : error ? "Error" : "Ready"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-bold">
                  Document_Content
                </h3>

                {!loading && !error && pdfContent && (
                  <iframe
                    src={`${pdfContent}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-[600px] border border-white/10 bg-black"
                  />
                )}

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 p-6 space-y-4 rounded-sm">
                    <div className="text-[9px] text-red-400 leading-relaxed space-y-3">
                      <p>
                        <span className="text-red-400">{">>"}</span> Error
                        loading document
                      </p>
                      <p className="text-red-300/70">{error}</p>
                    </div>
                  </div>
                )}

                {/* {!loading && !error && pdfContent && (
                  <div className="bg-white/[0.02] border border-white/5 p-6 space-y-4 rounded-sm">
                    <div className="text-[10px] text-slate-300 leading-relaxed whitespace-pre-wrap font-mono">
                      {pdfContent}
                    </div>
                  </div>
                )} */}

                {!loading && !error && !pdfContent && (
                  <div className="bg-white/[0.02] border border-white/5 p-6 space-y-4 rounded-sm">
                    <div className="text-[9px] text-slate-400 leading-relaxed space-y-3">
                      <p>
                        <span className="text-cyan-400">{">>"}</span> Document
                        loaded but appears empty
                      </p>
                      <p className="text-slate-500/70 italic">
                        The PDF file may be binary-encoded or require special
                        processing.
                      </p>
                    </div>
                  </div>
                )}

                {!loading && !error && (
                  <div className="bg-white/[0.02] border border-white/5 p-4 space-y-2 rounded-sm">
                    <h4 className="text-[9px] uppercase tracking-widest text-cyan-400 font-bold">
                      Analysis_Stream
                    </h4>
                    <div className="space-y-1 font-mono">
                      {[
                        "[LOAD] Reading file: /133_student.pdf",
                        "[PARSE] Processing document structure...",
                        "[INDEX] Creating searchable index...",
                        "[CACHE] Storing in memory buffer...",
                        "[READY] Document fully loaded ✓",
                      ].map((log, i) => (
                        <div key={i} className="text-[8px] text-slate-400">
                          <span className="text-cyan-400">{">>"}</span> {log}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-white/5 py-8 px-8 flex flex-col md:flex-row justify-between items-center gap-8 bg-black/40 mt-12">
        <div className="text-[9px] uppercase tracking-[0.4em] text-slate-400 text-center md:text-left">
          DOCUMENTATION_ARCHIVE <br />
          <span className="text-cyan-400/40">
            EST. 2026 // v0_1337_KNOWLEDGE
          </span>
        </div>
        <div className="text-[9px] uppercase tracking-widest font-black text-white">
          Archive_Indexed{" "}
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse ml-1" />
        </div>
      </footer>
    </main>
  );
}
