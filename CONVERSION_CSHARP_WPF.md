# 🔄 Guía de Conversión a C# WPF

## 📋 Resumen de Conversión

Esta guía detalla cómo convertir el sistema web **1SOLUTION** a una aplicación nativa de Windows usando **C# WPF** con **.NET 8**.

### 🎯 Objetivos de la Conversión
- **Aplicación Nativa**: Windows 10/11 executable (.exe)
- **Base de Datos Real**: SQLite con archivo .db físico
- **100% Offline**: Sin dependencias de internet
- **Instalador Completo**: Setup.exe con todos los componentes
- **Rendimiento Óptimo**: Aplicación compilada nativa

## 🏗️ Arquitectura C# WPF

### Estructura del Proyecto
```
1SOLUTION/
├── 1SOLUTION.csproj              # Proyecto principal WPF
├── App.xaml / App.xaml.cs        # Aplicación principal
├── MainWindow.xaml               # Ventana principal
├── Views/                        # Vistas XAML
│   ├── Dashboard/
│   │   └── DashboardView.xaml
│   ├── Ventas/
│   │   ├── VentasView.xaml
│   │   └── VentaHistorialView.xaml
│   ├── Servicios/
│   │   └── ServiciosView.xaml
│   ├── Inventario/
│   │   └── InventarioView.xaml
│   ├── Clientes/
│   │   └── ClientesView.xaml
│   ├── Gastos/
│   │   └── GastosView.xaml
│   ├── Reportes/
│   │   └── ReportesView.xaml
│   └── Configuracion/
│       └── ConfiguracionView.xaml
├── ViewModels/                   # MVVM ViewModels
│   ├── DashboardViewModel.cs
│   ├── VentasViewModel.cs
│   ├── ServiciosViewModel.cs
│   ├── InventarioViewModel.cs
│   ├── ClientesViewModel.cs
│   ├── GastosViewModel.cs
│   ├── ReportesViewModel.cs
│   └── ConfiguracionViewModel.cs
├── Models/                       # Modelos de datos
│   ├── Venta.cs
│   ├── Servicio.cs
│   ├── Producto.cs
│   ├── Cliente.cs
│   ├── Gasto.cs
│   ├── MovimientoInventario.cs
│   └── ConfiguracionEmpresa.cs
├── Services/                     # Servicios de datos
│   ├── DatabaseService.cs       # Servicio SQLite
│   ├── VentasService.cs
│   ├── InventarioService.cs
│   ├── ClientesService.cs
│   ├── GastosService.cs
│   ├── ReportesService.cs
│   ├── TimbradoService.cs        # Control de timbrado
│   └── BackupService.cs          # Sistema de backup
├── Controls/                     # Controles personalizados
│   ├── SearchComboBox.xaml       # Búsqueda inteligente
│   ├── VehicleSelector.xaml      # Selector de vehículos
│   ├── PaymentMethodSelector.xaml
│   └── TimbradoStatusControl.xaml
├── Helpers/                      # Utilidades
│   ├── PrintHelper.cs            # Impresión de facturas
│   ├── ExportHelper.cs           # Exportación PDF/Excel
│   ├── ValidationHelper.cs       # Validaciones paraguayas
│   └── AlertManager.cs           # Sistema de alertas
├── Resources/                    # Recursos
│   ├── Images/
│   │   └── 1Solution_logo.png
│   ├── Templates/
│   │   ├── FacturaA4.xaml
│   │   └── Ticket80mm.xaml
│   └── Styles/
│       └── VSGStyle.xaml         # Estilos VSG-like
└── Database/
    ├── DatabaseInitializer.cs    # Inicialización BD
    ├── Migrations/               # Migraciones
    └── Scripts/
        └── InitialData.sql       # Datos iniciales
```

## 🗄️ Esquema de Base de Datos SQLite

### Tablas Principales

