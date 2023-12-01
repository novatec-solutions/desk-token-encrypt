"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionDB = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
async function ConnectionDB() {
    console.log('Conectado a la base de datos');
    try {
        const connection = await oracledb_1.default.getConnection({
            user: 'UserMSCCCP',
            password: 'C0l0m6i4_2o2E',
            connectString: 'lnxdbqahw.comcel.com.co:1580/DBCUSCLAROPAYQA'
        });
        return connection;
    }
    catch (error) {
        console.error("Error al conectar con Oracle", error);
        throw error;
    }
}
exports.ConnectionDB = ConnectionDB;
