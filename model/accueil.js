
//Déclaration de notre connexion SQL
const connSql = require('../configuration/configMysql');


function getAll() {
    return connSql.then(function(conn){
        let resultat = conn.query("SELECT * FROM produits ");
        return resultat
    });
}

module.exports ={

    getAll:getAll,


};