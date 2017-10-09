



// Configuration de la connection a la base de donne mysql


const mysql = require('promise-mysql');
const connection = mysql.createConnection({
    host     : 'localhost',    //lieu de la base de donne
    user     : 'root',         //nom d'utilisateur
    password : "",             //mot de passe
    database : 'projetfred'    //nom de la base de donne
});

module.exports = connection;