```sql
-- Configuración de la empresa
CREATE TABLE ConfiguracionEmpresa (
    Id INTEGER PRIMARY KEY,
    Nombre TEXT NOT NULL,
    Ruc TEXT NOT NULL,
    Direccion TEXT NOT NULL,
    Telefono TEXT,
    Email TEXT,
    Logo BLOB,
    FechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Control de timbrado DGII
CREATE TABLE Timbrado (
    Id INTEGER PRIMARY KEY,
    Numero TEXT NOT NULL,
    FechaInicio DATE NOT NULL,
    FechaVencimiento DATE NOT NULL,
    CantidadMaxima INTEGER NOT NULL,
    CantidadUtilizada INTEGER DEFAULT 0,
    Activo BOOLEAN DEFAULT 1,
    AlertaDias INTEGER DEFAULT 10,
    AlertaCantidad INTEGER DEFAULT 50,
    FechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Clientes
CREATE TABLE Clientes (
    Id INTEGER PRIMARY KEY,
    Nombre TEXT NOT NULL,
    Cedula TEXT UNIQUE NOT NULL,
    Telefono TEXT,
    Email TEXT,
    Direccion TEXT,
    RegimenTurismo BOOLEAN DEFAULT 0,
    Activo BOOLEAN DEFAULT 1,
    FechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Servicios
CREATE TABLE Servicios (
    Id INTEGER PRIMARY KEY,
    Nombre TEXT NOT NULL,
    Descripcion TEXT,
    PrecioAuto DECIMAL(10,2) NOT NULL,
    PrecioSUV DECIMAL(10,2) NOT NULL,
    PrecioCamioneta DECIMAL(10,2) NOT NULL,
    PrecioMoto DECIMAL(10,2) NOT NULL,
    PrecioFurgoneta DECIMAL(10,2) NOT NULL,
    DuracionMinutos INTEGER DEFAULT 30,
    Activo BOOLEAN DEFAULT 1,
    FechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Productos de inventario
CREATE TABLE Productos (
    Id INTEGER PRIMARY KEY,
    Nombre TEXT NOT NULL,
    Categoria TEXT NOT NULL,
    StockActual DECIMAL(10,3) NOT NULL,
    StockMinimo DECIMAL(10,3) NOT NULL,
    StockMaximo DECIMAL(10,3) NOT NULL,
    Unidad TEXT NOT NULL,
    CostoPorUnidad DECIMAL(10,2) NOT NULL,
    PrecioVenta DECIMAL(10,2) NOT NULL,
    Proveedor TEXT,
    Ubicacion TEXT,
    FechaVencimiento DATE,
    Lote TEXT,
    Activo BOOLEAN DEFAULT 1,
    FechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Consumo de productos por servicios
CREATE TABLE ServicioConsumos (
    Id INTEGER PRIMARY KEY,
    ServicioId INTEGER REFERENCES Servicios(Id),
    ProductoId INTEGER REFERENCES Productos(Id),
    Cantidad DECIMAL(10,3) NOT NULL,
    FechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Ventas
CREATE TABLE Ventas (
    Id INTEGER PRIMARY KEY,
    NumeroFactura TEXT UNIQUE NOT NULL,
    ClienteId INTEGER REFERENCES Clientes(Id),
    TipoVehiculo TEXT NOT NULL,
    Subtotal DECIMAL(10,2) NOT NULL,
    Iva DECIMAL(10,2) NOT NULL,
    Total DECIMAL(10,2) NOT NULL,
    FormaPago TEXT NOT NULL,
    RegimenTurismo BOOLEAN DEFAULT 0,
    Estado TEXT DEFAULT 'Completado',
    Usuario TEXT NOT NULL,
    FechaVenta DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Detalle de ventas
CREATE TABLE VentaDetalles (
    Id INTEGER PRIMARY KEY,
    VentaId INTEGER REFERENCES Ventas(Id),
    Tipo TEXT NOT NULL, -- 'servicio' o 'producto'
    ItemId INTEGER NOT NULL, -- ServicioId o ProductoId
    Nombre TEXT NOT NULL,
    Cantidad INTEGER NOT NULL,
    PrecioUnitario DECIMAL(10,2) NOT NULL,
    Total DECIMAL(10,2) NOT NULL
);

-- Gastos
CREATE TABLE Gastos (
    Id INTEGER PRIMARY KEY,
    Fecha DATE NOT NULL,
    Concepto TEXT NOT NULL,
    Categoria TEXT NOT NULL,
    Monto DECIMAL(10,2) NOT NULL,
    FormaPago TEXT NOT NULL,
    Proveedor TEXT,
    NumeroRecibo TEXT,
    ArchivoRecibo BLOB,
    Observaciones TEXT,
    Usuario TEXT NOT NULL,
    FechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Movimientos de inventario
CREATE TABLE MovimientosInventario (
    Id INTEGER PRIMARY KEY,
    ProductoId INTEGER REFERENCES Productos(Id),
    TipoMovimiento TEXT NOT NULL, -- 'entrada', 'salida', 'ajuste'
    CantidadAnterior DECIMAL(10,3) NOT NULL,
    Cantidad DECIMAL(10,3) NOT NULL,
    CantidadNueva DECIMAL(10,3) NOT NULL,
    Motivo TEXT NOT NULL,
    Costo DECIMAL(10,2),
    VentaId INTEGER REFERENCES Ventas(Id),
    Usuario TEXT NOT NULL,
    Observaciones TEXT,
    FechaMovimiento DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sistema de usuarios
CREATE TABLE Usuarios (
    Id INTEGER PRIMARY KEY,
    Username TEXT UNIQUE NOT NULL,
    PasswordHash TEXT NOT NULL,
    Nombre TEXT NOT NULL,
    Email TEXT,
    Rol TEXT DEFAULT 'admin',
    Activo BOOLEAN DEFAULT 1,
    UltimoAcceso DATETIME,
    FechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Log de sistema
CREATE TABLE LogSistema (
    Id INTEGER PRIMARY KEY,
    Nivel TEXT NOT NULL, -- 'INFO', 'WARNING', 'ERROR'
    Mensaje TEXT NOT NULL,
    Usuario TEXT,
    Modulo TEXT,
    DetalleError TEXT,
    FechaLog DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 Implementación de Interfaz VSG-like

### Colores y Estilos (Resources/Styles/VSGStyle.xaml)
```xml
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    
    <!-- Colores VSG -->
    <SolidColorBrush x:Key="PrimaryBlue" Color="#2563EB"/>
    <SolidColorBrush x:Key="LightBlue" Color="#DBEAFE"/>
    <SolidColorBrush x:Key="DarkBlue" Color="#1E40AF"/>
    <SolidColorBrush x:Key="GrayBackground" Color="#F9FAFB"/>
    <SolidColorBrush x:Key="WhiteCard" Color="#FFFFFF"/>
    <SolidColorBrush x:Key="BorderGray" Color="#E5E7EB"/>
    
    <!-- Estilos de botones VSG-like -->
    <Style x:Key="PrimaryButton" TargetType="Button">
        <Setter Property="Background" Value="{StaticResource PrimaryBlue}"/>
        <Setter Property="Foreground" Value="White"/>
        <Setter Property="Padding" Value="16,8"/>
        <Setter Property="BorderThickness" Value="0"/>
        <Setter Property="FontWeight" Value="SemiBold"/>
        <Setter Property="Template">
            <Setter.Value>
                <ControlTemplate TargetType="Button">
                    <Border Background="{TemplateBinding Background}" 
                            CornerRadius="6">
                        <ContentPresenter HorizontalAlignment="Center" 
                                        VerticalAlignment="Center"/>
                    </Border>
                </ControlTemplate>
            </Setter.Value>
        </Setter>
    </Style>
    
    <!-- Estilos de cards -->
    <Style x:Key="VSGCard" TargetType="Border">
        <Setter Property="Background" Value="{StaticResource WhiteCard}"/>
        <Setter Property="BorderBrush" Value="{StaticResource BorderGray}"/>
        <Setter Property="BorderThickness" Value="1"/>
        <Setter Property="CornerRadius" Value="8"/>
        <Setter Property="Padding" Value="16"/>
    </Style>
