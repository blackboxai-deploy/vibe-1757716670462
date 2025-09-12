"use client"

import React from 'react'

interface FacturaPreviewProps {
  tipo: 'A4' | 'ticket'
  logoEmpresa?: string
  logoWidth?: number
  logoHeight?: number
  mostrarLogo?: boolean
  datosEmpresa: {
    nombre: string
    ruc: string
    timbrado: string
    direccion: string
    telefono: string
    email: string
  }
  datosVenta?: {
    numeroFactura: string
    fecha: string
    cliente: string
    cedula: string
    regimenTurismo: boolean
    items: Array<{
      descripcion: string
      cantidad: number
      precio: number
      total: number
    }>
    subtotal: number
    iva: number
    total: number
    metodoPago: string
  }
}

export function FacturaPreview({ 
  tipo, 
  logoEmpresa, 
  logoWidth = 150, 
  logoHeight = 80, 
  mostrarLogo = true,
  datosEmpresa,
  datosVenta = {
    numeroFactura: 'FAC-001239',
    fecha: '15/01/2024 14:30',
    cliente: 'Cliente Ejemplo',
    cedula: '1.234.567',
    regimenTurismo: false,
    items: [
      { descripcion: 'Lavado Full Detail (SUV)', cantidad: 1, precio: 45000, total: 45000 },
      { descripcion: 'Aspirado (SUV)', cantidad: 1, precio: 20000, total: 20000 }
    ],
    subtotal: 65000,
    iva: 6500,
    total: 71500,
    metodoPago: 'Tarjeta'
  }
}: FacturaPreviewProps) {

  if (tipo === 'A4') {
    return (
      <div className="bg-white border border-gray-300 rounded-lg p-8 max-w-2xl mx-auto shadow-lg">
        {/* Header de la factura */}
        <div className="border-b border-gray-300 pb-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              {/* Logo de la empresa */}
              {mostrarLogo && logoEmpresa ? (
                <img
                  src={logoEmpresa}
                  alt="Logo de la empresa"
                  style={{
                    width: `${logoWidth}px`,
                    height: `${logoHeight}px`,
                    objectFit: 'contain'
                  }}
                  className="border border-gray-100 rounded"
                />
              ) : (
                <div 
                  className="bg-gray-100 border border-gray-200 rounded flex items-center justify-center"
                  style={{
                    width: `${logoWidth}px`,
                    height: `${logoHeight}px`
                  }}
                >
                  <span className="text-gray-400 text-sm">Logo Empresa</span>
                </div>
              )}
              
              {/* Datos de la empresa */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{datosEmpresa.nombre}</h1>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>RUC:</strong> {datosEmpresa.ruc}</p>
                  <p><strong>Timbrado DGII:</strong> {datosEmpresa.timbrado}</p>
                  <p><strong>Dirección:</strong> {datosEmpresa.direccion}</p>
                  <p><strong>Teléfono:</strong> {datosEmpresa.telefono}</p>
                  <p><strong>Email:</strong> {datosEmpresa.email}</p>
                </div>
              </div>
            </div>
            
            {/* Información de la factura */}
            <div className="text-right">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-3">
                <h2 className="text-lg font-bold">FACTURA</h2>
              </div>
              <div className="text-sm space-y-1">
                <p><strong>Nº:</strong> {datosVenta.numeroFactura}</p>
                <p><strong>Fecha:</strong> {datosVenta.fecha}</p>
                {datosVenta.regimenTurismo && (
                  <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                    RÉGIMEN TURISMO
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Datos del cliente */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Datos del Cliente</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Nombre:</strong> {datosVenta.cliente}</p>
              <p><strong>C.I.:</strong> {datosVenta.cedula}</p>
            </div>
            <div>
              <p><strong>Método de Pago:</strong> {datosVenta.metodoPago}</p>
              {datosVenta.regimenTurismo && (
                <p><strong>Régimen:</strong> <span className="text-purple-600">Turismo (IVA 0%)</span></p>
              )}
            </div>
          </div>
        </div>

        {/* Detalle de servicios */}
        <div className="mb-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium">Descripción</th>
                <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium">Cant.</th>
                <th className="border border-gray-300 px-4 py-2 text-right text-sm font-medium">Precio Unit.</th>
                <th className="border border-gray-300 px-4 py-2 text-right text-sm font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {datosVenta.items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{item.descripcion}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center text-sm">{item.cantidad}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-sm">
                    Gs. {item.precio.toLocaleString('es-PY')}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right text-sm font-medium">
                    Gs. {item.total.toLocaleString('es-PY')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totales */}
        <div className="flex justify-end">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>Gs. {datosVenta.subtotal.toLocaleString('es-PY')}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA (10%):</span>
              <span>{datosVenta.regimenTurismo ? 'Gs. 0 (Turismo)' : `Gs. ${datosVenta.iva.toLocaleString('es-PY')}`}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2">
              <span>TOTAL:</span>
              <span className="text-green-600">Gs. {datosVenta.total.toLocaleString('es-PY')}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
          <p>Gracias por su preferencia - Servicio no reembolsable</p>
          <p>Garantía por defectos del servicio: 24 horas</p>
        </div>
      </div>
    )
  }

  // Formato Ticket 80mm
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 max-w-sm mx-auto shadow-lg" style={{ width: '320px' }}>
      {/* Header del ticket */}
      <div className="text-center border-b border-gray-300 pb-4 mb-4">
        {/* Logo centrado */}
        {mostrarLogo && logoEmpresa && (
          <div className="mb-3">
            <img
              src={logoEmpresa}
              alt="Logo de la empresa"
              style={{
                width: `${Math.min(logoWidth * 0.8, 120)}px`,
                height: `${Math.min(logoHeight * 0.8, 60)}px`,
                objectFit: 'contain'
              }}
              className="mx-auto border border-gray-100 rounded"
            />
          </div>
        )}
        
        <h1 className="text-lg font-bold text-gray-900">{datosEmpresa.nombre}</h1>
        <div className="text-xs text-gray-600 mt-2 space-y-1">
          <p>RUC: {datosEmpresa.ruc}</p>
          <p>Timbrado: {datosEmpresa.timbrado}</p>
          <p>{datosEmpresa.direccion}</p>
          <p>Tel: {datosEmpresa.telefono}</p>
        </div>
      </div>

      {/* Información de la venta */}
      <div className="text-center mb-4 text-xs">
        <p className="font-bold">FACTURA Nº {datosVenta.numeroFactura}</p>
        <p>{datosVenta.fecha}</p>
        {datosVenta.regimenTurismo && (
          <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium mt-1">
            RÉGIMEN TURISMO
          </div>
        )}
      </div>

      {/* Cliente */}
      <div className="border-b border-gray-300 pb-3 mb-3 text-xs">
        <p><strong>Cliente:</strong> {datosVenta.cliente}</p>
        <p><strong>C.I.:</strong> {datosVenta.cedula}</p>
      </div>

      {/* Items */}
      <div className="space-y-1 text-xs mb-4">
        {datosVenta.items.map((item, index) => (
          <div key={index} className="border-b border-dashed border-gray-200 pb-1">
            <div className="flex justify-between">
              <span className="flex-1">{item.descripcion}</span>
            </div>
            <div className="flex justify-between">
              <span>{item.cantidad} x Gs. {item.precio.toLocaleString('es-PY')}</span>
              <span className="font-medium">Gs. {item.total.toLocaleString('es-PY')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Totales */}
      <div className="border-t border-gray-300 pt-3 text-xs space-y-1">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>Gs. {datosVenta.subtotal.toLocaleString('es-PY')}</span>
        </div>
        <div className="flex justify-between">
          <span>IVA:</span>
          <span>{datosVenta.regimenTurismo ? 'Gs. 0' : `Gs. ${datosVenta.iva.toLocaleString('es-PY')}`}</span>
        </div>
        <div className="flex justify-between text-sm font-bold border-t border-gray-300 pt-1">
          <span>TOTAL:</span>
          <span>Gs. {datosVenta.total.toLocaleString('es-PY')}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span>Pago:</span>
          <span className="font-medium">{datosVenta.metodoPago}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-4 pt-3 border-t border-gray-300 text-xs text-gray-500">
        <p>Gracias por su preferencia</p>
        <p>Garantía: 24 horas</p>
      </div>
    </div>
  )
}