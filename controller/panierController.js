const query = require('./../model/panier');


function getPanier(req, res) {

    query.getPanierWithAllProducts(req.session.utilisateur.id, req.session.panierId).then(function (resultat, err) {
        if (err) throw err;
        res.render('panier', {resultat: resultat});
    })

}


function postPanier(req, res) {
    query.verifProduitExistInPanier(req.session.utilisateur.id, req.params.id, req.session.panierId).then(function (resultat, err) {
        if (err) throw err;
        if (resultat[0] != null) {
            query.incremantProduitIntPanier(req.params.id, req.session.panierId).then(function (resultat, err) {
                if (err) throw err;
                res.redirect('/panier')
            })
        } else {
            query.addProduitToPanier(req.params.id, req.session.panierId).then(function (resultat, err) {
                if (err) throw err;
                res.redirect('/panier')
            })
        }
    });
}


function deletePanier(req, res) {

    query.deletePanier(req.params.id, req.session.panierId).then(function (resultat, err) {
        if (err) throw err;
        res.redirect('/panier')
    })

}


module.exports = {
    getPanier: getPanier,
    postPanier: postPanier,
    deletePanier: deletePanier,
};

