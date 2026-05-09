import React, { useState } from 'react';
import Header from './components/Header';
import Configuracion from './components/Configuracion';
import CargaArchivos from './components/CargaArchivos';
import ResultadosCuenta from './components/ResultadosCuenta';
import ResumenFinal from './components/ResumenFinal';

function App() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState(null);
  const [dataFinal, setDataFinal] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para avanzar de pantalla
  const nextStep = () => setStep((prev) => prev + 1);
  const reset = () => { setStep(1); setDataFinal([]); };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow container mx-auto p-6 max-w-6xl">
        {/* Barra de Progreso Visual */}
        <div className="flex justify-between mb-10 max-w-2xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-2 flex-1 mx-1 rounded-full ${step >= i ? 'bg-[#00c896]' : 'bg-gray-200'}`} />
          ))}
        </div>

        {step === 1 && <Configuracion onComplete={(data) => { setConfig(data); nextStep(); }} />}
        
        {step === 2 && (
          <CargaArchivos 
            config={config} 
            onComplete={(resultados) => { setDataFinal(resultados); nextStep(); }}
            setLoading={setLoading}
            loading={loading}
          />
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1e3a5f]">Detalle de Movimientos Analizados</h2>
            <ResultadosCuenta data={dataFinal} />
            <div className="flex justify-end">
              <button 
                onClick={nextStep}
                className="bg-[#1e3a5f] hover:bg-[#2c5282] text-white px-10 py-4 rounded-xl font-bold shadow-xl transition-all"
              >
                Ver Resumen Fiscal →
              </button>
            </div>
          </div>
        )}

        {step === 4 && <ResumenFinal data={dataFinal} onRestart={reset} />}
      </main>

      <footer className="p-6 text-center text-gray-400 text-sm">
        Desarrollado con ✨ Gemini 1.5 Flash & CopilotKit
      </footer>
    </div>
  );
}

export default App;