"use client"

import React, { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

export default function ReportesPage() {
  const [selectedReport, setSelectedReport] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const reportes = [
    {
      id: 'ventas-diarias',
      titulo: 'Ventas Diarias',
      descripcion: 'Reporte detallado de ventas por día',
      icon: '📊'
    },
    {
      id: 'servicios-populares',
      titulo: 'Servicios Más Populares',
      descripcion: 'Ranking de servicios más solicitados',
      icon: '🏆'
    },
    {
      id: 'inventario-valorizado',
      titulo: 'Inventario Valorizado',
      descripcion: 'Valor actual de todo el inventario',
      icon: '📦'
    },
    {
      id: 'clientes-frecuentes',
      titulo: 'Clientes Frecuentes',
      descripcion: 'Top clientes por frecuencia y gasto',
      icon: '👥'
    },
    {
      id: 'utilidades',
      titulo: 'Reporte de Utilidades',
      descripcion: 'Análisis de ganancias y costos',
      icon: '💰'
    },
    {
      id: 'corte-caja',
      titulo: 'Corte de Caja',
      descripcion: 'Resumen financiero del día',
      icon: '🏪'
    }
  ]

  const datosReporte = {
    ventasDiarias: {
      fecha: '2024-01-15',
      totalVentas: 1250000,
      numeroFacturas: 23,
      serviciosRealizados: 28,
      clientesAtendidos: 18,
      detalleFormasPago: {
        efectivo: 450000,
        tarjeta: 380000,
        transferencia: 320000,
        credito: 100000
      }
    },
    serviciosPopulares: [
      { servicio: 'Lavado Full Detail', cantidad: 12, ingresos: 540000 },
      { servicio: 'Lavado Básico', cantidad: 8, ingresos: 200000 },
      { servicio: 'Pulido', cantidad: 6, ingresos: 360000 }
    ],
    utilidades: {
      ingresosBrutos: 1250000,
      costoServicios: 180000,
      gastosOperativos: 120000,
      utilidadNeta: 950000
    }
  }

  const exportarReporte = (formato: string) => {
    alert(`Exportando reporte en formato ${formato} (funcionalidad por implementar en C# WPF)`)
  }

  const generarReporte = () => {
    if (!selectedReport) {
      alert('Seleccione un tipo de reporte')
      return
    }
    alert(`Generando reporte: ${reportes.find(r => r.id === selectedReport)?.titulo}`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">📈 Centro de Reportes</h1>
              <p className="text-gray-600 mt-1">Análisis completo del negocio</p>
            </div>
          </div>
        </div>

        {/* Selección de reporte */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generar Reporte</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {reportes.map((reporte) => (
              <div
                key={reporte.id}
                onClick={() => setSelectedReport(reporte.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedReport === reporte.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{reporte.icon}</div>
                  <h4 className="font-semibold text-gray-900">{reporte.titulo}</h4>
                  <p className="text-sm text-gray-600 mt-1">{reporte.descripcion}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Inicio
              </label>
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Fin
              </label>
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={generarReporte}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Generar Reporte
              </button>
            </div>
          </div>
        </div>

        {/* Vista previa del reporte (ejemplo con datos del día) */}
        {selectedReport && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Vista Previa: {reportes.find(r => r.id === selectedReport)?.titulo}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => exportarReporte('PDF')}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors"
                >
                  PDF
                </button>
                <button
                  onClick={() => exportarReporte('Excel')}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded transition-colors"
                >
                  Excel
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {selectedReport === 'ventas-diarias' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-600 font-medium">Total Ventas</p>
                      <p className="text-2xl font-bold text-green-900">
                        Gs. {datosReporte.ventasDiarias.totalVentas.toLocaleString('es-PY')}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium">Facturas</p>
                      <p className="text-2xl font-bold text-blue-900">{datosReporte.ventasDiarias.numeroFacturas}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-purple-600 font-medium">Servicios</p>
                      <p className="text-2xl font-bold text-purple-900">{datosReporte.ventasDiarias.serviciosRealizados}</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-yellow-600 font-medium">Clientes</p>
                      <p className="text-2xl font-bold text-yellow-900">{datosReporte.ventasDiarias.clientesAtendidos}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Detalle por Forma de Pago</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(datosReporte.ventasDiarias.detalleFormasPago).map(([forma, monto]) => (
                        <div key={forma} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900 capitalize">{forma}:</span>
                          <span className="font-bold text-green-600">
                            Gs. {(monto as number).toLocaleString('es-PY')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedReport === 'servicios-populares' && (
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Top Servicios del Período</h4>
                  <div className="space-y-3">
                    {datosReporte.serviciosPopulares.map((servicio, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="font-medium text-gray-900">{servicio.servicio}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{servicio.cantidad} servicios</div>
                          <div className="text-green-600">Gs. {servicio.ingresos.toLocaleString('es-PY')}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedReport === 'utilidades' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-md font-semibold text-gray-900">Ingresos</h4>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-sm text-green-600 font-medium">Ingresos Brutos</p>
                        <p className="text-2xl font-bold text-green-900">
                          Gs. {datosReporte.utilidades.ingresosBrutos.toLocaleString('es-PY')}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-md font-semibold text-gray-900">Costos</h4>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-sm text-red-600 font-medium">Costo de Servicios</p>
                        <p className="text-xl font-bold text-red-900">
                          Gs. {datosReporte.utilidades.costoServicios.toLocaleString('es-PY')}
                        </p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-sm text-yellow-600 font-medium">Gastos Operativos</p>
                        <p className="text-xl font-bold text-yellow-900">
                          Gs. {datosReporte.utilidades.gastosOperativos.toLocaleString('es-PY')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <p className="text-lg text-blue-600 font-medium">Utilidad Neta</p>
                      <p className="text-4xl font-bold text-blue-900">
                        Gs. {datosReporte.utilidades.utilidadNeta.toLocaleString('es-PY')}
                      </p>
                      <p className="text-sm text-blue-700 mt-2">
                        Margen: {((datosReporte.utilidades.utilidadNeta / datosReporte.utilidades.ingresosBrutos) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedReport && !['ventas-diarias', 'servicios-populares', 'utilidades'].includes(selectedReport) && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">📊</div>
                  <p>Reporte en desarrollo</p>
                  <p className="text-sm">Esta funcionalidad será implementada en la versión final de C# WPF</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}