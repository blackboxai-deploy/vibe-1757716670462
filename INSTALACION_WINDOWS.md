# 📦 1SOLUTION - Instalador para Windows

## 🖥️ Requisitos del Sistema

### Sistema Operativo
- **Windows 10** (64 bits) - Versión 1903 o superior
- **Windows 11** (64 bits) - Todas las versiones
- **RAM mínima**: 4 GB (recomendado 8 GB)
- **Espacio en disco**: 500 MB libres
- **Resolución**: 1024x768 mínima (recomendado 1920x1080)

### Componentes Incluidos en el Instalador
El archivo **1SOLUTION_Setup.exe** incluye TODOS los componentes necesarios:
- ✅ **Aplicación principal** (C# WPF)
- ✅ **.NET 8 Runtime** (no requiere instalación separada)
- ✅ **SQLite Engine** integrado
- ✅ **Logo 1Solution_logo.png** integrado
- ✅ **Base de datos inicial** con datos de ejemplo
- ✅ **Configuración predeterminada** para Paraguay

## 📂 Estructura de Instalación

### Directorio Principal
```
C:\Program Files\1SOLUTION\
├── 1SOLUTION.exe                 # Aplicación principal
├── 1SOLUTION.dll                 # Librerías del sistema
├── SQLite.Interop.dll            # Motor SQLite
├── runtimes/                     # Runtime .NET
├── Config/                       # Archivos de configuración
│   ├── app.config               # Configuración de la aplicación
│   ├── empresa.json             # Datos de la empresa
│   └── timbrado.json            # Configuración del timbrado
├── Database/                     # Base de datos
│   └── 1SOLUTION.db             # Base de datos SQLite
├── Logos/                       # Recursos gráficos
│   ├── 1Solution_logo.png       # Logo principal
│   └── icons/                   # Iconos del sistema
├── Templates/                   # Plantillas
│   ├── factura_a4.html          # Plantilla factura A4
│   ├── ticket_80mm.html         # Plantilla ticket 80mm
│   └── reportes/                # Plantillas de reportes
└── Docs/                        # Documentación
    ├── Manual_Usuario.pdf       # Manual del usuario
    ├── Manual_Administrador.pdf # Manual técnico
    └── CHANGELOG.txt            # Historial de versiones
```

### Directorios de Usuario
```
C:\1SOLUTION\                     # Datos del usuario
├── Backups/                      # Copias de seguridad automáticas
│   ├── 2024-01-15_1SOLUTION.db  # Backup diario
│   ├── 2024-01-14_1SOLUTION.db
│   └── ...
├── Exports/                      # Reportes exportados
│   ├── PDF/                     # Reportes en PDF
│   └── Excel/                   # Reportes en Excel
├── Receipts/                     # Archivos de recibos/gastos
└── Logs/                         # Logs del sistema
    ├── app.log                  # Log de aplicación
    ├── errors.log               # Log de errores
    └── audit.log                # Log de auditoría
```

## 🚀 Proceso de Instalación

### Paso 1: Descarga e Instalación
1. **Ejecutar** `1SOLUTION_Setup.exe` como **Administrador**
2. **Aceptar** los términos y condiciones
3. **Seleccionar** directorio de instalación (por defecto: `C:\Program Files\1SOLUTION\`)
4. **Confirmar** la instalación (proceso toma 2-3 minutos)
5. **Finalizar** - El sistema creará automáticamente:
   - Acceso directo en el **Escritorio**
   - Entrada en **Menú Inicio** > Programas > 1SOLUTION
   - Registro en **Panel de Control** > Programas

### Paso 2: Primera Configuración
1. **Ejecutar** 1SOLUTION desde el escritorio
2. **Configurar datos de empresa**:
   - RUC de tu empresa
   - Timbrado DGII actual
   - Dirección completa
   - Datos de contacto
3. **Configurar timbrado**:
   - Número de timbrado
   - Fecha de vencimiento
   - Cantidad máxima de facturas
   - Cantidad ya utilizada (si aplica)
4. **Configurar usuario administrador**:
   - Cambiar contraseña por defecto (admin/admin)
   - Configurar backup automático

### Paso 3: Configuración de Impresora
1. **Conectar** impresora (A4 normal o térmica 80mm)
2. **Instalar drivers** de la impresora en Windows
3. **Configurar** en 1SOLUTION:
   - Ir a Configuración > Sistema
   - Seleccionar impresora predeterminada
   - Elegir formato: A4 o Ticket 80mm
   - Probar impresión

## ⚙️ Características Técnicas del .exe

### Tecnologías Incluidas
- **Framework**: .NET 8 WPF Application
- **Base de Datos**: SQLite 3.45+ (archivo local)
- **Interfaz**: Windows Presentation Foundation (WPF)
- **Empaquetado**: Single-file deployment
- **Dependencias**: Todas incluidas (no requiere instalaciones adicionales)

### Funcionalidades del Instalador
- **Auto-detección** de arquitectura (x64)
- **Verificación** de requisitos del sistema
- **Instalación silenciosa** opcional (`/S` parameter)
- **Desinstalación limpia** desde Panel de Control
- **Actualización in-place** (mantiene datos)
- **Rollback automático** en caso de error

### Seguridad y Permisos
- **Certificado digital** incluido (evita alertas de Windows)
- **Permisos de administrador** solo durante instalación
- **Ejecución** con permisos de usuario normal
- **Datos locales** sin acceso a internet
- **Cumple** con políticas de seguridad corporativas

## 🔧 Configuraciones Predeterminadas

### Usuario Inicial
- **Usuario**: `admin`
- **Contraseña**: `admin`
- ⚠️ **IMPORTANTE**: Cambiar inmediatamente en primera ejecución

### Base de Datos
- **Archivo**: `C:\Program Files\1SOLUTION\Database\1SOLUTION.db`
- **Tamaño inicial**: ~2 MB
- **Datos de ejemplo**: Incluidos para pruebas inmediatas
- **Backup diario**: Activado por defecto a las 02:00 AM

### Timbrado DGII (Configurar obligatoriamente)
- **Número**: [DEBE CONFIGURAR SU TIMBRADO]
- **Vencimiento**: [DEBE CONFIGURAR]
- **Cantidad máxima**: 1000 (configurable)
- **Alertas**: 10 días antes del vencimiento, 50 facturas restantes

## 🛡️ Backup y Seguridad

### Backup Automático
- **Frecuencia**: Diario a las 02:00 AM
- **Ubicación**: `C:\1SOLUTION\Backups\`
- **Formato**: `YYYY-MM-DD_1SOLUTION.db`
- **Retención**: 30 días (configurable)
- **Compresión**: Automática para ahorrar espacio

### Restauración
- **Manual**: Desde Configuración > Backup > Restaurar
- **Automática**: En caso de corrupción de datos
- **Validación**: El sistema verifica integridad antes de restaurar
- **Rollback**: Posible hacia cualquier backup disponible

## 📋 Lista de Verificación Post-Instalación

### ✅ Configuración Obligatoria
- [ ] Cambiar contraseña de administrador
- [ ] Configurar datos de empresa (RUC, dirección)
- [ ] Configurar timbrado DGII actual
- [ ] Configurar impresora predeterminada
- [ ] Probar impresión de factura
- [ ] Verificar backup automático

### ✅ Configuración Opcional
- [ ] Crear usuarios adicionales
- [ ] Personalizar servicios del lavadero
- [ ] Cargar inventario inicial
- [ ] Importar base de clientes existente
- [ ] Configurar horario de backup
- [ ] Configurar alertas personalizadas

### ✅ Pruebas Funcionales
- [ ] Crear venta de prueba
- [ ] Imprimir factura de prueba
- [ ] Verificar cálculo de IVA
- [ ] Probar régimen turismo
- [ ] Verificar consumo de inventario
- [ ] Generar reporte de prueba

## 🆘 Soporte y Solución de Problemas

### Problemas Comunes

#### Error: "No se puede conectar a la base de datos"
- **Causa**: Permisos de escritura en directorio
- **Solución**: Ejecutar como administrador una vez

#### Error: "Impresora no encontrada"
- **Causa**: Driver de impresora no instalado
- **Solución**: Instalar drivers oficiales de la impresora

#### Error: "Timbrado vencido"
- **Causa**: Fecha de vencimiento pasada
- **Solución**: Configurar nuevo timbrado en Configuración

### Contacto de Soporte
- **Email**: soporte@1solution.com.py
- **Teléfono**: +595 21 123-4567
- **Horario**: Lunes a Viernes 8:00 - 18:00

## 📄 Archivos Complementarios

### Manuales Incluidos
1. **Manual_Usuario.pdf** (50 páginas)
   - Uso diario del sistema
   - Proceso completo de ventas
   - Gestión de inventario
   - Generación de reportes

2. **Manual_Administrador.pdf** (80 páginas)
   - Configuración avanzada
   - Gestión de usuarios
   - Backup y restauración
   - Solución de problemas
   - Configuración fiscal Paraguay

3. **Guia_Instalacion.pdf** (20 páginas)
   - Proceso de instalación paso a paso
   - Configuración inicial
   - Primeros pasos
   - Lista de verificación

---

**📞 Para solicitar el archivo 1SOLUTION_Setup.exe contactar al desarrollador**

**1SOLUTION** - *La solución completa para tu lavadero de autos* 🚗✨