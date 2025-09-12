"use client"

import React, { useState } from 'react'

interface Movimiento {
  id: string
  fecha: string
  hora: string
  tipoMovimiento: 'entrada' | 'salida' | 'ajuste'
  productoId: string
  productoNombre: string
  cantidadAnterior: number
  cantidad: number
  cantidadNueva: number
  motivo: string
  usuario: string
  observaciones?: string
  costo?: number
}

const movimientosIniciales: Movimiento[] = [
  {
    id: 'MOV001',
    fecha: '2024-01-15',
    hora: '08:30',
    tipoMovimiento: 'salida',
    productoId: 'shampoo-auto',
    productoNombre: 'Shampoo para Autos',
    cantidadAnterior: 6,
    cantidad: 1,
    cantidadNueva: 5,
    motivo: 'Consumo por servicio',
    usuario: 'Admin',
    observaciones: 'Lavado Full Detail - Cliente María González'
  },
  {
    id: 'MOV002',
    fecha: '2024-01-15',
    hora: '09:15',
    tipoMovimiento: 'salida',
    productoId: 'panos-microfibra',
    productoNombre: 'Paños de Microfibra',
    cantidadAnterior: 14,
    cantidad: 2,
    cantidadNueva: 12,
    motivo: 'Consumo por servicio',
    usuario: 'Admin',
    observaciones: 'Lavado Full Detail - Cliente María González'
  },
  {
    id: 'MOV003',
    fecha: '2024-01-15',
    hora: '10:00',
    tipoMovimiento: 'entrada',
    productoId: 'aromatizante',
    productoNombre: 'Aromatizante Auto',
    cantidadAnterior: 20,
    cantidad: 50,
    cantidadNueva: 70,
    motivo: 'Compra a proveedor',
    usuario: 'Admin',
    costo: 150000,
    observaciones: 'Pedido #P001 - Fragancias Paraguay'
  },
  {
    id: 'MOV004',
    fecha: '2024-01-15',
    hora: '11:30',
    tipoMovimiento: 'ajuste',
    productoId: 'cera-liquida',
    productoNombre: 'Cera Líquida Premium',
    cantidadAnterior: 3,
    cantidad: -1,
    cantidadNueva: 2,
    motivo: 'Ajuste de inventario',
    usuario: 'Admin',
    observaciones: 'Envase roto encontrado en almacén'
  },
  {
    id: 'MOV005',
    fecha: '2024-01-15',
    hora: '12:45',
    tipoMovimiento: 'salida',
    productoId: 'desinfectante',
    productoNombre: 'Desinfectante Multi-uso',
    cantidadAnterior: 9,
    cantidad: 1,
    cantidadNueva: 8,
    motivo: 'Venta directa',
    usuario: 'Admin',
    observaciones: 'Cliente Roberto Silva'
  },
  {
    id: 'MOV006',
    fecha: '2024-01-14',
    hora: '16:20',
    tipoMovimiento: 'entrada',
    productoId: 'shampoo-auto',
    productoNombre: 'Shampoo para Autos',
    cantidadAnterior: 2,
    cantidad: 20,
    cantidadNueva: 22,
    motivo: 'Compra a proveedor',
    usuario: 'Admin',
    costo: 500000,
    observaciones: 'Pedido #P002 - AutoLimpieza S.A.'
  }
]

const tiposMovimiento = [
  { value: 'entrada', label: 'Entrada', color: 'text-green-600' },
  { value: 'salida', label: 'Salida', color: 'text-red-600' },
  { value: 'ajuste', label: 'Ajuste', color: 'text-blue-600' }
]

