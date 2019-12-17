// Módulos para controlar la vida de la aplicación y crear una ventana de navegador nativa
const {app, BrowserWindow} = require('electron')
const path = require('path')

// Mantenga una referencia global del objeto de la ventana, si no lo hace, la ventana
// se cerrará automáticamente cuando el objeto JavaScript se recolecte basura.
let mainWindow

function createWindow () {
  // Crea la ventana del navegador.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // y cargue el index.html de la app.
  mainWindow.loadFile('dist/index.html')

  // Abre las DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitido cuando la ventana está cerrada.
  mainWindow.on('closed', function () {
    // Desreferenciar el objeto de la ventana, generalmente almacenaría ventanas
    // en una matriz si su aplicación admite ventanas múltiples, este es el momento
    // cuando debería eliminar el elemento correspondiente.
    mainWindow = null
  })
}

// Este método se llamará cuando Electron haya terminado
// inicialización y está listo para crear ventanas de navegador.
// Algunas API solo se pueden usar después de que ocurra este evento.
app.on('ready', createWindow)

// Salga cuando todas las ventanas estén cerradas.
app.on('window-all-closed', function () {
  // En macOS es común para las aplicaciones y su barra de menú.
  // permanecer activo hasta que el usuario se cierre explícitamente con Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // En macOS es común volver a crear una ventana en la aplicación cuando
  // se hace clic en el icono de la base y no hay otras ventanas abiertas.
  if (mainWindow === null) createWindow()
})

// En este archivo puede incluir el resto del proceso principal específico de su aplicación
// código. También puede ponerlos en archivos separados y solicitarlos aquí.
