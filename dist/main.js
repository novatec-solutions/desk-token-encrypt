"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const url = __importStar(require("url"));
const connection_db_1 = require("./connection-db");
let mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../public/index.html'),
        protocol: 'file',
        slashes: true,
    }));
    console.log(document);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
//incrustar en oracle
async function handleButtonClick() {
    console.log('estamos aquí');
    try {
        const inputToken = await (mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.executeJavaScript('document.getElementById("textToken").value'));
        if (inputToken) {
            const connection = await (0, connection_db_1.ConnectionDB)();
            const result = await connection.execute('INSERT INTO TOKENVALIDATOR (TOKEN) VALUES (:imputData)', [inputToken]);
            console.log("Token registrado");
            await connection.close();
        }
        else {
            console.log('El valor del Token se encuentra vacío');
        }
    }
    catch (error) {
        console.log('ERROR');
        console.error('Error el no se pudo realizar el registro', error);
    }
}
//Ciclo de vida
electron_1.app.on('ready', () => {
    createWindow();
});
// si las ventanas estan cerradas se cierra la aplicación
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// si esta minimizado muestra la ventana
electron_1.app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
    else {
        mainWindow.show();
    }
});
global.handleButtonClick = handleButtonClick;
