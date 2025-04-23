const mysql = require('mysql2/promise');
const config = require('./dbconfig');

(async () => {
    try {
        const connection = await mysql.createConnection(config);
        console.log('Conexión exitosa a la base de datos');
        await connection.end();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
})();
