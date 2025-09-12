"use client"

import React, { useState } from 'react'

interface VentaItem {
  id: string
  type: 'servicio' | 'producto'
  name: string
  vehicleType?: string
  quantity: number
  price: number
  total: number
}

const servicios = [
  { id: 'lavado-basico', name: 'Lavado Básico', prices: { Auto: 25000, SUV: 35000, Camioneta: 40000, Moto: 15000, Furgoneta: 45000 } },
  { id: 'lavado-full', name: 'Lavado Full Detail', prices: { Auto: 35000, SUV: 45000, Camioneta: 50000, Moto: 25000, Furgoneta: 55000 } },
  { id: 'pulido', name: 'Pulido', prices: { Auto: 60000, SUV: 80000, Camioneta: 90000, Moto: 40000, Furgoneta: 95000 } },
  { id: 'inyeccion', name: 'Inyección', prices: { Auto: 40000, SUV: 50000, Camioneta: 55000, Moto: 30000, Furgoneta: 60000 } },
  { id: 'aspirado', name: 'Aspirado', prices: { Auto: 15000, SUV: 20000, Camioneta: 25000, Moto: 10000, Furgoneta: 25000 } },
  { id: 'anti-hongos', name: 'Tratamiento Anti-Hongos', prices: { Auto: 40000, SUV: 50000, Camioneta: 55000, Moto: 30000, Furgoneta: 60000 } },
  { id: 'paquete-turismo', name: 'Paquete Turismo', prices: { Auto: 60000, SUV: 75000, Camioneta: 85000, Moto: 45000, Furgoneta: 90000 } }
]

const productos = [
  { id: 'shampoo', name: 'Shampoo Auto', price: 25000 },
  { id: 'cera', name: 'Cera Líquida', price: 35000 },
  { id: 'aromatizante', name: 'Aromatizante', price: 15000 },
  { id: 'panos', name: 'Paños Microfibra', price: 20000 }
]

const vehicleTypes = ['Auto', 'SUV', 'Camioneta', 'Moto', 'Furgoneta']
const paymentMethods = ['Efectivo', 'Tarjeta', 'Transferencia', 'Crédito', 'Saldo']

export function VentasForm() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [items, setItems] = useState<VentaItem[]>([])
  const [regimenTurismo, setRegimenTurismo] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('Efectivo')
  const [showVehicleModal, setShowVehicleModal] = useState(false)
  const [pendingService, setPendingService] = useState<any>(null)

  const filteredItems = [...servicios, ...productos].filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addService = (service: any, vehicleType: string) => {
    const price = service.prices[vehicleType]
    const newItem: VentaItem = {
      id: `${service.id}-${Date.now()}`,
      type: 'servicio',
      name: service.name,
      vehicleType,
      quantity: 1,
      price,
      total: price
    }
    setItems([...items, newItem])
    setShowVehicleModal(false)
    setPendingService(null)
    setSearchTerm('')
  }

  const addProduct = (product: any) => {
    const newItem: VentaItem = {
      id: `${product.id}-${Date.now()}`,
      type: 'producto',
      name: product.name,
      quantity: 1,
      price: product.price,
      total: product.price
    }
    setItems([...items, newItem])
    setSearchTerm('')
  }

  const handleItemClick = (item: any) => {
    if (servicios.find(s => s.id === item.id)) {
      setPendingService(item)
      setShowVehicleModal(true)
    } else {
      addProduct(item)
    }
  }

  const updateQuantity = (id: string, quantity: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity, total: item.price * quantity }
        : item
    ))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const iva = regimenTurismo ? 0 : Math.round(subtotal * 0.1)
  const total = subtotal + iva

  const handleSale = () => {
    if (items.length === 0) {
      alert('Debe agregar al menos un item a la venta')
      return
    }
    
    // Simular procesamiento de venta
    alert(`Venta procesada exitosamente!\nTotal: Gs. ${total.toLocaleString('es-PY')}\nMétodo: ${paymentMethod}`)
    
    // Limpiar formulario
    setItems([])
    setSelectedClient('')
    setSearchTerm('')
    setRegimenTurismo(false)
    setPaymentMethod('Efectivo')
  }

  return (
    <div className="space-y-6">
      {/* Búsqueda de productos/servicios */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar Productos / Servicios
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Escriba para buscar servicios o productos..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          
          {searchTerm && (
            <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500">
                      {'prices' in item ? 'Servicio' : `Gs. ${item.price.toLocaleString('es-PY')}`}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cliente
          </label>
          <input
            type="text"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            placeholder="Nombre del cliente"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Régimen de turismo */}
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="regimen-turismo"
          checked={regimenTurismo}
          onChange={(e) => setRegimenTurismo(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="regimen-turismo" className="text-sm font-medium text-gray-700">
          Régimen de Turismo (IVA 0%)
        </label>
      </div>

      {/* Items de la venta */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Items de la Venta</h3>
        
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No hay items agregados. Use la búsqueda para agregar productos o servicios.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  {item.vehicleType && (
                    <p className="text-sm text-gray-500">{item.vehicleType}</p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="font-semibold">Gs. {item.total.toLocaleString('es-PY')}</p>
                    <p className="text-sm text-gray-500">Gs. {item.price.toLocaleString('es-PY')} c/u</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resumen y pago */}
      {items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método de Pago
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              {paymentMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Gs. {subtotal.toLocaleString('es-PY')}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA (10%):</span>
                <span>{regimenTurismo ? 'Gs. 0 (Turismo)' : `Gs. ${iva.toLocaleString('es-PY')}`}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">Gs. {total.toLocaleString('es-PY')}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleSale}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Procesar Venta
            </button>
          </div>
        </div>
      )}

      {/* Modal selección de vehículo */}
      {showVehicleModal && pendingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Seleccionar Tipo de Vehículo
            </h3>
            <p className="text-gray-600 mb-4">
              Servicio: <strong>{pendingService.name}</strong>
            </p>
            <div className="space-y-2">
              {vehicleTypes.map((vehicleType) => (
                <button
                  key={vehicleType}
                  onClick={() => addService(pendingService, vehicleType)}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span>{vehicleType}</span>
                  <span className="font-semibold text-green-600">
                    Gs. {pendingService.prices[vehicleType].toLocaleString('es-PY')}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setShowVehicleModal(false)
                setPendingService(null)
              }}
              className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}