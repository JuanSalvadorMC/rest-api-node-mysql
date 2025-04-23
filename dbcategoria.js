const config = require('./dbconfig'); // Instanciamos el archivo dbconfig
const mysql = require('mysql2/promise'); // Cambiado de mssql a mysql2

// Función Async: Asíncrona que devuelve un objeto

async function getCategoria() {
    try {
        const connection = await mysql.createConnection(config);
        // Llamar al procedimiento almacenado para listar categorías
        const [categorias] = await connection.execute('CALL SP_L_CATEGORIA_01()');
        await connection.end();
        // El resultado de un CALL en MySQL es un array de arrays
        return categorias[0];
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        throw error;
    }
}

async function getCategoria_x_id(cat_id) {
    try {
        const connection = await mysql.createConnection(config);
        // Llamar al procedimiento almacenado para obtener por ID
        const [result] = await connection.execute(
            'CALL SP_CATEGORIA_X_ID(?)',
            [cat_id]
        );
        await connection.end();
        // El resultado de un CALL en MySQL es un array de arrays
        return result[0];
    } catch (error) {
        console.error('Error al obtener categoría por ID:', error);
        throw error;
    }
}
async function insertCategoria(categoria) {
    try {
        // Validar y convertir undefined a null
        const cat_nom = categoria.cat_nom !== undefined ? categoria.cat_nom : null;
        const cat_obs = categoria.cat_obs !== undefined ? categoria.cat_obs : null;
        if (cat_nom === null) {
            throw new Error('El campo cat_nom es obligatorio');
        }
        const connection = await mysql.createConnection(config);
        const [result] = await connection.execute(
            'CALL SP_I_CATEGORIA_01(?, ?)', 
            [cat_nom, cat_obs]
        );
        await connection.end();
        return result[0];
    } catch (error) {
        console.error('Error al insertar categoría:', error.message);
        throw error;
    }
}

async function updateCategoria(categoria) {
    try {
        // Validar y convertir undefined a null
        const cat_id = categoria.cat_id !== undefined ? categoria.cat_id : null;
        const cat_nom = categoria.cat_nom !== undefined ? categoria.cat_nom : null;
        const cat_obs = categoria.cat_obs !== undefined ? categoria.cat_obs : null;
        if (cat_id === null || cat_nom === null) {
            throw new Error('Los campos cat_id y cat_nom son obligatorios');
        }
        const connection = await mysql.createConnection(config);
        // Llamar al procedimiento almacenado en MySQL
        const [result] = await connection.execute(
            'CALL SP_U_CATEGORIA_01(?, ?, ?)',
            [cat_id, cat_nom, cat_obs]
        );
        await connection.end();
        // El resultado de un CALL en MySQL es un array de arrays
        return result[0];
    } catch (error) {
        console.error('Error al actualizar categoría:', error.message);
        throw error;
    }
}

async function deleteCategoria(cat_id) {
    try {
        if (cat_id === undefined || cat_id === null) {
            throw new Error('El campo cat_id es obligatorio');
        }
        const connection = await mysql.createConnection(config);
        const [result] = await connection.execute(
            'CALL SP_D_CATEGORIA_01(?)',
            [cat_id]
        );
        await connection.end();
        // El primer array contiene el registro eliminado (id y nombre)
        if (result[0]) {
            return result[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al eliminar categoría:', error.message);
        throw error;
    }
}

module.exports = {
    getCategoria,
    getCategoria_x_id,
    insertCategoria,
    updateCategoria,
    deleteCategoria
};