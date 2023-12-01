const { app, BrowserWindow, ipcMain} = require('electron');
const electron = require('electron');
const url = require('url');
const path = require('path');
const {ConnectionDB} = require('./connection-db');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        frame: true,
        webPreferences:{
            webSecurity: true,
            plugins: true,
            nodeIntegration: true,
            nativeWindowOpen: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, '../public/index.html'),
            protocol: 'file',
            slashes: true,
        })      
    );

    mainWindow.on('closed', () =>{
        mainWindow = null;
    });



    ipcMain.on('handle-button-click', async (event, inputToken) => {
        // console.log('Evento recibido en el proceso principal', inputToken);
        // const success = true;
        // const message = '¡Acción realizada con éxito';
        // mainWindow.webContents.send('hadle-button-click-result', {success, message});
        try{
            if(inputToken){
                const connection = await ConnectionDB();

                const result = await connection.execute(
                    'INSERT INTO CPAYSETTINGS (CREATIONDATE, KEY) VALUES (SYSDATE, :imputData)',
                    [inputToken], {autoCommit: true}
                );
                
                event.sender.send('handle-button-click-result', {success: true, message: 'Valor Registrado'});
                console.log("Token registrado");
                event.sender.send('clear-input');

                await connection.close();
            }else {
                event.sender.send('handle-button-click-result',  {success: false, message: ' El valor del Token se encuentra vacío'});
                console.log('El valor del Token se encuentra vacío');
            }
        } catch (error) {
            console.error('Error el no se pudo realizar el registro', error);    
        }
    })
}

//Ciclo de vida
app.on('ready', ()=>{
    createWindow()
    
    
});
// si las ventanas estan cerradas se cierra la aplicación
app.on('window-all-closed', () => {
    if( process.platform !== 'darwin')  {
        app.quit();
    }
});
// si esta minimizado muestra la ventana
app.on('activate', () => {
    if(mainWindow === null){
        createWindow();
    }else{
        mainWindow.show();
    }
});