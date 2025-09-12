"use client"

import React, { useState } from 'react'

const ventasHistory = [
  {
    id: '001234',
    fecha: '2024-01-15',
    hora: '10:30',
    cliente: 'María González',
    cedula: '1.234.567',
    servicios: ['Lavado Full Detail (SUV)', 'Aspirado (SUV)'],
    productos: [],
    subtotal: 65000,
    iva: 6500,
    total: 71500,
    metodoPago: 'Tarjeta',
    regimenTurismo: false,
    estado: 'Completado'
  },
  {
    id: '001235',
    fecha: '2024-01-15',
    hora: '11:15',
    cliente: 'Carlos Mendoza',
    cedula: '2.345.678',
    servicios: ['Lavado Básico (Auto)'],
    productos: ['Aromatizante'],
    subtotal: 40000,
    iva: 4000,
    total: 44000,
    metodoPago: 'Efectivo',
    regimenTurismo: false,
    estado: 'Completado'
  },
  {
    id: '001236',
    fecha: '2024-01-15',
    hora: '12:00',
    cliente: 'Ana Rodríguez',
    cedula: '3.456.789',
    servicios: ['Pulido (Camioneta)', 'Inyección (Camioneta)'],
    productos: ['Cera Líquida'],
    subtotal: 180000,
    iva: 0,
    total: 180000,
    metodoPago: 'Transferencia',
    regimenTurismo: true,
    estado: 'Completado'
  },
  {
    id: '001237',
    fecha: '2024-01-15',
    hora: '12:30',
    cliente: 'Roberto Silva',
    cedula: '4.567.890',
    servicios: ['Aspirado (Moto)'],
    productos: [],
    subtotal: 10000,
    iva: 1000,
    total: 11000,
    metodoPago: 'Efectivo',
    regimenTurismo: false,
    estado: 'Completado'
  },
  {
    id: '001238',
    fecha: '2024-01-15',
    hora: '13:45',
    cliente: 'Lucia Benítez',
    cedula: '5.678.901',
    servicios: ['Paquete Turismo (Auto)'],
    productos: ['Aromatizante', 'Paños Microfibra'],
    subtotal: 95000,
    iva: 0,
    total: 95000,
    metodoPago: 'Crédito',
    regimenTurismo: true,
    estado: 'Pendiente'
  }
]

export function VentasHistory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredVentas = ventasHistory.filter(venta => {
    const matchesSearch = venta.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venta.cedula.includes(searchTerm) ||
                         venta.id.includes(searchTerm)
    const matchesDate = !dateFilter || venta.fecha === dateFilter
    const matchesPayment = !paymentFilter || venta.metodoPago === paymentFilter
    const matchesStatus = !statusFilter || venta.estado === statusFilter

    return matchesSearch && matchesDate && matchesPayment && matchesStatus
  })

  const totalVentas = filteredVentas.reduce((sum, venta) => sum + venta.total, 0)
  const ventasCompletadas = filteredVentas.filter(v => v.estado === 'Completado').length
  const ventasPendientes = filteredVentas.filter(v => v.estado === 'Pendiente').length

  const exportToPDF = () => {
    alert('Funcionalidad de exportación a PDF (por implementar en versión C# WPF)')
  }

  const exportToExcel = () => {
    alert('Funcionalidad de exportación a Excel (por implementar en versión C# WPF)')
  }

  const printInvoice = (ventaId: string) => {
    alert(`Imprimiendo factura #${ventaId} (por implementar en versión C# WPF)`)
  }

  return (
    <div className="space-y-6">
      {/* Filtros y búsqueda */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Buscar
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cliente, cédula o #factura"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Método Pago
          </label>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
            <option value="Crédito">Crédito</option>
            <option value="Saldo">Saldo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos</option>
            <option value="Completado">Completado</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>
        <div className="flex items-end space-x-2">
          <button
            onClick={exportToPDF}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
          >
            PDF
          </button>
          <button
            onClick={exportToExcel}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
          >
            Excel
          </button>
        </div>
      </div>

      {/* Resumen estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Total Ventas</p>
          <p className="text-2xl font-bold text-blue-900">
            Gs. {totalVentas.toLocaleString('es-PY')}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-medium">Facturas</p>
          <p className="text-2xl font-bold text-gray-900">{filteredVentas.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Completadas</p>
          <p className="text-2xl font-bold text-green-900">{ventasCompletadas}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600 font-medium">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-900">{ventasPendientes}</p>
        </div>
      </div>

      {/* Tabla de ventas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Factura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVentas.map((venta) => (
                <tr key={venta.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{venta.id}</div>
                      <div className="text-sm text-gray-500">{venta.fecha} {venta.hora}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{venta.cliente}</div>
                      <div className="text-sm text-gray-500">CI: {venta.cedula}</div>
                      {venta.regimenTurismo && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Turismo
                        </span>
                      )}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => printInvoice(venta.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Imprimir
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredVentas.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">🔍</div>
          <p>No se encontraron ventas con los filtros aplicados</p>
          <p className="text-sm">Pruebe cambiando los criterios de búsqueda</p>
        </div>
      )}
    </div>
  )
}