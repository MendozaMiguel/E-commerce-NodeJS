
//Déclaration de notre connexion SQL
const connSql = require('../configuration/configMysql');


function getAll() {
    return connSql.then(function(conn){
        let resultat = conn.query("SELECT * FROM utilisateurs");
        return resultat
    });
}



function utilisateurAdminPost(req) {
    return connSql.then(function(conn){
        let resultat = conn.query("UPDATE `utilisateurs` SET `admin`='1' WHERE `id`=?;", [req.params.id]);
        return resultat
    });
}

function utilisateurPasAdminPost(req) {
    return connSql.then(function(conn){
        let resultat = conn.query("UPDATE `utilisateurs` SET `admin`='0' WHERE `id`=?;", [req.params.id]);
        return resultat
    });
}


module.exports ={

    getAll:getAll,
    utilisateurAdminPost:utilisateurAdminPost,
    utilisateurPasAdminPost:utilisateurPasAdminPost,




};