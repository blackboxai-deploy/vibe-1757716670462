"use client"

import React from 'react'

const popularServices = [
  {
    name: 'Lavado Full Detail',
    count: 12,
    percentage: 35,
    revenue: 'Gs. 540.000',
    vehicleTypes: { Auto: 8, SUV: 3, Camioneta: 1 }
  },
  {
    name: 'Lavado Básico',
    count: 8,
    percentage: 25,
    revenue: 'Gs. 200.000',
    vehicleTypes: { Auto: 6, Moto: 2 }
  },
  {
    name: 'Pulido',
    count: 6,
    percentage: 20,
    revenue: 'Gs. 360.000',
    vehicleTypes: { Auto: 4, SUV: 2 }
  },
  {
    name: 'Aspirado',
    count: 4,
    percentage: 15,
    revenue: 'Gs. 60.000',
    vehicleTypes: { Auto: 2, Moto: 2 }
  },
  {
    name: 'Tratamiento Anti-Hongos',
    count: 2,
    percentage: 5,
    revenue: 'Gs. 80.000',
    vehicleTypes: { Auto: 1, SUV: 1 }
  }
]

export function PopularServices() {
  const totalServices = popularServices.reduce((sum, service) => sum + service.count, 0)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Servicios Populares</h3>
          <span className="text-sm text-gray-500">{totalServices} servicios hoy</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {popularServices.map((service, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{service.name}</h4>
                <span className="text-sm text-gray-600">{service.count} servicios</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${service.percentage}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-green-600">{service.revenue}</span>
                  <div className="flex items-center space-x-1">
                    {Object.entries(service.vehicleTypes).map(([type, count]) => (
                      <span key={type} className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {type}: {count}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-gray-500">{service.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <p className="text-gray-600">Servicio más popular</p>
              <p className="font-semibold text-blue-600">Lavado Full Detail</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Ingresos por servicios</p>
              <p className="font-semibold text-green-600">Gs. 1.240.000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}