import mysql from 'mysql' 
var conectar = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'db_empresa2'
});

conectar.connect(function(err){
    if (err) {
        console.error('Error en la conexion: ' + err.stack);
    return;
    }

    console.log('conexion exitosa ID: ' + conectar.threadId);
});

export {conectar}