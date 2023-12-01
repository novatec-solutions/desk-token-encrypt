const oracledb = require('oracledb');
require('dotenv').config();

async function ConnectionDB() {
    console.log('Conectado a la base de datos');
    try {
        const connection = await oracledb.getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECTSTRING
        });
        
        return connection;
    } catch (error) {
        console.error("Error al conectar con Oracle", error);
        throw error;
        
    }
    
}

module.exports= {ConnectionDB}