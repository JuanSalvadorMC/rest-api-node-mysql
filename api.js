const mysql = require('mysql2/promise'); // Importar mysql2 para probar la conexión
const dbConfig = require('./dbconfig'); // Configuración de la base de datos

// Probar la conexión a la base de datos al iniciar el proyecto
(async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Conexión exitosa a la base de datos');
        await connection.end();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        process.exit(1); // Salir del proceso si la conexión falla
    }
})();

var dbocategoria = require('./dbcategoria');
//Requerido en todos
var express = require('express');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);//Ruta principal

// Obtener todas las categorías
router.get('/categoria', (request, response) => {
    dbocategoria.getCategoria().then(result => {
        response.json(result);
    }).catch(error => {
        console.error('Error al obtener categorías:', error);
        response.status(500).json({ message: 'Error interno del servidor' });
    });
});

// Obtener una categoría por id
router.get('/categoria/:id', (request, response) => {
    dbocategoria.getCategoria_x_id(request.params.id).then(result => {
        if (result && result.length > 0) {
            response.json(result[0]);
        } else {
            response.status(404).json({ message: 'Categoría no encontrada' });
        }
    }).catch(error => {
        console.error('Error al obtener categoría por ID:', error);
        response.status(500).json({ message: 'Error interno del servidor' });
    });
});

// Crear una nueva categoría
router.post('/categoria', (request, response) => {
    let categoria = { ...request.body };
    dbocategoria.insertCategoria(categoria).then(result => {
        response.status(201).json(result[0]);
    }).catch(error => {
        console.error('Error al crear categoría:', error);
        response.status(500).json({ message: 'Error al crear categoría' });
    });
});

// Actualizar una categoría existente
router.put('/categoria/:id', (request, response) => {
    let categoria = { ...request.body, cat_id: request.params.id };
    dbocategoria.updateCategoria(categoria).then(result => {
        if (result && result.length > 0) {
            response.json(result[0]);
        } else {
            response.status(404).json({ message: 'Categoría no encontrada para actualizar' });
        }
    }).catch(error => {
        console.error('Error al actualizar categoría:', error);
        response.status(500).json({ message: 'Error al actualizar categoría' });
    });
});

// Eliminar una categoría por id
router.delete('/categoria/:id', (request, response) => {
    const cat_id = request.params.id;
    dbocategoria.deleteCategoria(cat_id).then(result => {
        if (result && result.length > 0) {
            response.json({
                message: 'Categoría eliminada correctamente',
                deleted: result[0]
            });
        } else {
            response.status(404).json({ message: `No se encontró la categoría con id ${cat_id}` });
        }
    }).catch(error => {
        console.error('Error al eliminar categoría:', error);
        response.status(500).json({ message: 'Error al eliminar categoría' });
    });
});

var port = process.env.PORT || 8090; //Declarando puerto de inicio
app.listen(port); //Puerto de escucha
console.log('Categoria API Iniciado en el puerto : ' + port); //Mensaje de inicio de servicio