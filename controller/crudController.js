const query = require('./../model/crud');


function getAll(req, res) {
    if (!req.session.admin === true) {
        res.send('Cette partie est reserve')
    }
    query.getAll().then(function (resultat, err) {
        if (err) throw err;
        res.render('gestionProduits', {resultat: resultat});
    })
}


function getId(req, res) {
    if (!req.session.admin === true) {
        res.send('Cette partie est reserve')
    }
    query.getId(req.params.id).then(function (resultat, err) {
        if (err) throw err;
        res.render('voirProduit', {resultat: resultat});
    })
}


function getAjouter(req, res) {


    if (!req.session.admin === true) {
        res.send('Cette partie est reservé')
    }



    res.render('ajouterProduit');
}


function postAjouter(req, res) {


    if (req.files) {
        let monImage = req.files.image;
        let filename = monImage.name;
        monImage.mv("./fichiersStatiques/images/img_" + filename, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            query.postAjouter(req, filename).then(function (resultat, err) {
                if (err) throw err;
                res.redirect('/gestion/produit')
            })

        });
    }


}


function deleteId(req, res) {

    if (!req.session.admin === true) {
        res.send('ERROR404')
    }
    query.deleteId(req).then(function (resultat, err) {
        if (err) throw err;
        res.redirect('/gestion/produit')
    })


}

function getModifier(req, res) {

    if (!req.session.admin === true) {
        res.send('ERROR404')
    }
    query.getModifier(req).then(function (resultat, err) {
        if (err) throw err;
        res.render('modifierProduit', {resultat: resultat})
    })

}


function putModifier(req, res) {


    if (req.files) {
        let monImage = req.files.image;
        let filename = monImage.name;
        monImage.mv("./fichiersStatiques/images/img_" + filename, function (err) {
            if (err) {
                return res.status(500).send(err);
            }

            query.putModifier(req, filename).then(function (resultat, err) {
                if (err) throw err;
                res.redirect('/gestion/produit')
            })


        });
    }
}


module.exports = {
    getAll: getAll,
    getId: getId,
    getAjouter: getAjouter,
    postAjouter: postAjouter,
    deleteId: deleteId,
    getModifier: getModifier,
    putModifier: putModifier,

};

