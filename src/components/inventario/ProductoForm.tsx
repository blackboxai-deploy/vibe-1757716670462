"use client"

import React, { useState, useEffect } from 'react'

interface Producto {
  id?: string
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
  descripcion?: string
}

const categorias = ['Limpieza', 'Protección', 'Herramientas', 'Accesorios', 'Químicos', 'Repuestos']
const unidades = ['litros', 'unidades', 'kilogramos', 'metros', 'cajas', 'paquetes']
const ubicaciones = ['Estante A-1', 'Estante A-2', 'Estante A-3', 'Estante B-1', 'Estante B-2', 'Estante B-3', 'Estante C-1', 'Estante C-2', 'Almacén']

interface ProductoFormProps {
  editingProduct?: Producto | null
  onSave: () => void
  onCancel: () => void
}

export function ProductoForm({ editingProduct, onSave, onCancel }: ProductoFormProps) {
  const [formData, setFormData] = useState<Partial<Producto>>({
    nombre: '',
    categoria: '',
    stockActual: 0,
    stockMinimo: 0,
    stockMaximo: 0,
    unidad: '',
    costoPorUnidad: 0,
    precioVenta: 0,
    proveedor: '',
    ubicacion: '',
    fechaVencimiento: '',
    lote: '',
    activo: true,
    descripcion: ''
  })

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct)
    }
  }, [editingProduct])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateProfitMargin = () => {
    if (formData.costoPorUnidad && formData.precioVenta) {
      const margin = ((formData.precioVenta - formData.costoPorUnidad) / formData.precioVenta) * 100
      return margin.toFixed(1)
    }
    return '0'
  }

  const suggestPrice = (marginPercent: number) => {
    if (formData.costoPorUnidad) {
      const suggestedPrice = formData.costoPorUnidad / (1 - marginPercent / 100)
      setFormData(prev => ({
        ...prev,
        precioVenta: Math.round(suggestedPrice / 100) * 100 // Redondear a centena
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nombre || !formData.categoria || !formData.unidad || !formData.proveedor) {
      alert('Por favor complete todos los campos obligatorios')
      return
    }

    if (formData.stockMinimo! >= formData.stockMaximo!) {
      alert('El stock máximo debe ser mayor al stock mínimo')
      return
    }

    if (formData.precioVenta! <= formData.costoPorUnidad!) {
      alert('El precio de venta debe ser mayor al costo por unidad')
      return
    }

    console.log('Guardando producto:', formData)
    alert(editingProduct ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente')
    onSave()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información básica */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                required
                value={formData.nombre || ''}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Shampoo Premium para Autos"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                required
                value={formData.categoria || ''}
                onChange={(e) => handleInputChange('categoria', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unidad de Medida *
              </label>
              <select
                required
                value={formData.unidad || ''}
                onChange={(e) => handleInputChange('unidad', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccionar unidad</option>
                {unidades.map(unidad => (
                  <option key={unidad} value={unidad}>{unidad}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <select
                value={formData.ubicacion || ''}
                onChange={(e) => handleInputChange('ubicacion', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccionar ubicación</option>
                {ubicaciones.map(ubicacion => (
                  <option key={ubicacion} value={ubicacion}>{ubicacion}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              rows={3}
              value={formData.descripcion || ''}
              onChange={(e) => handleInputChange('descripcion', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descripción detallada del producto"
            />
          </div>
        </div>

        {/* Control de stock */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Control de Stock</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Actual *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stockActual || 0}
                onChange={(e) => handleInputChange('stockActual', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Mínimo *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stockMinimo || 0}
                onChange={(e) => handleInputChange('stockMinimo', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Cantidad mínima antes de alerta</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Máximo *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.stockMaximo || 0}
                onChange={(e) => handleInputChange('stockMaximo', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Capacidad máxima de almacenamiento</p>
            </div>
          </div>
        </div>

        {/* Precios y margen */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Precios y Rentabilidad</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Costo por Unidad *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 text-sm">Gs.</span>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.costoPorUnidad || 0}
                  onChange={(e) => handleInputChange('costoPorUnidad', parseInt(e.target.value) || 0)}
                  className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio de Venta *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 text-sm">Gs.</span>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.precioVenta || 0}
                  onChange={(e) => handleInputChange('precioVenta', parseInt(e.target.value) || 0)}
                  className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Margen de Ganancia
              </label>
              <div className="text-2xl font-bold text-green-600 py-2">
                {calculateProfitMargin()}%
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Sugerencias de precio (basado en margen):</p>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => suggestPrice(30)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded"
              >
                30% margen
              </button>
              <button
                type="button"
                onClick={() => suggestPrice(40)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded"
              >
                40% margen
              </button>
              <button
                type="button"
                onClick={() => suggestPrice(50)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded"
              >
                50% margen
              </button>
            </div>
          </div>
        </div>

        {/* Información del proveedor */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Proveedor</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proveedor *
              </label>
              <input
                type="text"
                required
                value={formData.proveedor || ''}
                onChange={(e) => handleInputChange('proveedor', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nombre del proveedor"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Lote
              </label>
              <input
                type="text"
                value={formData.lote || ''}
                onChange={(e) => handleInputChange('lote', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="LOT001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Vencimiento
              </label>
              <input
                type="date"
                value={formData.fechaVencimiento || ''}
                onChange={(e) => handleInputChange('fechaVencimiento', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Estado */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="product-active"
              checked={formData.activo || false}
              onChange={(e) => handleInputChange('activo', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="product-active" className="ml-2 text-sm text-gray-700">
              Producto activo
            </label>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            {editingProduct ? 'Actualizar Producto' : 'Crear Producto'}
          </button>
        </div>
      </form>
    </div>
  )
}