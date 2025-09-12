"use client"

import React, { useState, useEffect } from 'react'

interface Cliente {
  id?: string
  nombre: string
  cedula: string
  telefono: string
  email?: string
  direccion?: string
  regimenTurismo: boolean
  fechaRegistro?: string
  activo: boolean
}

interface ClienteFormProps {
  editingClient?: Cliente | null
  onSave: () => void
  onCancel: () => void
}

export function ClienteForm({ editingClient, onSave, onCancel }: ClienteFormProps) {
  const [formData, setFormData] = useState<Partial<Cliente>>({
    nombre: '',
    cedula: '',
    telefono: '',
    email: '',
    direccion: '',
    regimenTurismo: false,
    activo: true
  })

  useEffect(() => {
    if (editingClient) {
      setFormData(editingClient)
    }
  }, [editingClient])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nombre || !formData.cedula || !formData.telefono) {
      alert('Por favor complete todos los campos obligatorios')
      return
    }

    console.log('Guardando cliente:', formData)
    alert(editingClient ? 'Cliente actualizado exitosamente' : 'Cliente creado exitosamente')
    onSave()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                required
                value={formData.nombre || ''}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: María González"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cédula de Identidad *
              </label>
              <input
                type="text"
                required
                value={formData.cedula || ''}
                onChange={(e) => handleInputChange('cedula', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 1.234.567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                required
                value={formData.telefono || ''}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: 0981-123456"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: cliente@email.com"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            <textarea
              rows={3}
              value={formData.direccion || ''}
              onChange={(e) => handleInputChange('direccion', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Dirección completa del cliente"
            />
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="regimen-turismo"
                checked={formData.regimenTurismo || false}
                onChange={(e) => handleInputChange('regimenTurismo', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="regimen-turismo" className="ml-2 text-sm text-gray-700">
                Régimen de Turismo (IVA 0%)
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="cliente-activo"
                checked={formData.activo || false}
                onChange={(e) => handleInputChange('activo', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="cliente-activo" className="ml-2 text-sm text-gray-700">
                Cliente activo
              </label>
            </div>
          </div>
        </div>

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
            {editingClient ? 'Actualizar Cliente' : 'Crear Cliente'}
          </button>
        </div>
      </form>
    </div>
  )
}