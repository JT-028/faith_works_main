"use client"

import { useState, useEffect, useRef } from "react"
import { MessageSquare, X, Send } from "lucide-react"

export function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm Coach Faith. Ready to fail forward fast? How can I support your journey today?",
      time: "04:35 PM",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  const handleSend = () => {
    if (!inputValue.trim()) return
    const newMsg = {
        role: "user",
        content: inputValue,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages((prev) => [...prev, newMsg])
    setInputValue("")
    
    // Simulate auto-reply
    setTimeout(() => {
        setMessages((prev) => [
            ...prev,
            {
                role: "assistant",
                content: "I'm still a prototype, but I'll be ready soon!",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
        ])
    }, 1000)
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[100] flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold shadow-[0_4px_24px_rgba(252,232,42,0.4)] outline outline-2 outline-[var(--color-brand-offwhite)] transition-all hover:scale-110 active:scale-95`}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? (
          <X className="h-7 w-7 text-brand-dark transition-transform" strokeWidth={2} />
        ) : (
          <MessageSquare className="h-7 w-7 text-brand-dark transition-transform" strokeWidth={2} />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-[104px] right-6 z-[100] flex w-[calc(100%-48px)] max-w-[360px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.12),_0_0_40px_rgba(252,232,42,0.15)] ring-1 ring-zinc-200/50 transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
            : "translate-y-4 scale-95 opacity-0 pointer-events-none"
        }`}
        style={{ height: "550px", maxHeight: "calc(100vh - 128px)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 bg-white px-4 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-zinc-100">
              <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-xs font-bold text-white">
                CF
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-900">Coach Faith</span>
                <span className="rounded bg-brand-gold/20 px-1.5 py-0.5 text-[10px] font-bold text-brand-dark">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-zinc-500">Online</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
            aria-label="Close Chat Window"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div
          data-lenis-prevent="true"
          className="flex-1 overflow-y-auto p-4 scrollbar-none"
          style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex flex-col gap-4">
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user"
              const isSystem = msg.role === "system"
              
              return (
                <div
                  key={idx}
                  className={`flex w-full ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`relative flex max-w-[85%] flex-col gap-1.5 px-4 py-3 text-sm shadow-sm border ${
                      isUser
                        ? "rounded-[18px] rounded-br-sm bg-zinc-900 text-white border-zinc-800"
                        : "rounded-[18px] rounded-tl-sm bg-zinc-50 text-zinc-900 border-zinc-100"
                    }`}
                  >
                    {isSystem ? (
                      <span className="font-bold uppercase tracking-wide text-zinc-500 text-xs">
                        {msg.content}
                      </span>
                    ) : (
                      <span className="leading-snug">{msg.content}</span>
                    )}
                    <span
                      className={`text-[10px] font-medium leading-none ${
                        isUser ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white p-4 pt-2 border-t border-zinc-100 shrink-0">
          <div className="relative flex items-center rounded-2xl bg-zinc-50 border border-zinc-200 focus-within:border-brand-gold/50 focus-within:ring-1 focus-within:ring-brand-gold/50 transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend() }}
              placeholder="Ask Coach Faith anything..."
              className="w-full bg-transparent py-4 pl-5 pr-14 text-[14px] text-zinc-900 placeholder-zinc-400 outline-none"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gold text-brand-dark transition-all hover:scale-105 active:scale-95"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

