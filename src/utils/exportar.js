import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const exportarAExcel = (data) => {
  const wb = XLSX.utils.book_new();
  
  data.forEach(cuenta => {
    const ws = XLSX.utils.json_to_sheet(cuenta.movimientos);
    XLSX.utils.book_append_sheet(wb, ws, cuenta.cuenta || 'Extracto');
  });

  XLSX.writeFile(wb, 'Conciliacion_ConcilIA.xlsx');
};

export const exportarAPDF = (data, consolidado) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('Reporte de Conciliación ConcilIA', 14, 22);
  
  doc.setFontSize(12);
  doc.text(`Ingresos Reales Totales: $${consolidado.ingreso_real.toLocaleString('es-CO')}`, 14, 35);
  doc.text(`Traslados Excluidos: $${consolidado.traslados.toLocaleString('es-CO')}`, 14, 42);
  
  data.forEach((cuenta, index) => {
    doc.addPage();
    doc.text(`Detalle: ${cuenta.cuenta}`, 14, 22);
    
    const rows = cuenta.movimientos.map(m => [m.fecha, m.descripcion, m.valor, m.tipo]);
    
    doc.autoTable({
      head: [['Fecha', 'Descripción', 'Valor', 'Tipo']],
      body: rows,
      startY: 30,
    });
  });

  doc.save('Reporte_ConcilIA_Declaracion.pdf');
};