"use client"

import React, { useState } from 'react'

const gastosReporte = {
  mes_actual: {
    insumos: 450000,
    mantenimiento: 320000,
    servicios: 780000,
    nomina: 2200000,
    otros: 180000
  },
  mes_anterior: {
    insumos: 380000,
    mantenimiento: 250000,
    servicios: 720000,
    nomina: 2100000,
    otros: 160000
  },
  gastos_detallados: [
    { fecha: '2024-01-15', categoria: 'Insumos', concepto: 'Shampoo y cera', monto: 150000 },
    { fecha: '2024-01-14', categoria: 'Mantenimiento', concepto: 'Reparación aspiradora', monto: 320000 },
    { fecha: '2024-01-13', categoria: 'Servicios', concepto: 'Luz eléctrica', monto: 450000 },
    { fecha: '2024-01-10', categoria: 'Nómina', concepto: 'Salario Juan Pérez', monto: 2200000 },
    { fecha: '2024-01-08', categoria: 'Otros', concepto: 'Combustible', monto: 180000 }
  ]
}

export function GastosReportes() {
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [categoriaFilter, setCategoriaFilter] = useState('')

  const totalMesActual = Object.values(gastosReporte.mes_actual).reduce((sum, val) => sum + val, 0)
  const totalMesAnterior = Object.values(gastosReporte.mes_anterior).reduce((sum, val) => sum + val, 0)
  const variacion = ((totalMesActual - totalMesAnterior) / totalMesAnterior * 100)

  const categorias = ['Insumos', 'Mantenimiento', 'Servicios', 'Nómina', 'Otros']

  const exportarReporte = (formato: string) => {
    alert(`Exportando reporte de gastos en ${formato} (funcionalidad por implementar en C# WPF)`)
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros del Reporte</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría
            </label>
            <select
              value={categoriaFilter}
              onChange={(e) => setCategoriaFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end space-x-2">
            <button
              onClick={() => exportarReporte('PDF')}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-lg transition-colors"
            >
              PDF
            </button>
            <button
              onClick={() => exportarReporte('Excel')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded-lg transition-colors"
            >
              Excel
            </button>
          </div>
        </div>
      </div>

      {/* Resumen general */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Total Mes Actual</h3>
          <p className="text-3xl font-bold text-red-900">
            Gs. {totalMesActual.toLocaleString('es-PY')}
          </p>
          <p className="text-sm text-red-700 mt-2">Enero 2024</p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Mes Anterior</h3>
          <p className="text-3xl font-bold text-blue-900">
            Gs. {totalMesAnterior.toLocaleString('es-PY')}
          </p>
          <p className="text-sm text-blue-700 mt-2">Diciembre 2023</p>
        </div>
        
        <div className={`p-6 rounded-lg border ${
          variacion > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${
            variacion > 0 ? 'text-red-800' : 'text-green-800'
          }`}>
            Variación
          </h3>
          <p className={`text-3xl font-bold ${
            variacion > 0 ? 'text-red-900' : 'text-green-900'
          }`}>
            {variacion > 0 ? '+' : ''}{variacion.toFixed(1)}%
          </p>
          <p className={`text-sm mt-2 ${
            variacion > 0 ? 'text-red-700' : 'text-green-700'
          }`}>
            {variacion > 0 ? 'Aumento' : 'Reducción'} vs mes anterior
          </p>
        </div>
      </div>

      {/* Gastos por categoría */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Gastos por Categoría</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {categorias.map((categoria) => {
              const montoActual = gastosReporte.mes_actual[categoria.toLowerCase() as keyof typeof gastosReporte.mes_actual] || 0
              const montoAnterior = gastosReporte.mes_anterior[categoria.toLowerCase() as keyof typeof gastosReporte.mes_anterior] || 0
              const variacionCategoria = montoAnterior > 0 ? ((montoActual - montoAnterior) / montoAnterior * 100) : 0
              const porcentajeTotal = (montoActual / totalMesActual * 100)

              return (
                <div key={categoria} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{categoria}</h4>
                      <div className="text-right">
                        <span className="font-bold text-gray-900">
                          Gs. {montoActual.toLocaleString('es-PY')}
                        </span>
                        <div className="text-xs text-gray-500">
                          {porcentajeTotal.toFixed(1)}% del total
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${porcentajeTotal}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        Mes anterior: Gs. {montoAnterior.toLocaleString('es-PY')}
                      </span>
                      <span className={`font-medium ${
                        variacionCategoria > 0 ? 'text-red-600' : variacionCategoria < 0 ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {variacionCategoria > 0 ? '+' : ''}{variacionCategoria.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Detalle de gastos recientes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Gastos Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Concepto
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gastosReporte.gastos_detallados.map((gasto, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {gasto.fecha}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {gasto.categoria}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {gasto.concepto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-red-600">
                    Gs. {gasto.monto.toLocaleString('es-PY')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Análisis y recomendaciones */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">
          📊 Análisis de Gastos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-yellow-700 mb-2">Principales gastos:</h4>
            <ul className="space-y-1 text-yellow-800">
              <li>• Nómina: 69.8% del total (Gs. 2.200.000)</li>
              <li>• Servicios: 19.7% del total (Gs. 780.000)</li>
              <li>• Insumos: 11.3% del total (Gs. 450.000)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-yellow-700 mb-2">Recomendaciones:</h4>
            <ul className="space-y-1 text-yellow-800">
              <li>• Evaluar contratos de servicios para optimizar costos</li>
              <li>• Buscar proveedores alternativos para insumos</li>
              <li>• Considerar mantenimiento preventivo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}