"use client"

import React from 'react'

const inventoryAlerts = [
  {
    product: 'Shampoo para Autos',
    currentStock: 5,
    minStock: 10,
    unit: 'litros',
    urgency: 'high',
    supplier: 'AutoLimpieza S.A.',
    lastOrder: '15/01/2024'
  },
  {
    product: 'Paños de Microfibra',
    currentStock: 12,
    minStock: 20,
    unit: 'unidades',
    urgency: 'medium',
    supplier: 'Textiles del Este',
    lastOrder: '10/01/2024'
  },
  {
    product: 'Cera Líquida',
    currentStock: 2,
    minStock: 8,
    unit: 'litros',
    urgency: 'high',
    supplier: 'AutoLimpieza S.A.',
    lastOrder: '08/01/2024'
  },
  {
    product: 'Desinfectante',
    currentStock: 8,
    minStock: 15,
    unit: 'litros',
    urgency: 'medium',
    supplier: 'Químicos Paraguay',
    lastOrder: '12/01/2024'
  }
]

export function InventoryAlerts() {
  const highUrgency = inventoryAlerts.filter(item => item.urgency === 'high').length
  const mediumUrgency = inventoryAlerts.filter(item => item.urgency === 'medium').length

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-gray-900">Alertas de Inventario</h3>
            <div className="flex items-center space-x-2">
              {highUrgency > 0 && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                  {highUrgency} crítico{highUrgency !== 1 ? 's' : ''}
                </span>
              )}
              {mediumUrgency > 0 && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  {mediumUrgency} bajo{mediumUrgency !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Gestionar inventario
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {inventoryAlerts.length > 0 ? (
          <div className="space-y-4">
            {inventoryAlerts.map((item, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                item.urgency === 'high' 
                  ? 'bg-red-50 border-red-400' 
                  : 'bg-yellow-50 border-yellow-400'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{item.product}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.urgency === 'high'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.urgency === 'high' ? 'CRÍTICO' : 'BAJO'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Stock actual:</p>
                    <p className="font-semibold">{item.currentStock} {item.unit}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Stock mínimo:</p>
                    <p className="font-semibold">{item.minStock} {item.unit}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Proveedor:</p>
                    <p className="font-semibold">{item.supplier}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Último pedido:</p>
                    <p className="font-semibold">{item.lastOrder}</p>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className={`h-2 rounded-full ${
                        item.urgency === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${(item.currentStock / item.minStock) * 100}%` }}
                    ></div>
                  </div>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap">
                    Realizar pedido
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">✅</div>
            <p>No hay productos con stock bajo</p>
            <p className="text-sm">Todos los productos tienen inventario suficiente</p>
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4 text-sm text-center">
            <div>
              <p className="text-gray-600">Productos total</p>
              <p className="font-semibold text-blue-600">24</p>
            </div>
            <div>
              <p className="text-gray-600">Stock crítico</p>
              <p className="font-semibold text-red-600">{highUrgency}</p>
            </div>
            <div>
              <p className="text-gray-600">Necesita reorden</p>
              <p className="font-semibold text-yellow-600">{mediumUrgency}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}