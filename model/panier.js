//Déclaration de notre connexion SQL
const connSql = require('../configuration/configMysql');


function addProduitToPanier(produitId, panierId) {
    return connSql.then(function (conn) {
        let resultat = conn.query("INSERT INTO produit_panier (produit_id, panier_id)VALUES(?,?);", [produitId, panierId]);
        return resultat
    });
}


function createPanier(userId) {
    return connSql.then(function (conn) {
        let resultat = conn.query("INSERT INTO paniers (utilisateur_id) VALUES(?)", [userId]);
        return resultat
    });
}


function deletePanier(produitId,panierId) {

    return connSql.then(function (conn) {
        let resultat = conn.query("DELETE FROM `produit_panier` WHERE produit_id = ? AND panier_id = ?   ;", [produitId,panierId]);
        return resultat
    });

}


function verifProduitExistInPanier(UserId, produitPanierId,panierId) {
    return connSql.then(function (conn) {
        let resultat = conn.query("SELECT * FROM ((produit_panier INNER JOIN paniers ON produit_panier.panier_id = paniers.id)INNER JOIN produits ON produit_panier.produit_id = produits.id) WHERE utilisateur_id = ? AND produit_id = ? AND panier_id LIMIT 1;", [UserId, produitPanierId,panierId]);
        return resultat
    });
}





function incremantProduitIntPanier(produitPanierId,panierId) {
    return connSql.then(function (conn) {
        let resultat = conn.query("UPDATE produit_panier SET quantite = quantite + 1 WHERE produit_id = ? AND panier_id = ? ", [produitPanierId,panierId]);
        return resultat
    });
}




function getPanierWithAllProducts(userId,panierId) {
    return connSql.then(function (conn) {
        let resultat = conn.query("SELECT * FROM ((produit_panier INNER JOIN paniers ON produit_panier.panier_id = paniers.id)INNER JOIN produits ON produit_panier.produit_id = produits.id) WHERE utilisateur_id = ? AND panier_id = ?;", [userId,panierId]);
        return resultat
    });
}


function getUserPanierNotCommande(userId) {
    return connSql.then(function (conn) {
        let resultat = conn.query("SELECT * FROM paniers WHERE commande = 0 AND utilisateur_id = ? ", [userId]);
        return resultat
    });
}


module.exports = {

    addProduitToPanier: addProduitToPanier,
    createPanier: createPanier,
    getPanierWithAllProducts: getPanierWithAllProducts,
    getUserPanierNotCommande: getUserPanierNotCommande,
    deletePanier: deletePanier,
    verifProduitExistInPanier: verifProduitExistInPanier,
    incremantProduitIntPanier: incremantProduitIntPanier,


};