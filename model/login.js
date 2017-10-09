//Déclaration de notre connexion SQL
const connSql = require('../configuration/configMysql');




function inscriptionPost(hash,email,nom,prenom,portable) {
    return connSql.then(function (conn) {
        let resultat = conn.query("INSERT INTO`utilisateurs` (`motdepasse`, `email`, `nom`, `prenom`, `portable`) VALUES (?, ?, ?, ?, ?);", [hash,email,nom,prenom,portable]);
        return resultat
    });
}



function connexionPost(email) {

    return connSql.then(function (conn) {
        let resultat = conn.query("SELECT * FROM utilisateurs WHERE email = ?", [email]);

        return resultat
    });
}




module.exports = {

    inscriptionPost: inscriptionPost,
    connexionPost: connexionPost,


};