import React, { useState } from 'react';
import { Upload, CheckCircle2, Loader2 } from 'lucide-react';
import { procesarExtracto } from '../agent';
import { fileToBase64 } from '../utils/procesarArchivo';

export default function CargaArchivos({ config, onComplete, setLoading, loading }) {
  const [archivosProcesados, setArchivosProcesados] = useState([]);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setLoading(true);
    const resultados = [];

    for (const file of files) {
      try {
        const base64Data = await fileToBase64(file);
        // Extraemos el string base64 puro (sin el prefijo data:image/...)
        const base64String = base64Data.split(',')[1];
        
        const res = await procesarExtracto(base64String, file.type, config);
        resultados.push(res);
        setArchivosProcesados(prev => [...prev, file.name]);
      } catch (error) {
        alert(`Error con ${file.name}: ${error.message}`);
      }
    }

    setLoading(false);
    if (resultados.length > 0) onComplete(resultados);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl text-center">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1e3a5f]">Sube tus extractos</h2>
        <p className="text-gray-500">Puedes subir fotos, PDFs o archivos Excel de tus cuentas</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-[#00c896] transition-colors cursor-pointer relative">
        <input 
          type="file" 
          multiple 
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={loading}
        />
        <div className="flex flex-col items-center">
          {loading ? (
            <Loader2 className="w-12 h-12 text-[#00c896] animate-spin mb-4" />
          ) : (
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
          )}
          <p className="text-lg font-medium text-gray-700">
            {loading ? "ConcilIA está analizando tus movimientos..." : "Haz clic o arrastra los archivos aquí"}
          </p>
          <p className="text-sm text-gray-400 mt-2">JPG, PNG, PDF, XLSX</p>
        </div>
      </div>

      {archivosProcesados.length > 0 && (
        <div className="mt-6 text-left">
          <h3 className="font-semibold mb-2">Archivos listos:</h3>
          {archivosProcesados.map((name, i) => (
            <div key={i} className="flex items-center text-[#00c896] text-sm mb-1">
              <CheckCircle2 size={16} className="mr-2" /> {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}