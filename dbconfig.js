/* const config = {
    user: 'root',
    password: 'admin',
    server: 'localhost:3306',
    database: 'BDTEST2',
    options:{
        trustedconnection: false,
        enableArithAbort : true, 
        encrypt:false
        //instancename :'/'  En caso se tenga alguna instancia
    }
}

module.exports = config;  */

const config = {
    host: 'localhost', // Cambiado de 'server' a 'host'
    user: 'root',
    password: 'admin',
    database: 'dbtest2',
    port: 3306 // Especifica el puerto para MySQL
};

module.exports = config;