</ResourceDictionary>
```

### Ventana Principal (MainWindow.xaml)
```xml
<Window x:Class="OneSolution.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="1SOLUTION - Sistema Punto de Venta Lavadero" 
        Height="768" Width="1366" 
        WindowState="Maximized"
        Background="{StaticResource GrayBackground}">
    
    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="250"/>
            <ColumnDefinition Width="*"/>
        </Grid.ColumnDefinitions>
        
        <!-- Sidebar -->
        <Border Grid.Column="0" Background="White" 
                BorderBrush="{StaticResource BorderGray}" 
                BorderThickness="0,0,1,0">
            <StackPanel>
                <!-- Logo y título -->
                <Border Padding="20" BorderBrush="{StaticResource BorderGray}" 
                        BorderThickness="0,0,0,1">
                    <StackPanel Orientation="Horizontal">
                        <Image Source="/Resources/Images/1Solution_logo.png" 
                               Width="40" Height="40" Margin="0,0,10,0"/>
                        <StackPanel>
                            <TextBlock Text="1SOLUTION" FontWeight="Bold" FontSize="16"/>
                            <TextBlock Text="Sistema Lavadero" FontSize="10" 
                                     Foreground="#6B7280"/>
                        </StackPanel>
                    </StackPanel>
                </Border>
                
                <!-- Menú de navegación -->
                <ItemsControl x:Name="NavigationMenu" Margin="10">
                    <!-- Items del menú se cargarán dinámicamente -->
                </ItemsControl>
            </StackPanel>
        </Border>
        
        <!-- Contenido principal -->
        <Grid Grid.Column="1">
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="*"/>
            </Grid.RowDefinitions>
            
            <!-- Header -->
            <Border Grid.Row="0" Background="White" 
                    BorderBrush="{StaticResource BorderGray}" 
                    BorderThickness="0,0,0,1" Padding="20,15">
                <Grid>
                    <Grid.ColumnDefinitions>
                        <ColumnDefinition Width="*"/>
                        <ColumnDefinition Width="Auto"/>
                    </Grid.ColumnDefinitions>
                    
                    <StackPanel Grid.Column="0">
                        <TextBlock x:Name="PageTitle" FontSize="24" FontWeight="Bold"/>
                        <TextBlock x:Name="PageDescription" Foreground="#6B7280"/>
                    </StackPanel>
                    
                    <StackPanel Grid.Column="1" Orientation="Horizontal">
                        <TextBlock x:Name="CurrentTime" FontSize="20" FontFamily="Consolas" 
                                 Foreground="{StaticResource PrimaryBlue}" Margin="0,0,20,0"/>
                        <StackPanel>
                            <TextBlock x:Name="CurrentDate" FontSize="12" Foreground="#6B7280"/>
                            <TextBlock Text="Admin" FontSize="10" Foreground="#6B7280"/>
                        </StackPanel>
                    </StackPanel>
                </Grid>
            </Border>
            
            <!-- Contenido dinámico -->
            <ContentControl x:Name="MainContent" Grid.Row="1" Margin="20"/>
        </Grid>
        
        <!-- Alertas de timbrado flotantes -->
        <Canvas x:Name="AlertsCanvas" Grid.ColumnSpan="2" 
                HorizontalAlignment="Right" VerticalAlignment="Top" 
                Margin="20" Panel.ZIndex="1000"/>
    </Grid>