export function MovimientosList() {
  const [movimientos] = useState<Movimiento[]>(movimientosIniciales)
  const [searchTerm, setSearchTerm] = useState('')
  const [tipoFilter, setTipoFilter] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const filteredMovimientos = movimientos.filter(movimiento => {
    const matchesSearch = movimiento.productoNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movimiento.motivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movimiento.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTipo = !tipoFilter || movimiento.tipoMovimiento === tipoFilter
    const matchesFecha = (!fechaInicio || movimiento.fecha >= fechaInicio) && 
                        (!fechaFin || movimiento.fecha <= fechaFin)

    return matchesSearch && matchesTipo && matchesFecha
  })

  const totalEntradas = filteredMovimientos.filter(m => m.tipoMovimiento === 'entrada').length
  const totalSalidas = filteredMovimientos.filter(m => m.tipoMovimiento === 'salida').length
  const totalAjustes = filteredMovimientos.filter(m => m.tipoMovimiento === 'ajuste').length
  const valorEntradas = filteredMovimientos
    .filter(m => m.tipoMovimiento === 'entrada' && m.costo)
    .reduce((sum, m) => sum + (m.costo || 0), 0)

  const exportarReporte = () => {
    alert('Exportando reporte de movimientos (funcionalidad por implementar en C# WPF)')
  }

  const getTipoMovimientoLabel = (tipo: string) => {
    const tipoData = tiposMovimiento.find(t => t.value === tipo)
    return tipoData ? tipoData.label : tipo
  }

  const getTipoMovimientoColor = (tipo: string) => {
    const tipoData = tiposMovimiento.find(t => t.value === tipo)
    return tipoData ? tipoData.color : 'text-gray-600'
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtros de Búsqueda</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Producto, motivo o ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo Movimiento
            </label>
            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos</option>
              {tiposMovimiento.map(tipo => (
                <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
              ))}
            </select>
          </div>
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
              onClick={exportarReporte}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Exportar
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Entradas</p>
          <p className="text-2xl font-bold text-green-900">{totalEntradas}</p>
          {valorEntradas > 0 && (
            <p className="text-xs text-green-700">Valor: Gs. {valorEntradas.toLocaleString('es-PY')}</p>
          )}
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600 font-medium">Salidas</p>
          <p className="text-2xl font-bold text-red-900">{totalSalidas}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Ajustes</p>
          <p className="text-2xl font-bold text-blue-900">{totalAjustes}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-medium">Total Movimientos</p>
          <p className="text-2xl font-bold text-gray-900">{filteredMovimientos.length}</p>
        </div>
      </div>

      {/* Tabla de movimientos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Historial de Movimientos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID / Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motivo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMovimientos.map((movimiento) => (
                <tr key={movimiento.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{movimiento.id}</div>
                      <div className="text-sm text-gray-500">{movimiento.fecha} {movimiento.hora}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{movimiento.productoNombre}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      movimiento.tipoMovimiento === 'entrada' ? 'bg-green-100 text-green-800' :
                      movimiento.tipoMovimiento === 'salida' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {getTipoMovimientoLabel(movimiento.tipoMovimiento)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className={`font-medium ${getTipoMovimientoColor(movimiento.tipoMovimiento)}`}>
                        {movimiento.tipoMovimiento === 'entrada' ? '+' : movimiento.tipoMovimiento === 'salida' ? '-' : ''}
                        {movimiento.cantidad}
                      </div>
                      <div className="text-xs text-gray-500">
                        {movimiento.cantidadAnterior} → {movimiento.cantidadNueva}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">{movimiento.motivo}</div>
                      {movimiento.observaciones && (
                        <div className="text-xs text-gray-500 mt-1">{movimiento.observaciones}</div>
                      )}
                      {movimiento.costo && (
                        <div className="text-xs text-green-600 mt-1">
                          Costo: Gs. {movimiento.costo.toLocaleString('es-PY')}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {movimiento.usuario}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredMovimientos.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📋</div>
          <p>No se encontraron movimientos con los filtros aplicados</p>
          <p className="text-sm">Pruebe cambiando los criterios de búsqueda</p>
        </div>
      )}
    </div>
  )
}