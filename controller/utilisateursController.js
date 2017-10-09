
const query = require('./../model/utilisateurs');




function utilisateurGet (req, res) {
    if (!req.session.admin === true) {
        res.send('ERROR404')
    }
    query.getAll().then(function(resultat, err){
        if (err) throw err;
        res.render('gestionUtilisateurs', {resultat: resultat});
    })
}



function utilisateurAdminPost (req, res) {
    if (!req.session.admin === true) {
        res.send('ERROR404')
    }
    query.utilisateurAdminPost(req).then(function(resultat, err){
        if (err) throw err;
        res.redirect('/gestion/utilisateurs');
    })
}



function utilisateurPasAdminPost (req, res) {
    if (!req.session.admin === true) {
        res.send('ERROR404')
    }
    query.utilisateurPasAdminPost(req).then(function(resultat, err){
        if (err) throw err;
        res.redirect('/gestion/utilisateurs');
    })
}







module.exports ={
    utilisateurGet:utilisateurGet,
    utilisateurAdminPost:utilisateurAdminPost,
    utilisateurPasAdminPost:utilisateurPasAdminPost,
};

