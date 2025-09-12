"use client"

import React, { useState } from 'react'

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
  duration: number // en minutos
  active: boolean
  consumos: Array<{
    productId: string
    productName: string
    cantidad: number
    unit: string
  }>
}

const defaultServices: Servicio[] = [
  {
    id: 'lavado-basico',
    name: 'Lavado Básico',
    description: 'Lavado exterior básico con shampoo y enjuague',
    prices: { Auto: 25000, SUV: 35000, Camioneta: 40000, Moto: 15000, Furgoneta: 45000 },
    duration: 30,
    active: true,
    consumos: [
      { productId: 'shampoo', productName: 'Shampoo Auto', cantidad: 0.1, unit: 'litros' },
      { productId: 'panos', productName: 'Paños Microfibra', cantidad: 1, unit: 'unidades' }
    ]
  },
  {
    id: 'lavado-full',
    name: 'Lavado Full Detail',
    description: 'Lavado completo exterior e interior con aspirado',
    prices: { Auto: 35000, SUV: 45000, Camioneta: 50000, Moto: 25000, Furgoneta: 55000 },
    duration: 60,
    active: true,
    consumos: [
      { productId: 'shampoo', productName: 'Shampoo Auto', cantidad: 0.15, unit: 'litros' },
      { productId: 'cera', productName: 'Cera Líquida', cantidad: 0.05, unit: 'litros' },
      { productId: 'panos', productName: 'Paños Microfibra', cantidad: 2, unit: 'unidades' },
      { productId: 'aromatizante', productName: 'Aromatizante', cantidad: 1, unit: 'unidades' }
    ]
  },
  {
    id: 'pulido',
    name: 'Pulido',
    description: 'Pulido profesional de carrocería',
    prices: { Auto: 60000, SUV: 80000, Camioneta: 90000, Moto: 40000, Furgoneta: 95000 },
    duration: 120,
    active: true,
    consumos: [
      { productId: 'cera', productName: 'Cera Líquida', cantidad: 0.2, unit: 'litros' },
      { productId: 'panos', productName: 'Paños Microfibra', cantidad: 3, unit: 'unidades' }
    ]
  },
  {
    id: 'inyeccion',
    name: 'Inyección',
    description: 'Inyección de tapizados y limpieza profunda',
    prices: { Auto: 40000, SUV: 50000, Camioneta: 55000, Moto: 30000, Furgoneta: 60000 },
    duration: 90,
    active: true,
    consumos: [
      { productId: 'desinfectante', productName: 'Desinfectante', cantidad: 0.1, unit: 'litros' },
      { productId: 'panos', productName: 'Paños Microfibra', cantidad: 2, unit: 'unidades' }
    ]
  },
  {
    id: 'aspirado',
    name: 'Aspirado',
    description: 'Aspirado completo interior del vehículo',
    prices: { Auto: 15000, SUV: 20000, Camioneta: 25000, Moto: 10000, Furgoneta: 25000 },
    duration: 20,
    active: true,
    consumos: [
      { productId: 'aromatizante', productName: 'Aromatizante', cantidad: 1, unit: 'unidades' }
    ]
  },
  {
    id: 'anti-hongos',
    name: 'Tratamiento Anti-Hongos',
    description: 'Tratamiento especializado contra hongos y bacterias',
    prices: { Auto: 40000, SUV: 50000, Camioneta: 55000, Moto: 30000, Furgoneta: 60000 },
    duration: 45,
    active: true,
    consumos: [
      { productId: 'desinfectante', productName: 'Desinfectante', cantidad: 0.15, unit: 'litros' },
      { productId: 'panos', productName: 'Paños Microfibra', cantidad: 2, unit: 'unidades' }
    ]
  },
  {
    id: 'paquete-turismo',
    name: 'Paquete Turismo',
    description: 'Paquete completo especial para turistas',
    prices: { Auto: 60000, SUV: 75000, Camioneta: 85000, Moto: 45000, Furgoneta: 90000 },
    duration: 90,
    active: true,
    consumos: [
      { productId: 'shampoo', productName: 'Shampoo Auto', cantidad: 0.2, unit: 'litros' },
      { productId: 'cera', productName: 'Cera Líquida', cantidad: 0.1, unit: 'litros' },
      { productId: 'panos', productName: 'Paños Microfibra', cantidad: 3, unit: 'unidades' },
      { productId: 'aromatizante', productName: 'Aromatizante', cantidad: 2, unit: 'unidades' }
    ]
  }
]

interface ServiciosListProps {
  onEdit: (service: Servicio) => void
}

export function ServiciosList({ onEdit }: ServiciosListProps) {
  const [services, setServices] = useState<Servicio[]>(defaultServices)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleServiceStatus = (id: string) => {
    setServices(services.map(service =>
      service.id === id ? { ...service, active: !service.active } : service
    ))
  }

  const deleteService = (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este servicio?')) {
      setServices(services.filter(service => service.id !== id))
    }
  }

  const duplicateService = (service: Servicio) => {
    const newService = {
      ...service,
      id: `${service.id}-copy-${Date.now()}`,
      name: `${service.name} (Copia)`
    }
    setServices([...services, newService])
  }

  return (
    <div className="space-y-6">
      {/* Búsqueda y estadísticas */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar servicios..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-6 text-sm">
          <div className="text-center">
            <p className="text-gray-500">Total Servicios</p>
            <p className="text-xl font-bold text-blue-600">{services.length}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Activos</p>
            <p className="text-xl font-bold text-green-600">
              {services.filter(s => s.active).length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Inactivos</p>
            <p className="text-xl font-bold text-red-600">
              {services.filter(s => !s.active).length}
            </p>
          </div>
        </div>
      </div>

      {/* Lista de servicios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
              service.active ? 'border-green-200 bg-white' : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      service.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Duración:</span> {service.duration} minutos
                  </p>
                </div>
              </div>

              {/* Precios por tipo de vehículo */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Precios por vehículo:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(service.prices).map(([vehicleType, price]) => (
                    <div key={vehicleType} className="flex justify-between">
                      <span className="text-gray-600">{vehicleType}:</span>
                      <span className="font-medium text-green-600">
                        Gs. {(price as number).toLocaleString('es-PY')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consumos de productos */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Productos consumidos:</h4>
                <div className="space-y-1">
                  {service.consumos.map((consumo, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{consumo.productName}:</span>
                      <span className="font-medium text-blue-600">
                        {consumo.cantidad} {consumo.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(service)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => toggleServiceStatus(service.id)}
                  className={`flex-1 text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                    service.active
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {service.active ? 'Desactivar' : 'Activar'}
                </button>
                <button
                  onClick={() => duplicateService(service)}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium py-2 px-3 rounded-md transition-colors"
                >
                  Duplicar
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium py-2 px-3 rounded-md transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">🔍</div>
          <p>No se encontraron servicios</p>
          <p className="text-sm">Pruebe cambiando el término de búsqueda</p>
        </div>
      )}
    </div>
  )
}