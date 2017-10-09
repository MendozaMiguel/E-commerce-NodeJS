
const query = require('./../model/accueil');


function accueil (req, res) {

    query.getAll().then(function(resultat, err){
        if (err) throw err;
        console.log("qsdqsds");
        res.render('accueil', {resultat: resultat});
    })
}

module.exports ={
    accueil:accueil,
};

