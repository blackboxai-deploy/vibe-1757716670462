"use client"

import React, { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { ServiciosList } from '@/components/servicios/ServiciosList'
import { ServicioForm } from '@/components/servicios/ServicioForm'
import { ConsumoInventario } from '@/components/servicios/ConsumoInventario'

export default function ServiciosPage() {
  const [activeTab, setActiveTab] = useState('lista')
  const [editingService, setEditingService] = useState<any>(null)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🚗 Gestión de Servicios</h1>
              <p className="text-gray-600 mt-1">Administración completa de servicios del lavadero</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Servicios activos</p>
              <p className="text-2xl font-bold text-blue-600">7</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('lista')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'lista'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Lista de Servicios
              </button>
              <button
                onClick={() => setActiveTab('nuevo')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'nuevo'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
              </button>
              <button
                onClick={() => setActiveTab('consumo')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'consumo'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Consumo de Inventario
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'lista' && (
              <ServiciosList 
                onEdit={(service) => {
                  setEditingService(service)
                  setActiveTab('nuevo')
                }}
              />
            )}
            {activeTab === 'nuevo' && (
              <ServicioForm 
                editingService={editingService}
                onSave={() => {
                  setEditingService(null)
                  setActiveTab('lista')
                }}
                onCancel={() => {
                  setEditingService(null)
                  setActiveTab('lista')
                }}
              />
            )}
            {activeTab === 'consumo' && <ConsumoInventario />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}