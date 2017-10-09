//Déclaration de notre connexion SQL
const connSql = require('../configuration/configMysql');


function getAll() {
    return connSql.then(function (conn) {
        let resultat = conn.query("SELECT * FROM produits");
        return resultat
    });
}


function getId(produitId) {
    return connSql.then(function (conn) {
        let resultat = conn.query("SELECT * FROM produits WHERE id  = ? ", [produitId]);
        return resultat
    });
}



function postAjouter(req, filename) {

    let marequete = "INSERT INTO `produits` (`nom`, `description`, `prix`, `image`, `categorie`) VALUES (?, ?, ?, ?, ?);";
    return connSql.then(function (conn) {
        let resultat = conn.query(marequete, [req.body.nom, req.body.description, req.body.prix, filename, req.body.categorie]);
        return resultat
    });

}


function deleteId(req) {

    return connSql.then(function (conn) {
        let resultat = conn.query("DELETE FROM produits WHERE id  = ? ", [req.params.id]);
        return resultat
    });
}


function getModifier(req) {

    return connSql.then(function (conn) {
        let resultat = conn.query("SELECT * FROM produits WHERE id  = ? ", [req.params.id]);
        return resultat
    });

}


function putModifier(req, filename) {
    let marequete = "UPDATE `produits` SET `nom`=?, `description`=?, `prix`=?, `image`=?, `categorie`=? WHERE `id`=?;";

    return connSql.then(function (conn) {
        let resultat = conn.query(marequete, [req.body.nom, req.body.description, req.body.prix, filename, req.body.categorie, req.params.id]);
        return resultat
    });

}


module.exports = {

    getAll: getAll,
    getId: getId,
    postAjouter: postAjouter,
    deleteId: deleteId,
    getModifier: getModifier,
    putModifier: putModifier,


};