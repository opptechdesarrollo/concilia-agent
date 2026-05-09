import React, { useState } from 'react';
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

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

  const nextStep = () => setStep(prev => prev + 1);

  return (
    <CopilotKit publicApiKey="tu_copilotkit_key_o_vacio_si_es_local">
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header/>
        
        <main className="flex-grow container mx-auto p-4 max-w-5xl">
          {step === 1 && (
            <Configuracion onComplete="{(data)"> { setConfig(data); nextStep(); }} 
            />
          )}
          
          {step === 2 && (
            <CargaArchivos config="{config}" onComplete="{(resultados)"> { setDataFinal(resultados); nextStep(); }}
              setLoading={setLoading}
              loading={loading}
            />
          )}

          {step === 3 && (
            <div className="space-y-8">
              <ResultadosCuenta data="{dataFinal}"/>
              <div className="flex justify-center">
                <button 
                  onClick={nextStep}
                  className="bg-[#00c896] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#00a37b] transition shadow-lg"
                >
                  Generar Reporte Consolidado
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <ResumenFinal data="{dataFinal}" onRestart="{()"> setStep(1)} />
          )}
        </main>

        <footer className="bg-[#1e3a5f] text-white p-4 text-center text-sm">
          Powered by Gemini + CopilotKit | ConcilIA 2026
        </footer>

        <CopilotSidebar instructions="{`Eres" el asistente de ConcilIA. Ayudas al usuario a entender sus movimientos bancarios. Datos actuales: ${JSON.stringify(dataFinal)}`} defaultOpen="{false}" clickOutsideToClose="{true}"/>
      </div>
    </ResumenFinal></CargaArchivos></Configuracion></CopilotKit>
  );
}

export default App;