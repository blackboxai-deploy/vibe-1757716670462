"use client"

import React, { useState } from 'react'

interface Cliente {
  id: string
  nombre: string
  cedula: string
  telefono: string
  email?: string
  direccion?: string
  regimenTurismo: boolean
  fechaRegistro: string
  ultimaVisita?: string
  totalCompras: number
  serviciosRealizados: number
  activo: boolean
}

const clientesIniciales: Cliente[] = [
  {
    id: 'CLI001',
    nombre: 'María González',
    cedula: '1.234.567',
    telefono: '0981-123456',
    email: 'maria.gonzalez@email.com',
    direccion: 'Av. Santísima Trinidad 123, Asunción',
    regimenTurismo: false,
    fechaRegistro: '2024-01-05',
    ultimaVisita: '2024-01-15',
    totalCompras: 125000,
    serviciosRealizados: 8,
    activo: true
  },
  {
    id: 'CLI002',
    nombre: 'Carlos Mendoza',
    cedula: '2.345.678',
    telefono: '0985-234567',
    email: 'carlos.mendoza@email.com',
    direccion: 'Calle Palma 456, Asunción',
    regimenTurismo: false,
    fechaRegistro: '2024-01-08',
    ultimaVisita: '2024-01-15',
    totalCompras: 85000,
    serviciosRealizados: 5,
    activo: true
  },
  {
    id: 'CLI003',
    nombre: 'Ana Rodríguez',
    cedula: '3.456.789',
    telefono: '0976-345678',
    email: 'ana.rodriguez@turismo.gov.py',
    direccion: 'Hotel Guaraní, Centro de Asunción',
    regimenTurismo: true,
    fechaRegistro: '2024-01-10',
    ultimaVisita: '2024-01-15',
    totalCompras: 180000,
    serviciosRealizados: 3,
    activo: true
  }
]

interface ClientesListProps {
  onEdit: (client: Cliente) => void
  onViewHistory: (client: Cliente) => void
}

export function ClientesList({ onEdit, onViewHistory }: ClientesListProps) {
  const [clientes] = useState<Cliente[]>(clientesIniciales)
  const [searchTerm, setSearchTerm] = useState('')
  const [regimenFilter, setRegimenFilter] = useState('')

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cliente.cedula.includes(searchTerm) ||
                         (cliente.telefono && cliente.telefono.includes(searchTerm))
    const matchesRegimen = !regimenFilter || 
                          (regimenFilter === 'turismo' && cliente.regimenTurismo) ||
                          (regimenFilter === 'normal' && !cliente.regimenTurismo)

    return matchesSearch && matchesRegimen
  })

  const totalClientes = clientes.length
  const clientesTurismo = clientes.filter(c => c.regimenTurismo).length
  const clientesActivos = clientes.filter(c => c.activo).length

  return (
    <div className="space-y-6">
      {/* Filtros y búsqueda */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, cédula o teléfono..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <select
            value={regimenFilter}
            onChange={(e) => setRegimenFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos los regímenes</option>
            <option value="normal">Régimen Normal</option>
            <option value="turismo">Régimen Turismo</option>
          </select>
        </div>
        <div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Exportar Clientes
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Total Clientes</p>
          <p className="text-2xl font-bold text-blue-900">{totalClientes}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Régimen Turismo</p>
          <p className="text-2xl font-bold text-purple-900">{clientesTurismo}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Activos</p>
          <p className="text-2xl font-bold text-green-900">{clientesActivos}</p>
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Régimen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actividad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{cliente.nombre}</div>
                      <div className="text-sm text-gray-500">CI: {cliente.cedula}</div>
                      <div className="text-xs text-gray-400">ID: {cliente.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{cliente.telefono}</div>
                      {cliente.email && (
                        <div className="text-sm text-gray-500">{cliente.email}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      cliente.regimenTurismo
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cliente.regimenTurismo ? 'Turismo' : 'Normal'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">
                        Servicios: {cliente.serviciosRealizados}
                      </div>
                      <div className="text-sm text-green-600">
                        Total: Gs. {cliente.totalCompras.toLocaleString('es-PY')}
                      </div>
                      {cliente.ultimaVisita && (
                        <div className="text-xs text-gray-500">
                          Última: {cliente.ultimaVisita}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => onViewHistory(cliente)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Historial
                    </button>
                    <button
                      onClick={() => onEdit(cliente)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredClientes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-4xl mb-4">👥</div>
          <p>No se encontraron clientes con los filtros aplicados</p>
          <p className="text-sm">Pruebe cambiando los criterios de búsqueda</p>
        </div>
      )}
    </div>
  )
}