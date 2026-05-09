import React, { useState } from 'react';
import { Plus, User, Users } from 'lucide-react';

export default function Configuracion({ onComplete }) {
  const [numCuentas, setNumCuentas] = useState(1);
  const [cuentas, setCuentas] = useState([{ id: 0, nombre: '', esPropia: true }]);

  const agregarCuenta = () => {
    setCuentas([...cuentas, { id: cuentas.length, nombre: '', esPropia: true }]);
  };

  const updateCuenta = (id, field, value) => {
    setCuentas(cuentas.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleStart = () => {
    if (cuentas.some(c => !c.nombre)) return alert("Ponle nombre a todas las cuentas");
    onComplete({
      cuentasPropias: cuentas.filter(c => c.esPropia).map(c => c.nombre),
      socios: cuentas.filter(c => !c.esPropia).map(c => c.nombre),
      rawCuentas: cuentas
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-[#1e3a5f] animate-fadeIn">
      <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6 flex items-center">
        <span className="mr-2">⚙️</span> Configuración de Conciliación
      </h2>
      
      <div className="space-y-4">
        {cuentas.map((cuenta, idx) => (
          <div key={idx} className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <input
              type="text"
              placeholder="Ej: Bancolombia Ahorros"
              className="flex-grow p-2 border rounded"
              value={cuenta.nombre}
              onChange={(e) => updateCuenta(cuenta.id, 'nombre', e.target.value)}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateCuenta(cuenta.id, 'esPropia', true)}
                className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${cuenta.esPropia ? 'bg-[#1e3a5f] text-white' : 'bg-gray-200'}`}
              >
                <User size="{14}"/> Mía
              </button>
              <button
                onClick={() => updateCuenta(cuenta.id, 'esPropia', false)}
                className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${!cuenta.esPropia ? 'bg-[#00c896] text-white' : 'bg-gray-200'}`}
              >
                <Users size="{14}"/> Socio
              </button>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={agregarCuenta}
        className="mt-4 flex items-center text-[#1e3a5f] font-semibold hover:underline"
      >
        <Plus size="{18}" className="mr-1"/> Agregar otra cuenta
      </button>

      <button
        onClick={handleStart}
        className="w-full mt-8 bg-[#1e3a5f] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#2c5282] transition"
      >
        Comenzar Conciliación
      </button>
    </div>
  );
}