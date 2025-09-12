"use client"

import React from 'react'

interface Cliente {
  id: string
  nombre: string
  cedula: string
  telefono: string
  email?: string
  direccion?: string
  regimenTurismo: boolean
  fechaRegistro: string
  ultimaVisita?: string
  totalCompras: number
  serviciosRealizados: number
  activo: boolean
}

interface Venta {
  id: string
  fecha: string
  hora: string
  servicios: string[]
  productos: string[]
  subtotal: number
  iva: number
  total: number
  metodoPago: string
  estado: string
}

interface ClienteHistorialProps {
  client: Cliente
  onBack: () => void
}

const ventasHistorial: Venta[] = [
  {
    id: '001234',
    fecha: '2024-01-15',
    hora: '10:30',
    servicios: ['Lavado Full Detail (SUV)', 'Aspirado (SUV)'],
    productos: [],
    subtotal: 65000,
    iva: 6500,
    total: 71500,
    metodoPago: 'Tarjeta',
    estado: 'Completado'
  },
  {
    id: '001180',
    fecha: '2024-01-08',
    hora: '14:20',
    servicios: ['Lavado Básico (SUV)'],
    productos: ['Aromatizante'],
    subtotal: 50000,
    iva: 5000,
    total: 55000,
    metodoPago: 'Efectivo',
    estado: 'Completado'
  },
  {
    id: '001125',
    fecha: '2023-12-28',
    hora: '16:45',
    servicios: ['Pulido (SUV)', 'Tratamiento Anti-Hongos (SUV)'],
    productos: ['Cera Líquida'],
    subtotal: 130000,
    iva: 13000,
    total: 143000,
    metodoPago: 'Transferencia',
    estado: 'Completado'
  }
]

export function ClienteHistorial({ client, onBack }: ClienteHistorialProps) {
  const promedioVenta = ventasHistorial.length > 0 
    ? ventasHistorial.reduce((sum, venta) => sum + venta.total, 0) / ventasHistorial.length 
    : 0

  const serviciosMasUtilizados = ventasHistorial
    .map(venta => venta.servicios)
    .flat()
    .reduce((acc, servicio) => {
      acc[servicio] = (acc[servicio] || 0) + 1
      return acc
    }, {} as Record<string, number>)

  const topServicios = Object.entries(serviciosMasUtilizados)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header del cliente */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Volver a la lista
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{client.nombre}</h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>ID:</strong> {client.id}</p>
              <p><strong>Cédula:</strong> {client.cedula}</p>
              <p><strong>Teléfono:</strong> {client.telefono}</p>
              {client.email && <p><strong>Email:</strong> {client.email}</p>}
              {client.direccion && <p><strong>Dirección:</strong> {client.direccion}</p>}
            </div>
            
            <div className="mt-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                client.regimenTurismo
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {client.regimenTurismo ? 'Régimen Turismo' : 'Régimen Normal'}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Cliente desde</p>
              <p className="text-lg font-semibold text-gray-900">{client.fechaRegistro}</p>
            </div>
            {client.ultimaVisita && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Última visita</p>
                <p className="text-lg font-semibold text-blue-900">{client.ultimaVisita}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Estadísticas del cliente */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Total Gastado</p>
          <p className="text-2xl font-bold text-green-900">
            Gs. {client.totalCompras.toLocaleString('es-PY')}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Servicios Realizados</p>
          <p className="text-2xl font-bold text-blue-900">{client.serviciosRealizados}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Promedio por Visita</p>
          <p className="text-2xl font-bold text-purple-900">
            Gs. {promedioVenta.toLocaleString('es-PY')}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600 font-medium">Total Visitas</p>
          <p className="text-2xl font-bold text-yellow-900">{ventasHistorial.length}</p>
        </div>
      </div>

      {/* Servicios más utilizados */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Servicios Más Utilizados</h3>
        <div className="space-y-3">
          {topServicios.map(([servicio, cantidad], index) => (
            <div key={servicio} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 bg-blue-600 text-white text-sm font-medium rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="font-medium text-gray-900">{servicio}</span>
              </div>
              <span className="text-blue-600 font-semibold">{cantidad} veces</span>
            </div>
          ))}
        </div>
      </div>

      {/* Historial de ventas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Historial de Ventas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Factura / Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicios/Productos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pago
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ventasHistorial.map((venta) => (
                <tr key={venta.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{venta.id}</div>
                      <div className="text-sm text-gray-500">{venta.fecha} {venta.hora}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {venta.servicios.map((servicio, index) => (
                        <div key={index} className="text-gray-900">• {servicio}</div>
                      ))}
                      {venta.productos.map((producto, index) => (
                        <div key={index} className="text-blue-600">• {producto}</div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Gs. {venta.total.toLocaleString('es-PY')}
                      </div>
                      <div className="text-xs text-gray-500">
                        IVA: Gs. {venta.iva.toLocaleString('es-PY')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {venta.metodoPago}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      venta.estado === 'Completado'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {venta.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">
          💡 Recomendaciones Comerciales
        </h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p>• Cliente frecuente con promedio alto de compra</p>
          <p>• Prefiere servicios completos (Full Detail y Pulido)</p>
          <p>• Considera ofrecer paquetes premium o descuentos por fidelidad</p>
          {client.regimenTurismo && <p>• Cliente en régimen turismo - mantener documentación fiscal</p>}
        </div>
      </div>
    </div>
  )
}