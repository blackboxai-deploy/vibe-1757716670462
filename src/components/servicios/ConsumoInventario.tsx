"use client"

import React, { useState } from 'react'

interface ConsumoData {
  servicioId: string
  servicioName: string
  productId: string
  productName: string
  cantidad: number
  unit: string
  costoPorUnidad: number
  costoTotal: number
  realizadoHoy: number
  consumoTotal: number
}

const consumoData: ConsumoData[] = [
  {
    servicioId: 'lavado-basico',
    servicioName: 'Lavado Básico',
    productId: 'shampoo',
    productName: 'Shampoo Auto',
    cantidad: 0.1,
    unit: 'litros',
    costoPorUnidad: 25000,
    costoTotal: 2500,
    realizadoHoy: 8,
    consumoTotal: 0.8
  },
  {
    servicioId: 'lavado-basico',
    servicioName: 'Lavado Básico',
    productId: 'panos',
    productName: 'Paños Microfibra',
    cantidad: 1,
    unit: 'unidades',
    costoPorUnidad: 5000,
    costoTotal: 5000,
    realizadoHoy: 8,
    consumoTotal: 8
  },
  {
    servicioId: 'lavado-full',
    servicioName: 'Lavado Full Detail',
    productId: 'shampoo',
    productName: 'Shampoo Auto',
    cantidad: 0.15,
    unit: 'litros',
    costoPorUnidad: 25000,
    costoTotal: 3750,
    realizadoHoy: 12,
    consumoTotal: 1.8
  },
  {
    servicioId: 'lavado-full',
    servicioName: 'Lavado Full Detail',
    productId: 'cera',
    productName: 'Cera Líquida',
    cantidad: 0.05,
    unit: 'litros',
    costoPorUnidad: 35000,
    costoTotal: 1750,
    realizadoHoy: 12,
    consumoTotal: 0.6
  },
  {
    servicioId: 'lavado-full',
    servicioName: 'Lavado Full Detail',
    productId: 'panos',
    productName: 'Paños Microfibra',
    cantidad: 2,
    unit: 'unidades',
    costoPorUnidad: 5000,
    costoTotal: 10000,
    realizadoHoy: 12,
    consumoTotal: 24
  },
  {
    servicioId: 'lavado-full',
    servicioName: 'Lavado Full Detail',
    productId: 'aromatizante',
    productName: 'Aromatizante',
    cantidad: 1,
    unit: 'unidades',
    costoPorUnidad: 3000,
    costoTotal: 3000,
    realizadoHoy: 12,
    consumoTotal: 12
  },
  {
    servicioId: 'pulido',
    servicioName: 'Pulido',
    productId: 'cera',
    productName: 'Cera Líquida',
    cantidad: 0.2,
    unit: 'litros',
    costoPorUnidad: 35000,
    costoTotal: 7000,
    realizadoHoy: 6,
    consumoTotal: 1.2
  },
  {
    servicioId: 'pulido',
    servicioName: 'Pulido',
    productId: 'panos',
    productName: 'Paños Microfibra',
    cantidad: 3,
    unit: 'unidades',
    costoPorUnidad: 5000,
    costoTotal: 15000,
    realizadoHoy: 6,
    consumoTotal: 18
  }
]

export function ConsumoInventario() {
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const filteredData = consumoData.filter(item => 
    !selectedService || item.servicioId === selectedService
  )

  const uniqueServices = Array.from(
    new Set(consumoData.map(item => ({ id: item.servicioId, name: item.servicioName })))
  )

  const totalCostoConsumos = filteredData.reduce((sum, item) => 
    sum + (item.costoTotal * item.realizadoHoy), 0
  )

  const productosConsumidosHoy = filteredData.reduce((acc, item) => {
    const existingProduct = acc.find(p => p.productId === item.productId)
    if (existingProduct) {
      existingProduct.consumoTotal += item.consumoTotal
      existingProduct.costoTotal += (item.costoTotal * item.realizadoHoy)
      existingProduct.serviciosCount += item.realizadoHoy
    } else {
      acc.push({
        productId: item.productId,
        productName: item.productName,
        consumoTotal: item.consumoTotal,
        unit: item.unit,
        costoTotal: item.costoTotal * item.realizadoHoy,
        serviciosCount: item.realizadoHoy
      })
    }
    return acc
  }, [] as Array<{
    productId: string
    productName: string
    consumoTotal: number
    unit: string
    costoTotal: number
    serviciosCount: number
  }>)

  const exportReport = () => {
    alert('Exportando reporte de consumo (funcionalidad por implementar en C# WPF)')
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros de Análisis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Servicio
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los servicios</option>
              {uniqueServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={exportReport}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Exportar Reporte
            </button>
          </div>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Costo Total Consumos</p>
          <p className="text-2xl font-bold text-blue-900">
            Gs. {totalCostoConsumos.toLocaleString('es-PY')}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Servicios Realizados</p>
          <p className="text-2xl font-bold text-green-900">
            {filteredData.reduce((sum, item) => sum + item.realizadoHoy, 0)}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Productos Afectados</p>
          <p className="text-2xl font-bold text-purple-900">{productosConsumidosHoy.length}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600 font-medium">Promedio por Servicio</p>
          <p className="text-2xl font-bold text-yellow-900">
            Gs. {filteredData.length > 0 ? Math.round(totalCostoConsumos / filteredData.length).toLocaleString('es-PY') : '0'}
          </p>
        </div>
      </div>

      {/* Tabla de consumo por servicio */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Consumo por Servicio y Producto</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Consumo por Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Realizados Hoy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Consumo Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Costo Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.servicioName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.productName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.cantidad} {item.unit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600">{item.realizadoHoy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-purple-600">
                      {item.consumoTotal} {item.unit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">
                      Gs. {(item.costoTotal * item.realizadoHoy).toLocaleString('es-PY')}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumen por producto */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Consumo Total por Producto (Hoy)</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {productosConsumidosHoy.map((producto) => (
              <div key={producto.productId} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">{producto.productName}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consumido:</span>
                    <span className="font-medium">{producto.consumoTotal} {producto.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">En servicios:</span>
                    <span className="font-medium">{producto.serviciosCount}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1">
                    <span className="text-gray-600">Costo total:</span>
                    <span className="font-bold text-green-600">
                      Gs. {producto.costoTotal.toLocaleString('es-PY')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertas y recomendaciones */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">
          📊 Análisis y Recomendaciones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-yellow-700 mb-2">Productos más consumidos:</h4>
            <ul className="space-y-1">
              {productosConsumidosHoy
                .sort((a, b) => b.consumoTotal - a.consumoTotal)
                .slice(0, 3)
                .map((producto) => (
                  <li key={producto.productId} className="text-yellow-700">
                    • {producto.productName}: {producto.consumoTotal} {producto.unit}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-yellow-700 mb-2">Costos más altos:</h4>
            <ul className="space-y-1">
              {productosConsumidosHoy
                .sort((a, b) => b.costoTotal - a.costoTotal)
                .slice(0, 3)
                .map((producto) => (
                  <li key={producto.productId} className="text-yellow-700">
                    • {producto.productName}: Gs. {producto.costoTotal.toLocaleString('es-PY')}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-100 rounded border-l-4 border-yellow-400">
          <p className="text-yellow-800 text-sm">
            <strong>Recomendación:</strong> Considere revisar los precios de los servicios que más consumen productos costosos para mantener márgenes de ganancia saludables.
          </p>
        </div>
      </div>
    </div>
  )
}