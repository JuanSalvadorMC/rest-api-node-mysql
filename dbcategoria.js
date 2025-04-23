const config = require('./dbconfig'); // Instanciamos el archivo dbconfig
const mysql = require('mysql2/promise'); // Cambiado de mssql a mysql2

// Función Async: Asíncrona que devuelve un objeto

async function getCategoria() {
    try {
        const connection = await mysql.createConnection(config);
        const [categorias] = await connection.execute("SELECT * FROM TM_CATEGORIA");
        await connection.end();
        return categorias;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw error;
    }
}

async function getCategoria_x_id(cat_id) {
    try {
        const connection = await mysql.createConnection(config);
        const [product] = await connection.execute(
            "SELECT * FROM TM_CATEGORIA WHERE CAT_ID = ?", 
            [cat_id]
        );
        await connection.end();
        return product;
    } catch (error) {
        console.error('Error al obtener categoría por ID:', error);
        throw error;
    }
}

module.exports = {
    getCategoria,
    getCategoria_x_id
};