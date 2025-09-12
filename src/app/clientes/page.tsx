"use client"

import React, { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { ClientesList } from '@/components/clientes/ClientesList'
import { ClienteForm } from '@/components/clientes/ClienteForm'
import { ClienteHistorial } from '@/components/clientes/ClienteHistorial'

export default function ClientesPage() {
  const [activeTab, setActiveTab] = useState('lista')
  const [editingClient, setEditingClient] = useState<any>(null)
  const [viewingClientHistory, setViewingClientHistory] = useState<any>(null)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">👥 Gestión de Clientes</h1>
              <p className="text-gray-600 mt-1">Base de datos completa de clientes</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total clientes</p>
              <p className="text-2xl font-bold text-blue-600">156</p>
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
                Lista de Clientes
              </button>
              <button
                onClick={() => setActiveTab('nuevo')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'nuevo'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
              </button>
              {viewingClientHistory && (
                <button
                  onClick={() => setActiveTab('historial')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'historial'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Historial - {viewingClientHistory.nombre}
                </button>
              )}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'lista' && (
              <ClientesList 
                onEdit={(client) => {
                  setEditingClient(client)
                  setActiveTab('nuevo')
                }}
                onViewHistory={(client) => {
                  setViewingClientHistory(client)
                  setActiveTab('historial')
                }}
              />
            )}
            {activeTab === 'nuevo' && (
              <ClienteForm 
                editingClient={editingClient}
                onSave={() => {
                  setEditingClient(null)
                  setActiveTab('lista')
                }}
                onCancel={() => {
                  setEditingClient(null)
                  setActiveTab('lista')
                }}
              />
            )}
            {activeTab === 'historial' && viewingClientHistory && (
              <ClienteHistorial 
                client={viewingClientHistory}
                onBack={() => {
                  setViewingClientHistory(null)
                  setActiveTab('lista')
                }}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}