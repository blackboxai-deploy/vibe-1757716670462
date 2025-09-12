"use client"

import React, { useState } from 'react'

interface Gasto {
  id: string
  fecha: string
  concepto: string
  categoria: 'Insumos' | 'Mantenimiento' | 'Servicios' | 'Nómina' | 'Otros'
  monto: number
  formaPago: string
  proveedor?: string
  numeroRecibo?: string
  observaciones?: string
  usuario: string
  fechaCreacion: string
}

const gastosIniciales: Gasto[] = [
  {
    id: 'GAS001',
    fecha: '2024-01-15',
    concepto: 'Compra de shampoo para autos',
    categoria: 'Insumos',
    monto: 150000,
    formaPago: 'Transferencia',
    proveedor: 'AutoLimpieza S.A.',
    numeroRecibo: 'REC-001234',
    observaciones: 'Pedido mensual de insumos',
    usuario: 'Admin',
    fechaCreacion: '2024-01-15 08:30'
  },
  {
    id: 'GAS002',
    fecha: '2024-01-14',
    concepto: 'Reparación de aspiradora industrial',
    categoria: 'Mantenimiento',
    monto: 320000,
    formaPago: 'Efectivo',
    proveedor: 'TecnoService',
    numeroRecibo: 'REC-001235',
    observaciones: 'Cambio de motor y filtros',
    usuario: 'Admin',
    fechaCreacion: '2024-01-14 14:20'
  },
  {
    id: 'GAS003',
    fecha: '2024-01-13',
    concepto: 'Pago de luz eléctrica',
    categoria: 'Servicios',
    monto: 450000,
    formaPago: 'Transferencia',
    proveedor: 'ANDE',
    numeroRecibo: 'FAC-789456',
    observaciones: 'Factura mensual enero 2024',
    usuario: 'Admin',
    fechaCreacion: '2024-01-13 16:45'
  },
  {
    id: 'GAS004',
    fecha: '2024-01-10',
    concepto: 'Salario empleado Juan Pérez',
    categoria: 'Nómina',
    monto: 2200000,
    formaPago: 'Transferencia',
    observaciones: 'Salario enero + aguinaldo proporcional',
    usuario: 'Admin',
    fechaCreacion: '2024-01-10 17:00'
  },
  {
    id: 'GAS005',
    fecha: '2024-01-08',
    concepto: 'Combustible para generador',
    categoria: 'Otros',
    monto: 180000,
    formaPago: 'Efectivo',
    proveedor: 'Estación Shell',
    numeroRecibo: 'TIC-987654',
    observaciones: '40 litros de diésel',
    usuario: 'Admin',
    fechaCreacion: '2024-01-08 12:30'
  }
]

interface GastosListProps {
  onEdit: (gasto: Gasto) => void
}

export function GastosList({ onEdit }: GastosListProps) {
  const [gastos] = useState<Gasto[]>(gastosIniciales)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const filteredGastos = gastos.filter(gasto => {
    const matchesSearch = gasto.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (gasto.proveedor && gasto.proveedor.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         gasto.numeroRecibo?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || gasto.categoria === categoryFilter
    const matchesFecha = (!fechaInicio || gasto.fecha >= fechaInicio) && 
                        (!fechaFin || gasto.fecha <= fechaFin)

    return matchesSearch && matchesCategory && matchesFecha
  })

  const categorias = ['Insumos', 'Mantenimiento', 'Servicios', 'Nómina', 'Otros']
  const totalGastos = filteredGastos.reduce((sum, gasto) => sum + gasto.monto, 0)
  const gastosPorCategoria = categorias.map(categoria => ({
    categoria,
    total: filteredGastos.filter(g => g.categoria === categoria).reduce((sum, g) => sum + g.monto, 0),
    cantidad: filteredGastos.filter(g => g.categoria === categoria).length
  }))

  const exportarGastos = () => {
    alert('Exportando gastos (funcionalidad por implementar en C# WPF)')
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar gastos..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>{categoria}</option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <button
            onClick={exportarGastos}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Exportar
          </button>
        </div>
      </div>

      {/* Resumen por categorías */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {gastosPorCategoria.map((item) => (
          <div key={item.categoria} className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-600 font-medium">{item.categoria}</p>
            <p className="text-xl font-bold text-red-900">
              Gs. {item.total.toLocaleString('es-PY')}
            </p>
            <p className="text-xs text-red-700">{item.cantidad} gastos</p>
          </div>
        ))}
      </div>

      {/* Total general */}
      <div className="bg-gray-900 text-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Total de Gastos Filtrados</h3>
          <p className="text-3xl font-bold">Gs. {totalGastos.toLocaleString('es-PY')}</p>
        </div>
      </div>

      {/* Lista de gastos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha / ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Concepto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGastos.map((gasto) => (
                <tr key={gasto.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">#{gasto.id}</div>
                      <div className="text-sm text-gray-500">{gasto.fecha}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{gasto.concepto}</div>
                      {gasto.observaciones && (
                        <div className="text-sm text-gray-500">{gasto.observaciones}</div>
                      )}
                      {gasto.numeroRecibo && (
                        <div className="text-xs text-blue-600">Recibo: {gasto.numeroRecibo}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      gasto.categoria === 'Insumos' ? 'bg-blue-100 text-blue-800' :
                      gasto.categoria === 'Mantenimiento' ? 'bg-yellow-100 text-yellow-800' :
                      gasto.categoria === 'Servicios' ? 'bg-green-100 text-green-800' :
                      gasto.categoria === 'Nómina' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {gasto.categoria}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">{gasto.formaPago}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-red-600">
                      Gs. {gasto.monto.toLocaleString('es-PY')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{gasto.proveedor || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => onEdit(gasto)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      Ver Recibo
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredGastos.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">💸</div>
          <p>No se encontraron gastos con los filtros aplicados</p>
          <p className="text-sm">Pruebe cambiando los criterios de búsqueda</p>
        </div>
      )}
    </div>
  )
}