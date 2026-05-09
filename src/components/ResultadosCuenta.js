import React, { useState } from 'react';

const TIPO_COLORS = {
  INGRESO_REAL: 'bg-green-100 text-green-800 border-green-200',
  EGRESO: 'bg-red-100 text-red-800 border-red-200',
  TRASLADO: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  NO_IDENTIFICADO: 'bg-gray-100 text-gray-800 border-gray-200'
};

export default function ResultadosCuenta({ data }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex border-b overflow-x-auto bg-gray-50">
        {data.map((res, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === idx 
              ? 'bg-white text-[#1e3a5f] border-t-4 border-t-[#1e3a5f]' 
              : 'text-gray-500 hover:text-[#1e3a5f]'
            }`}
          >
            {res.cuenta || `Cuenta ${idx + 1}`}
          </button>
        ))}
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="py-3 px-2 text-gray-600 font-semibold">Fecha</th>
                <th className="py-3 px-2 text-gray-600 font-semibold">Descripción</th>
                <th className="py-3 px-2 text-gray-600 font-semibold">Valor</th>
                <th className="py-3 px-2 text-gray-600 font-semibold text-center">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {data[activeTab].movimientos.map((mov, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="py-3 px-2 text-sm">{mov.fecha}</td>
                  <td className="py-3 px-2">
                    <div className="text-sm font-medium">{mov.descripcion}</div>
                    {mov.nota && <div className="text-xs text-gray-400 italic">{mov.nota}</div>}
                  </td>
                  <td className={`py-3 px-2 font-mono font-bold ${mov.valor < 0 ? 'text-red-500' : 'text-green-600'}`}>
                    ${mov.valor.toLocaleString('es-CO')}
                  </td>
                  <td className="py-3 px-2">
                    <span className={`block text-[10px] text-center font-bold px-2 py-1 rounded-full border ${TIPO_COLORS[mov.tipo]}`}>
                      {mov.tipo.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#1e3a5f] p-4 rounded-lg text-white">
          <div className="text-center border-r border-blue-800">
            <div className="text-xs opacity-70">Ingresos Reales</div>
            <div className="font-bold text-[#00c896]">${data[activeTab].totales.ingreso_real.toLocaleString('es-CO')}</div>
          </div>
          <div className="text-center border-r border-blue-800">
            <div className="text-xs opacity-70">Egresos</div>
            <div className="font-bold text-red-300">${data[activeTab].totales.egresos.toLocaleString('es-CO')}</div>
          </div>
          <div className="text-center border-r border-blue-800">
            <div className="text-xs opacity-70">Traslados</div>
            <div className="font-bold text-yellow-300">${data[activeTab].totales.traslados.toLocaleString('es-CO')}</div>
          </div>
          <div className="text-center">
            <div className="text-xs opacity-70">Pendientes</div>
            <div className="font-bold text-gray-300">{data[activeTab].totales.no_identificados}</div>
          </div>
        </div>
      </div>
    </div>
  );
}