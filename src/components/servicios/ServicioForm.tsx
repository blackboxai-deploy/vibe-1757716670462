"use client"

import React, { useState, useEffect } from 'react'

interface Servicio {
  id: string
  name: string
  description: string
  prices: {
    Auto: number
    SUV: number
    Camioneta: number
    Moto: number
    Furgoneta: number
  }
  duration: number
  active: boolean
  consumos: Array<{
    productId: string
    productName: string
    cantidad: number
    unit: string
  }>
}

const availableProducts = [
  { id: 'shampoo', name: 'Shampoo Auto', unit: 'litros' },
  { id: 'cera', name: 'Cera Líquida', unit: 'litros' },
  { id: 'panos', name: 'Paños Microfibra', unit: 'unidades' },
  { id: 'aromatizante', name: 'Aromatizante', unit: 'unidades' },
  { id: 'desinfectante', name: 'Desinfectante', unit: 'litros' },
  { id: 'pulidor', name: 'Pulidor de Carrocería', unit: 'litros' },
  { id: 'limpiador-tapizado', name: 'Limpiador de Tapizado', unit: 'litros' },
  { id: 'protector-plastico', name: 'Protector de Plásticos', unit: 'litros' }
]

const vehicleTypes = ['Auto', 'SUV', 'Camioneta', 'Moto', 'Furgoneta']

interface ServicioFormProps {
  editingService?: Servicio | null
  onSave: () => void
  onCancel: () => void
}

export function ServicioForm({ editingService, onSave, onCancel }: ServicioFormProps) {
  const [formData, setFormData] = useState<Partial<Servicio>>({
    name: '',
    description: '',
    prices: {
      Auto: 0,
      SUV: 0,
      Camioneta: 0,
      Moto: 0,
      Furgoneta: 0
    },
    duration: 30,
    active: true,
    consumos: []
  })

  const [newConsumo, setNewConsumo] = useState({
    productId: '',
    cantidad: 0,
    unit: ''
  })

  useEffect(() => {
    if (editingService) {
      setFormData(editingService)
    }
  }, [editingService])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePriceChange = (vehicleType: string, price: number) => {
    setFormData(prev => ({
      ...prev,
      prices: {
        ...prev.prices!,
        [vehicleType]: price
      }
    }))
  }

  const addConsumo = () => {
    if (newConsumo.productId && newConsumo.cantidad > 0) {
      const product = availableProducts.find(p => p.id === newConsumo.productId)
      if (product) {
        const consumo = {
          productId: product.id,
          productName: product.name,
          cantidad: newConsumo.cantidad,
          unit: product.unit
        }
        
        setFormData(prev => ({
          ...prev,
          consumos: [...(prev.consumos || []), consumo]
        }))

        setNewConsumo({
          productId: '',
          cantidad: 0,
          unit: ''
        })
      }
    }
  }

  const removeConsumo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      consumos: prev.consumos?.filter((_, i) => i !== index) || []
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description) {
      alert('Por favor complete todos los campos obligatorios')
      return
    }

    // Validar que todos los precios sean positivos
    if (Object.values(formData.prices || {}).some(price => (price as number) <= 0)) {
      alert('Todos los precios deben ser mayores a cero')
      return
    }

    console.log('Guardando servicio:', formData)
    alert(editingService ? 'Servicio actualizado exitosamente' : 'Servicio creado exitosamente')
    onSave()
  }

  const generatePricesFromBase = (basePrice: number) => {
    if (basePrice > 0) {
      const multipliers = {
        Auto: 1,
        SUV: 1.4,
        Camioneta: 1.6,
        Moto: 0.6,
        Furgoneta: 1.8
      }

      const newPrices = Object.keys(multipliers).reduce((acc, vehicleType) => {
        const multiplier = multipliers[vehicleType as keyof typeof multipliers]
        if (acc) {
          acc[vehicleType as keyof typeof acc] = Math.round(basePrice * multiplier / 1000) * 1000
        }
        return acc
      }, {} as typeof formData.prices)

      setFormData(prev => ({
        ...prev,
        prices: newPrices
      }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información básica */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingService ? 'Editar Servicio' : 'Crear Nuevo Servicio'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Servicio *
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Lavado Premium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración (minutos) *
              </label>
              <input
                type="number"
                required
                min="5"
                max="300"
                value={formData.duration || 30}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descripción detallada del servicio"
            />
          </div>

          <div className="mt-6 flex items-center">
            <input
              type="checkbox"
              id="service-active"
              checked={formData.active || false}
              onChange={(e) => handleInputChange('active', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="service-active" className="ml-2 text-sm text-gray-700">
              Servicio activo
            </label>
          </div>
        </div>

        {/* Configuración de precios */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Precios por Tipo de Vehículo</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio Base (Auto) - Generará precios automáticamente
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                step="1000"
                placeholder="Precio base para Auto"
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                onBlur={(e) => {
                  const basePrice = parseInt(e.target.value)
                  if (basePrice > 0) {
                    generatePricesFromBase(basePrice)
                  }
                }}
              />
              <span className="text-sm text-gray-500">Gs.</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Se calculará automáticamente: SUV (+40%), Camioneta (+60%), Moto (-40%), Furgoneta (+80%)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicleTypes.map((vehicleType) => (
              <div key={vehicleType}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {vehicleType} *
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    required
                    min="0"
                    step="1000"
                    value={formData.prices?.[vehicleType as keyof typeof formData.prices] || 0}
                    onChange={(e) => handlePriceChange(vehicleType, parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-500">Gs.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consumo de productos */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Consumo de Inventario</h3>
          
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Agregar Producto</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <select
                  value={newConsumo.productId}
                  onChange={(e) => {
                    const product = availableProducts.find(p => p.id === e.target.value)
                    setNewConsumo(prev => ({
                      ...prev,
                      productId: e.target.value,
                      unit: product?.unit || ''
                    }))
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccionar producto</option>
                  {availableProducts.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newConsumo.cantidad}
                  onChange={(e) => setNewConsumo(prev => ({ ...prev, cantidad: parseFloat(e.target.value) || 0 }))}
                  placeholder="Cantidad"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={newConsumo.unit}
                  readOnly
                  placeholder="Unidad"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={addConsumo}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>

          {/* Lista de productos consumidos */}
          {formData.consumos && formData.consumos.length > 0 && (
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Productos que se consumirán</h4>
              <div className="space-y-2">
                {formData.consumos.map((consumo, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{consumo.productName}</span>
                      <span className="text-gray-600 ml-2">
                        {consumo.cantidad} {consumo.unit}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeConsumo(index)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
            {editingService ? 'Actualizar Servicio' : 'Crear Servicio'}
          </button>
        </div>
      </form>
    </div>
  )
}