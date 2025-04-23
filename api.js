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

var Db  = require('./dbcategoria');
var Categoria = require('./categoria');
const dbocategoria = require('./dbcategoria');
//Requerido en todos
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);//Ruta principal

//Ruta para todas las categorias
router.route('/categoria').get((request,response)=>{
    dbocategoria.getCategoria().then(result => {
        console.log(result);
        response.json(result);
    })
})

//Ruta para una categoria por id
router.route('/categoria/:id').get((request, response) => {
    dbocategoria.getCategoria_x_id(request.params.id).then(result => {
        if (result && result.length > 0) {
            console.log(result);
            response.json(result[0]);
        } else {
            console.log(result);
            response.status(404).json({ message: 'Categoría no encontrada' });
        }
    }).catch(error => {
        console.error('Error al obtener categoría por ID:', error);
        response.status(500).json({ message: 'Error interno del servidor' });
    });
});

//Ruta para una guardar una categoria segun clase categoria
router.route('/categoria/guardar').post((request,response)=>{
    let categoria = {...request.body}
    dbocategoria.insertCategoria(categoria).then(result => {
       response.json(result[0]);
    })
})

//Ruta para una actualizar una categoria segun clase categoria
router.route('/categoria/actualizar').post((request,response)=>{
    let categoria = {...request.body}
    dbocategoria.updateCategoria(categoria).then(result => {
       response.json(result[0]);
    })
})

var port = process.env.PORT || 8090; //Declarando puerto de inicio
app.listen(port); //Puerto de escucha
console.log('Categoria API Iniciado en el puerto : ' + port); //Mensaje de inicio de servicio