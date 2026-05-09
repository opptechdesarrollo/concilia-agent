import React from 'react';

export default function Header() {
  return (
    <header className="bg-[#1e3a5f] text-white p-5 shadow-lg border-b-4 border-[#00c896]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🧾</span>
          <div>
            <h1 className="text-2xl font-black tracking-tight">ConcilIA</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#00c896] font-bold">
              Agente Inteligente de Conciliación
            </p>
          </div>
        </div>
        <div className="hidden md:block bg-blue-900/50 px-4 py-2 rounded-full border border-blue-700 text-xs">
          Hackathon 2026: Gemini + CopilotKit
        </div>
      </div>
    </header>
  );
}