</Window>
```

## 🔧 Servicios Principales

### DatabaseService.cs - Gestión de SQLite
```csharp
using Microsoft.Data.Sqlite;
using System.Data;

public class DatabaseService
{
    private readonly string _connectionString;
    
    public DatabaseService()
    {
        var dbPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Database", "1SOLUTION.db");
        _connectionString = $"Data Source={dbPath}";
        InitializeDatabase();
    }
    
    private void InitializeDatabase()
    {
        using var connection = new SqliteConnection(_connectionString);
        connection.Open();
        
        // Crear tablas si no existen
        var createTablesScript = File.ReadAllText("Database/Scripts/InitialData.sql");
        using var command = new SqliteCommand(createTablesScript, connection);
        command.ExecuteNonQuery();
    }
    
    public async Task<List<T>> QueryAsync<T>(string sql, object parameters = null)
    {
        // Implementación de consultas con Dapper
    }
    
    public async Task<int> ExecuteAsync(string sql, object parameters = null)
    {
        // Implementación de comandos con Dapper
    }
}
```

### TimbradoService.cs - Control de Timbrado
```csharp
public class TimbradoService
{
    private readonly DatabaseService _db;
    
    public async Task<List<string>> VerificarAlertas()
    {
        var timbrado = await ObtenerTimbradoActivo();
        var alertas = new List<string>();
        
        // Verificar fecha de vencimiento
        var diasParaVencer = (timbrado.FechaVencimiento - DateTime.Now).Days;
        if (diasParaVencer <= 0)
        {
            alertas.Add("🚨 CRÍTICO: El timbrado ha VENCIDO. No se pueden emitir más facturas.");
        }
        else if (diasParaVencer <= timbrado.AlertaDias)
        {
            alertas.Add($"⚠️ URGENTE: El timbrado vence en {diasParaVencer} días.");
        }
        
        // Verificar cantidad de facturas
        var facturasRestantes = timbrado.CantidadMaxima - timbrado.CantidadUtilizada;
        if (facturasRestantes <= 0)
        {
            alertas.Add("🚨 CRÍTICO: Se han agotado todas las facturas del timbrado.");
        }
        else if (facturasRestantes <= timbrado.AlertaCantidad)
        {
            alertas.Add($"⚠️ URGENTE: Solo quedan {facturasRestantes} facturas disponibles.");
        }
        
        return alertas;
    }
    
