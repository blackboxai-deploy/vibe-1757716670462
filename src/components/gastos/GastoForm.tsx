"use client"

import React, { useState, useEffect } from 'react'

interface Gasto {
  id?: string
  fecha: string
  concepto: string
  categoria: 'Insumos' | 'Mantenimiento' | 'Servicios' | 'Nómina' | 'Otros'
  monto: number
  formaPago: string
  proveedor?: string
  numeroRecibo?: string
  observaciones?: string
  archivoRecibo?: File
}

const categorias = ['Insumos', 'Mantenimiento', 'Servicios', 'Nómina', 'Otros']
const formasPago = ['Efectivo', 'Tarjeta', 'Transferencia', 'Cheque', 'Crédito']

interface GastoFormProps {
  editingGasto?: Gasto | null
  onSave: () => void
  onCancel: () => void
}

export function GastoForm({ editingGasto, onSave, onCancel }: GastoFormProps) {
  const [formData, setFormData] = useState<Partial<Gasto>>({
    fecha: new Date().toISOString().split('T')[0],
    concepto: '',
    categoria: 'Insumos',
    monto: 0,
    formaPago: 'Efectivo',
    proveedor: '',
    numeroRecibo: '',
    observaciones: ''
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    if (editingGasto) {
      setFormData(editingGasto)
    }
  }, [editingGasto])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.concepto || !formData.monto || formData.monto <= 0) {
      alert('Por favor complete todos los campos obligatorios')
      return
    }

    const gastoData = {
      ...formData,
      archivoRecibo: selectedFile || undefined
    }

    console.log('Guardando gasto:', gastoData)
    alert(editingGasto ? 'Gasto actualizado exitosamente' : 'Gasto registrado exitosamente')
    onSave()
  }

  const generarNumeroRecibo = () => {
    const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const aleatorio = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    const numero = `REC-${fecha}-${aleatorio}`
    setFormData(prev => ({ ...prev, numeroRecibo: numero }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información básica */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingGasto ? 'Editar Gasto' : 'Registrar Nuevo Gasto'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha del Gasto *
              </label>
              <input
                type="date"
                required
                value={formData.fecha || ''}
                onChange={(e) => handleInputChange('fecha', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Concepto del Gasto *
              </label>
              <input
                type="text"
                required
                value={formData.concepto || ''}
                onChange={(e) => handleInputChange('concepto', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ej: Compra de insumos de limpieza"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monto *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 text-sm">Gs.</span>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.monto || 0}
                  onChange={(e) => handleInputChange('monto', parseInt(e.target.value) || 0)}
                  className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Forma de Pago *
              </label>
              <select
                required
                value={formData.formaPago || ''}
                onChange={(e) => handleInputChange('formaPago', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {formasPago.map(forma => (
                  <option key={forma} value={forma}>{forma}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proveedor
              </label>
              <input
                type="text"
                value={formData.proveedor || ''}
                onChange={(e) => handleInputChange('proveedor', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nombre del proveedor"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Recibo/Factura
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={formData.numeroRecibo || ''}
                  onChange={(e) => handleInputChange('numeroRecibo', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Número de recibo"
                />
                <button
                  type="button"
                  onClick={generarNumeroRecibo}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm"
                >
                  Generar
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones
            </label>
            <textarea
              rows={3}
              value={formData.observaciones || ''}
              onChange={(e) => handleInputChange('observaciones', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Detalles adicionales del gasto"
            />
          </div>
        </div>

        {/* Upload de recibo */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Archivo de Recibo/Factura</h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <div className="text-4xl text-gray-400 mb-4">📎</div>
              <div className="mb-4">
                <label htmlFor="archivo-recibo" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Subir archivo de recibo
                  </span>
                  <input
                    id="archivo-recibo"
                    type="file"
                    className="sr-only"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />
                  <div className="mt-1 text-sm text-gray-600">
                    PNG, JPG, PDF hasta 5MB
                  </div>
                </label>
              </div>
              <button
                type="button"
                onClick={() => document.getElementById('archivo-recibo')?.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Seleccionar Archivo
              </button>
            </div>
            
            {selectedFile && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      📄 {selectedFile.name}
                    </p>
                    <p className="text-xs text-green-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vista previa del gasto */}
        {formData.monto && formData.monto > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">📋 Vista Previa del Gasto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-yellow-700">Fecha:</span>
                <span className="ml-2 text-yellow-900">{formData.fecha}</span>
              </div>
              <div>
                <span className="font-medium text-yellow-700">Categoría:</span>
                <span className="ml-2 text-yellow-900">{formData.categoria}</span>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-yellow-700">Concepto:</span>
                <span className="ml-2 text-yellow-900">{formData.concepto}</span>
              </div>
              <div>
                <span className="font-medium text-yellow-700">Monto:</span>
                <span className="ml-2 text-yellow-900 font-bold">
                  Gs. {formData.monto.toLocaleString('es-PY')}
                </span>
              </div>
              <div>
                <span className="font-medium text-yellow-700">Forma de Pago:</span>
                <span className="ml-2 text-yellow-900">{formData.formaPago}</span>
              </div>
            </div>
          </div>
        )}

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
            {editingGasto ? 'Actualizar Gasto' : 'Registrar Gasto'}
          </button>
        </div>
      </form>
    </div>
  )
}