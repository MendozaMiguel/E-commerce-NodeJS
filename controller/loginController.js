const query = require('./../model/login');
const queryPanier = require('./../model/panier');

const bcrypt = require('bcrypt');
const saltRounds = 10;


function inscriptionGet(req, res) {

    res.render('inscription');

}


function inscriptionPost(req, res) {
    bcrypt.hash(req.body.motdepasse, saltRounds, function (err, hash) {
        query.inscriptionPost(hash, req.body.email, req.body.nom, req.body.prenom, req.body.portable).then(function (resultat, err) {
            if (err) throw err;
            res.redirect('/')
        });
    });
}


function connexionGet(req, res) {

    res.render('connexion');

}


function connexionPost(req, res) {

    let email = req.body.email;
    let motdepasse = req.body.motdepasse;

    query.connexionPost(email).then(function (resultat, err) {
        if (err) throw err;
        if (resultat.length === 1) {

            bcrypt.compare(motdepasse, resultat[0].motdepasse, function (err, resCompare) {

                if (resCompare === true) {
                    req.session.utilisateur = {user: true, id: resultat[0].id};

                    if (resultat[0].admin === 1) {
                        req.session.admin = true;
                    }

                    queryPanier.getUserPanierNotCommande(req.session.utilisateur.id).then(function (resultat, err) {
                        if (err) throw err;

                        if (resultat.length === 1) {

                            req.session.panierId = resultat[0].id;
                            if (req.session.admin === true) {
                                res.redirect('/gestion/produit')
                            } else {
                                res.redirect('/')
                            }
                        } else {
                            queryPanier.createPanier(req.session.utilisateur.id).then(function (resultat, err) {
                                if (err) throw err;
                                queryPanier.getUserPanierNotCommande(req.session.utilisateur.id).then(function (resultat, err) {
                                    req.session.panierId = resultat[0].id;
                                    if (req.session.admin === true) {
                                        res.redirect('/gestion/produit')
                                    } else {
                                        res.redirect('/')
                                    }
                                })
                            })
                        }
                    });
                } else {
                    req.session.utilisateur = false;
                    res.redirect('/connexion')
                }
            });
        }
        else {
            res.redirect('/connexion')
        }
    });
}


function deconnexion(req, res) {

    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })

}


module.exports = {
    inscriptionGet: inscriptionGet,
    inscriptionPost: inscriptionPost,
    connexionGet: connexionGet,
    connexionPost: connexionPost,
    deconnexion: deconnexion,

};