    public async Task IncrementarContadorFacturas()
    {
        var sql = "UPDATE Timbrado SET CantidadUtilizada = CantidadUtilizada + 1 WHERE Activo = 1";
        await _db.ExecuteAsync(sql);
    }
}
```

### PrintHelper.cs - Impresión de Facturas
```csharp
public class PrintHelper
{
    public async Task ImprimirFactura(Venta venta, string formato = "A4")
    {
        if (formato == "A4")
        {
            await ImprimirFacturaA4(venta);
        }
        else
        {
            await ImprimirTicket80mm(venta);
        }
    }
    
    private async Task ImprimirFacturaA4(Venta venta)
    {
        // Generar PDF con datos de la empresa, timbrado y venta
        var pdf = new PdfDocument();
        // Implementación completa con logo, RUC, timbrado, etc.
    }
    
    private async Task ImprimirTicket80mm(Venta venta)
    {
        // Enviar comandos ESC/POS a impresora térmica
        var printer = new ThermalPrinter();
        // Implementación para ticket de 80mm
    }
}
```

## 🚀 Instalador y Distribución

### Proyecto de Setup (1SOLUTION_Setup)
```xml
<!-- 1SOLUTION_Setup.wixproj -->
<Project Sdk="WiX.SDK/4.0.0">
  <PropertyGroup>
    <OutputType>Package</OutputType>
    <TargetFramework>net8.0-windows</TargetFramework>
  </PropertyGroup>
  
  <ItemGroup>
    <PackageReference Include="WiX" Version="4.0.0" />
  </ItemGroup>
  
  <ItemGroup>
    <Content Include="1SOLUTION.exe" />
    <Content Include="Database\1SOLUTION.db" />
    <Content Include="Resources\**" />
  </ItemGroup>
</Project>
```

### Features del Instalador
- **Instalación en** `C:\Program Files\1SOLUTION\`
- **Creación de directorios** de usuario en `C:\1SOLUTION\`
- **Accesos directos** en Escritorio y Menú Inicio
- **Registro en** Panel de Control para desinstalación
- **Verificación** de .NET 8 Runtime (incluido si no existe)
- **Configuración inicial** automática

## ⚙️ Funcionalidades Críticas

### Sistema de Alertas en Tiempo Real
```csharp
public class AlertManager
{
    private Timer _alertTimer;
    
    public void IniciarMonitoreo()
    {
        _alertTimer = new Timer(VerificarAlertas, null, TimeSpan.Zero, TimeSpan.FromMinutes(5));
    }
    
