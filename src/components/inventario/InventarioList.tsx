"use client"

import React, { useState } from 'react'

interface Producto {
  id: string
  nombre: string
  categoria: string
  stockActual: number
  stockMinimo: number
  stockMaximo: number
  unidad: string
  costoPorUnidad: number
  precioVenta: number
  proveedor: string
  ubicacion: string
  fechaVencimiento?: string
  lote?: string
  activo: boolean
  fechaCreacion: string
  ultimaActualizacion: string
}

const productosIniciales: Producto[] = [
  {
    id: 'shampoo-auto',
    nombre: 'Shampoo para Autos',
    categoria: 'Limpieza',
    stockActual: 5,
    stockMinimo: 10,
    stockMaximo: 50,
    unidad: 'litros',
    costoPorUnidad: 25000,
    precioVenta: 35000,
    proveedor: 'AutoLimpieza S.A.',
    ubicacion: 'Estante A-1',
    fechaVencimiento: '2025-12-31',
    lote: 'LOT001',
    activo: true,
    fechaCreacion: '2024-01-01',
    ultimaActualizacion: '2024-01-15'
  },
  {
    id: 'cera-liquida',
    nombre: 'Cera Líquida Premium',
    categoria: 'Protección',
    stockActual: 2,
    stockMinimo: 8,
    stockMaximo: 30,
    unidad: 'litros',
    costoPorUnidad: 35000,
    precioVenta: 50000,
    proveedor: 'AutoLimpieza S.A.',
    ubicacion: 'Estante A-2',
    fechaVencimiento: '2026-06-30',
    lote: 'LOT002',
    activo: true,
    fechaCreacion: '2024-01-01',
    ultimaActualizacion: '2024-01-08'
  },
  {
    id: 'panos-microfibra',
    nombre: 'Paños de Microfibra',
    categoria: 'Herramientas',
    stockActual: 12,
    stockMinimo: 20,
    stockMaximo: 100,
    unidad: 'unidades',
    costoPorUnidad: 5000,
    precioVenta: 8000,
    proveedor: 'Textiles del Este',
    ubicacion: 'Estante B-1',
    lote: 'LOT003',
    activo: true,
    fechaCreacion: '2024-01-01',
    ultimaActualizacion: '2024-01-10'
  },
  {
    id: 'aromatizante',
    nombre: 'Aromatizante Auto',
    categoria: 'Accesorios',
    stockActual: 25,
    stockMinimo: 15,
    stockMaximo: 80,
    unidad: 'unidades',
    costoPorUnidad: 3000,
    precioVenta: 5000,
    proveedor: 'Fragancias Paraguay',
    ubicacion: 'Estante C-1',
    fechaVencimiento: '2025-08-15',
    lote: 'LOT004',
    activo: true,
    fechaCreacion: '2024-01-01',
    ultimaActualizacion: '2024-01-12'
  },
  {
    id: 'desinfectante',
    nombre: 'Desinfectante Multi-uso',
    categoria: 'Limpieza',
    stockActual: 8,
    stockMinimo: 15,
    stockMaximo: 40,
    unidad: 'litros',
    costoPorUnidad: 18000,
    precioVenta: 28000,
    proveedor: 'Químicos Paraguay',
    ubicacion: 'Estante A-3',
    fechaVencimiento: '2025-10-20',
    lote: 'LOT005',
    activo: true,
    fechaCreacion: '2024-01-01',
    ultimaActualizacion: '2024-01-14'
  }
]

interface InventarioListProps {
  onEdit: (product: Producto) => void
}

