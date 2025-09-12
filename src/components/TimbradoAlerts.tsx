"use client"

import React, { useState, useEffect } from 'react'

interface TimbradoConfig {
  numero: string
  fechaInicio: string
  fechaVencimiento: string
  cantidadMaxima: number
  cantidadUtilizada: number
  activo: boolean
}

const timbradoConfig: TimbradoConfig = {
  numero: 'T-12345678',
  fechaInicio: '2024-01-01',
  fechaVencimiento: '2024-12-31',
  cantidadMaxima: 1000,
  cantidadUtilizada: 234,
  activo: true
}

export function TimbradoAlerts() {
  const [showAlerts, setShowAlerts] = useState(false)
  const [alerts, setAlerts] = useState<string[]>([])

  useEffect(() => {
    checkTimbradoStatus()
  }, [])

  const checkTimbradoStatus = () => {
    const currentDate = new Date()
    const vencimientoDate = new Date(timbradoConfig.fechaVencimiento)
    const diasParaVencimiento = Math.ceil((vencimientoDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
    
    const cantidadRestante = timbradoConfig.cantidadMaxima - timbradoConfig.cantidadUtilizada
    const porcentajeUtilizado = (timbradoConfig.cantidadUtilizada / timbradoConfig.cantidadMaxima) * 100
    
    const newAlerts: string[] = []

    // Alert por fecha de vencimiento
    if (diasParaVencimiento <= 0) {
      newAlerts.push('🚨 CRÍTICO: El timbrado ha VENCIDO. No se pueden emitir más facturas.')
    } else if (diasParaVencimiento <= 10) {
      newAlerts.push(`⚠️ URGENTE: El timbrado vence en ${diasParaVencimiento} días (${timbradoConfig.fechaVencimiento}).`)
    } else if (diasParaVencimiento <= 30) {
      newAlerts.push(`📅 AVISO: El timbrado vence en ${diasParaVencimiento} días. Considere renovarlo pronto.`)
    }

    // Alert por cantidad de facturas
    if (cantidadRestante <= 0) {
      newAlerts.push('🚨 CRÍTICO: Se han agotado todas las facturas del timbrado. Renueve inmediatamente.')
    } else if (cantidadRestante <= 50) {
      newAlerts.push(`⚠️ URGENTE: Solo quedan ${cantidadRestante} facturas disponibles del timbrado.`)
    } else if (porcentajeUtilizado >= 80) {
      newAlerts.push(`📊 AVISO: Se ha utilizado el ${porcentajeUtilizado.toFixed(1)}% del timbrado (${cantidadRestante} facturas restantes).`)
    }

    // Alert si el timbrado está inactivo
    if (!timbradoConfig.activo) {
      newAlerts.push('🔒 ERROR: El timbrado está INACTIVO. Active para poder facturar.')
    }

    setAlerts(newAlerts)
    setShowAlerts(newAlerts.length > 0)
  }

  const dismissAlert = (index: number) => {
    setAlerts(alerts.filter((_, i) => i !== index))
    if (alerts.length === 1) {
      setShowAlerts(false)
    }
  }

  const getAlertStyle = (alert: string) => {
    if (alert.includes('CRÍTICO') || alert.includes('ERROR')) {
      return 'bg-red-100 border-red-500 text-red-800'
    } else if (alert.includes('URGENTE')) {
      return 'bg-orange-100 border-orange-500 text-orange-800'
    } else {
      return 'bg-yellow-100 border-yellow-500 text-yellow-800'
    }
  }

  const getAlertIcon = (alert: string) => {
    if (alert.includes('CRÍTICO') || alert.includes('ERROR')) {
      return '🚨'
    } else if (alert.includes('URGENTE')) {
      return '⚠️'
    } else {
      return '📅'
    }
  }

  if (!showAlerts) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`mb-2 p-4 border-l-4 rounded-lg shadow-lg ${getAlertStyle(alert)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2">
              <span className="text-lg">{getAlertIcon(alert)}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Control de Timbrado DGII
                </p>
                <p className="text-sm mt-1">{alert}</p>
                
                {/* Información adicional del timbrado */}
                <div className="mt-3 text-xs opacity-75">
                  <p><strong>Timbrado:</strong> {timbradoConfig.numero}</p>
                  <p><strong>Facturas:</strong> {timbradoConfig.cantidadUtilizada}/{timbradoConfig.cantidadMaxima}</p>
                  <p><strong>Vencimiento:</strong> {timbradoConfig.fechaVencimiento}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => dismissAlert(index)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      ))}
      
      {/* Botón para ir a configuración */}
      <div className="mt-2">
        <button
          onClick={() => {
            window.location.href = '/configuracion'
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Ir a Configuración de Timbrado
        </button>
      </div>
    </div>
  )
}

// Componente para mostrar el estado actual del timbrado en el dashboard
export function TimbradoStatus() {
  const currentDate = new Date()
  const vencimientoDate = new Date(timbradoConfig.fechaVencimiento)
  const diasParaVencimiento = Math.ceil((vencimientoDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
  
  const cantidadRestante = timbradoConfig.cantidadMaxima - timbradoConfig.cantidadUtilizada
  const porcentajeUtilizado = (timbradoConfig.cantidadUtilizada / timbradoConfig.cantidadMaxima) * 100

  const getStatusColor = () => {
    if (diasParaVencimiento <= 0 || cantidadRestante <= 0 || !timbradoConfig.activo) {
      return 'bg-red-50 border-red-200 text-red-800'
    } else if (diasParaVencimiento <= 10 || cantidadRestante <= 50) {
      return 'bg-orange-50 border-orange-200 text-orange-800'
    } else if (diasParaVencimiento <= 30 || porcentajeUtilizado >= 80) {
      return 'bg-yellow-50 border-yellow-200 text-yellow-800'
    } else {
      return 'bg-green-50 border-green-200 text-green-800'
    }
  }

  const getStatusIcon = () => {
    if (diasParaVencimiento <= 0 || cantidadRestante <= 0 || !timbradoConfig.activo) {
      return '🚨'
    } else if (diasParaVencimiento <= 10 || cantidadRestante <= 50) {
      return '⚠️'
    } else if (diasParaVencimiento <= 30 || porcentajeUtilizado >= 80) {
      return '📅'
    } else {
      return '✅'
    }
  }

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor()}`}>
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">{getStatusIcon()}</span>
        <h3 className="font-semibold">Estado Timbrado DGII</h3>
      </div>
      
      <div className="space-y-1 text-sm">
        <p><strong>Número:</strong> {timbradoConfig.numero}</p>
        <p><strong>Vence en:</strong> {diasParaVencimiento} días ({timbradoConfig.fechaVencimiento})</p>
        <p>
          <strong>Facturas:</strong> {timbradoConfig.cantidadUtilizada}/{timbradoConfig.cantidadMaxima} 
          <span className="ml-1">({cantidadRestante} restantes)</span>
        </p>
        
        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              porcentajeUtilizado >= 90 ? 'bg-red-500' :
              porcentajeUtilizado >= 80 ? 'bg-orange-500' :
              'bg-green-500'
            }`}
            style={{ width: `${porcentajeUtilizado}%` }}
          ></div>
        </div>
        <p className="text-xs">{porcentajeUtilizado.toFixed(1)}% utilizado</p>
      </div>
    </div>
  )
}