    private async void VerificarAlertas(object state)
    {
        var alertasTimbrado = await _timbradoService.VerificarAlertas();
        var alertasInventario = await _inventarioService.VerificarStockBajo();
        
        MostrarAlertas(alertasTimbrado.Concat(alertasInventario).ToList());
    }
    
    private void MostrarAlertas(List<string> alertas)
    {
        Application.Current.Dispatcher.Invoke(() =>
        {
            // Mostrar alertas flotantes en la UI
        });
    }
}
```

### Backup Automático
```csharp
public class BackupService
{
    public async Task ConfigurarBackupAutomatico(TimeSpan horario)
    {
        var timer = new Timer(RealizarBackup, null, 
            DateTime.Today.Add(horario) - DateTime.Now, 
            TimeSpan.FromDays(1));
    }
    
    private async void RealizarBackup(object state)
    {
        var fechaBackup = DateTime.Now.ToString("yyyy-MM-dd");
        var rutaBackup = $@"C:\1SOLUTION\Backups\{fechaBackup}_1SOLUTION.db";
        var rutaOriginal = $@"C:\Program Files\1SOLUTION\Database\1SOLUTION.db";
        
        File.Copy(rutaOriginal, rutaBackup, true);
        
        // Limpiar backups antiguos según configuración
        await LimpiarBackupsAntiguos();
    }
}
```

## 📦 Empaquetado y Distribución

### Comandos de Build
```bash
# Compilar aplicación
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true

# Crear instalador
dotnet build 1SOLUTION_Setup.wixproj -c Release

# Resultado final
1SOLUTION_Setup.exe  # ~50-80 MB (incluye .NET Runtime)
```

### Estructura del Instalador
- **Tamaño**: 50-80 MB (incluye .NET 8 Runtime)
- **Detección**: Automática de arquitectura x64
- **Silencioso**: Parámetro `/S` para instalación automática
- **Logs**: Instalación registrada en Windows Event Log
- **Rollback**: Automático en caso de error

## 🔍 Testing y Validación

### Tests Unitarios
```csharp
[TestClass]
public class TimbradoServiceTests
{
    [TestMethod]
    public async Task VerificarAlertas_TimbradoVencido_DebeRetornarAlertaCritica()
    {
        // Arrange
        var timbrado = new Timbrado 
        { 
            FechaVencimiento = DateTime.Now.AddDays(-1) 
        };
        
        // Act
        var alertas = await _service.VerificarAlertas();
        
        // Assert
        Assert.IsTrue(alertas.Any(a => a.Contains("CRÍTICO")));
    }
}
```

### Tests de Integración
- Verificación de impresión en impresoras reales
- Tests de backup y restauración
- Validación de facturación paraguaya
- Tests de rendimiento con datos masivos

## 📋 Lista de Archivos para Entregar

### Código Fuente
- [ ] **1SOLUTION.sln** - Solución completa de Visual Studio
- [ ] **Código C# WPF** - Todos los archivos fuente
- [ ] **Base de datos** - 1SOLUTION.db inicial con datos de ejemplo
- [ ] **Recursos** - Imágenes, iconos, plantillas

### Instalador
- [ ] **1SOLUTION_Setup.exe** - Instalador completo para Windows
- [ ] **1SOLUTION_Setup.msi** - Alternativa MSI
- [ ] **Certificado digital** - Para evitar alertas de Windows

### Documentación
- [ ] **Manual_Usuario.pdf** - Guía completa para usuarios finales
- [ ] **Manual_Administrador.pdf** - Guía técnica para administradores
- [ ] **Guia_Instalacion.pdf** - Proceso de instalación paso a paso
- [ ] **CHANGELOG.txt** - Historial de versiones

### Licencias y Legales
- [ ] **LICENCIA.txt** - Términos de uso del software
- [ ] **TERMINOS.txt** - Términos y condiciones
- [ ] **README_INSTALACION.txt** - Instrucciones básicas

---

Esta conversión mantendrá **exactamente** la misma funcionalidad y apariencia del sistema web, pero como aplicación nativa de Windows con todas las ventajas de rendimiento, offline y integración con el sistema operativo.

**Tiempo estimado de conversión**: 2-3 semanas de desarrollo + testing