export function InventarioList({ onEdit }: InventarioListProps) {
  const [productos, setProductos] = useState<Producto[]>(productosIniciales)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [stockFilter, setStockFilter] = useState('')

  const filteredProducts = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         producto.proveedor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || producto.categoria === categoryFilter
    const matchesStock = 
      !stockFilter ||
      (stockFilter === 'bajo' && producto.stockActual <= producto.stockMinimo) ||
      (stockFilter === 'normal' && producto.stockActual > producto.stockMinimo && producto.stockActual < producto.stockMaximo) ||
      (stockFilter === 'alto' && producto.stockActual >= producto.stockMaximo) ||
      (stockFilter === 'agotado' && producto.stockActual === 0)

    return matchesSearch && matchesCategory && matchesStock
  })

  const categorias = Array.from(new Set(productos.map(p => p.categoria)))
  const productosStockBajo = productos.filter(p => p.stockActual <= p.stockMinimo).length
  const productosAgotados = productos.filter(p => p.stockActual === 0).length
  const valorTotalInventario = productos.reduce((sum, p) => sum + (p.stockActual * p.costoPorUnidad), 0)

  const getStockStatus = (producto: Producto) => {
    if (producto.stockActual === 0) return { text: 'Agotado', color: 'bg-red-100 text-red-800' }
    if (producto.stockActual <= producto.stockMinimo) return { text: 'Stock Bajo', color: 'bg-yellow-100 text-yellow-800' }
    if (producto.stockActual >= producto.stockMaximo) return { text: 'Stock Alto', color: 'bg-blue-100 text-blue-800' }
    return { text: 'Normal', color: 'bg-green-100 text-green-800' }
  }

  const adjustStock = (id: string, adjustment: number) => {
    setProductos(productos.map(producto => 
      producto.id === id 
        ? { 
            ...producto, 
            stockActual: Math.max(0, producto.stockActual + adjustment),
            ultimaActualizacion: new Date().toISOString().split('T')[0]
          }
        : producto
    ))
  }

  const toggleProductStatus = (id: string) => {
    setProductos(productos.map(producto =>
      producto.id === id ? { ...producto, activo: !producto.activo } : producto
    ))
  }

  return (
    <div className="space-y-6">
      {/* Filtros y búsqueda */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
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
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los stocks</option>
            <option value="agotado">Agotado</option>
            <option value="bajo">Stock Bajo</option>
            <option value="normal">Stock Normal</option>
            <option value="alto">Stock Alto</option>
          </select>
        </div>
        <div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Exportar
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Valor Total Inventario</p>
          <p className="text-2xl font-bold text-blue-900">
            Gs. {valorTotalInventario.toLocaleString('es-PY')}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 font-medium">Total Productos</p>
          <p className="text-2xl font-bold text-gray-900">{productos.length}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600 font-medium">Stock Bajo</p>
          <p className="text-2xl font-bold text-yellow-900">{productosStockBajo}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-600 font-medium">Agotados</p>
          <p className="text-2xl font-bold text-red-900">{productosAgotados}</p>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precios
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proveedor
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
              {filteredProducts.map((producto) => {
                const stockStatus = getStockStatus(producto)
                return (
                  <tr key={producto.id} className={`hover:bg-gray-50 ${!producto.activo ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{producto.nombre}</div>
                        <div className="text-sm text-gray-500">{producto.categoria}</div>
                        <div className="text-xs text-gray-400">📍 {producto.ubicacion}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {producto.stockActual} {producto.unidad}
                          </div>
                          <div className="text-xs text-gray-500">
                            Min: {producto.stockMinimo} | Max: {producto.stockMaximo}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => adjustStock(producto.id, 1)}
                            className="w-6 h-6 bg-green-100 hover:bg-green-200 text-green-700 rounded text-xs font-bold"
                          >
                            +
                          </button>
                          <button
                            onClick={() => adjustStock(producto.id, -1)}
                            className="w-6 h-6 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs font-bold"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-gray-900">
                          Costo: Gs. {producto.costoPorUnidad.toLocaleString('es-PY')}
                        </div>
                        <div className="text-green-600 font-medium">
                          Venta: Gs. {producto.precioVenta.toLocaleString('es-PY')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-gray-900">{producto.proveedor}</div>
                        {producto.lote && (
                          <div className="text-xs text-gray-500">Lote: {producto.lote}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}>
                        {stockStatus.text}
                      </span>
                      {!producto.activo && (
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Inactivo
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => onEdit(producto)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => toggleProductStatus(producto.id)}
                        className={producto.activo ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                      >
                        {producto.activo ? 'Desactivar' : 'Activar'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">📦</div>
          <p>No se encontraron productos con los filtros aplicados</p>
          <p className="text-sm">Pruebe cambiando los criterios de búsqueda</p>
        </div>
      )}
    </div>
  )
}