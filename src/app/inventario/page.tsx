"use client"

import React, { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { InventarioList } from '@/components/inventario/InventarioList'
import { ProductoForm } from '@/components/inventario/ProductoForm'
import { MovimientosList } from '@/components/inventario/MovimientosList'

export default function InventarioPage() {
  const [activeTab, setActiveTab] = useState('productos')
  const [editingProduct, setEditingProduct] = useState<any>(null)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">📦 Control de Inventario</h1>
              <p className="text-gray-600 mt-1">Gestión completa de productos e insumos</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Productos en stock</p>
              <p className="text-2xl font-bold text-green-600">24</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('productos')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'productos'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Productos
              </button>
              <button
                onClick={() => setActiveTab('nuevo')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'nuevo'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </button>
              <button
                onClick={() => setActiveTab('movimientos')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'movimientos'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Movimientos
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'productos' && (
              <InventarioList 
                onEdit={(product) => {
                  setEditingProduct(product)
                  setActiveTab('nuevo')
                }}
              />
            )}
            {activeTab === 'nuevo' && (
              <ProductoForm 
                editingProduct={editingProduct}
                onSave={() => {
                  setEditingProduct(null)
                  setActiveTab('productos')
                }}
                onCancel={() => {
                  setEditingProduct(null)
                  setActiveTab('productos')
                }}
              />
            )}
            {activeTab === 'movimientos' && <MovimientosList />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}