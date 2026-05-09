import React from 'react';
import { Download, RefreshCcw, Landmark, AlertTriangle } from 'lucide-react';
import { exportarAExcel, exportarAPDF } from '../utils/exportar';

export default function ResumenFinal({ data, onRestart }) {
  const consolidado = data.reduce((acc, curr) => ({
    ingreso_real: acc.ingreso_real + curr.totales.ingreso_real,
    egresos: acc.egresos + curr.totales.egresos,
    traslados: acc.traslados + curr.totales.traslados,
    no_identificados: acc.no_identificados + curr.totales.no_identificados
  }), { ingreso_real: 0, egresos: 0, traslados: 0, no_identificados: 0 });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-8 rounded-xl shadow-xl border-l-8 border-[#00c896]">
        <h2 className="text-3xl font-bold text-[#1e3a5f] mb-6">Resumen Consolidado Fiscal</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-green-50 rounded-xl border border-green-100">
            <p className="text-green-600 font-bold text-sm uppercase mb-1">Ingresos a Declarar</p>
            <p className="text-3xl font-black text-green-700">${consolidado.ingreso_real.toLocaleString('es-CO')}</p>
            <p className="text-xs text-green-600 mt-2">Excluyendo traslados internos</p>
          </div>
          
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-[#1e3a5f] font-bold text-sm uppercase mb-1">Traslados Detectados</p>
            <p className="text-3xl font-black text-[#1e3a5f]">${consolidado.traslados.toLocaleString('es-CO')}</p>
            <p className="text-xs text-blue-600 mt-2">Ahorro en base gravable</p>
          </div>

          <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-100">
            <p className="text-yellow-700 font-bold text-sm uppercase mb-1">Para Revisión</p>
            <p className="text-3xl font-black text-yellow-700">{consolidado.no_identificados}</p>
            <p className="text-xs text-yellow-600 mt-2">Movimientos sin clasificar</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => exportarAExcel(data)}
            className="flex items-center gap-2 bg-[#1e3a5f] text-white px-6 py-3 rounded-lg hover:bg-[#2c5282] transition"
          >
            <Download size={20} /> Descargar Excel
          </button>
          <button 
            onClick={() => exportarAPDF(data, consolidado)}
            className="flex items-center gap-2 border-2 border-[#1e3a5f] text-[#1e3a5f] px-6 py-3 rounded-lg hover:bg-gray-50 transition font-bold"
          >
            <Landmark size={20} /> Descargar Reporte PDF
          </button>
          <button 
            onClick={onRestart}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition px-6 py-3"
          >
            <RefreshCcw size={20} /> Nueva Conciliación
          </button>
        </div>
      </div>
      
      {consolidado.no_identificados > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 flex items-start gap-3">
          <AlertTriangle className="text-yellow-400 shrink-0" />
          <p className="text-sm text-yellow-700">
            <strong>Atención:</strong> Tienes movimientos no identificados. Pregúntale a <strong>ConcilIA</strong> en el chat lateral para intentar aclararlos antes de exportar tu reporte definitivo.
          </p>
        </div>
      )}
    </div>
  );
}