//#######################################
//### DECLARATION DES MODULES
//#######################################
//Déclaration de notre connexion SQL
const connSql = require('./configuration/configMysql');

//Déclaration d'Express
const express = require('express');
const app = express();

//Déclaration d'Express Static
app.use("/public", express.static(process.cwd() + "/fichiersStatiques"));

//Déclaration de EJS
app.set("view engine", "ejs");

//Déclaration de body-parser
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Déclaration d'Express fileupload
const fileUpload = require('express-fileupload');

app.use(fileUpload());

//Déclaration de method-override
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));

//Déclaration de bcrypt

var bcrypt = require('bcrypt');
const saltRounds = 10;


//Déclaration de express-session

const session = require('express-session');

app.use(session({
    secret: 'kfgudrydrh',
    resave: true,
    saveUninitialized: true,
}));


// middleware maison
const regleUtilisateurs = require('./middlewares/regleUtilisateurs');

app.use(function (req, res, next) {
    regleUtilisateurs.ifLogin(req, res, next);
});

app.use(function (req, res, next) {
    regleUtilisateurs.ifAdmin(req, res, next);
});


//Controller

const accueil = require('./controller/accueilController');
const crud = require('./controller/crudController');
const login = require('./controller/loginController');
const utilisateurs = require('./controller/utilisateursController');
const panier = require('./controller/panierController');


//Debut des route


app.get('/', accueil.accueil);


//Debut CRUD

app.get('/gestion/produit', crud.getAll);

app.get('/gestion/produit/voir/:id', crud.getId);

app.get('/gestion/produit/ajouter', crud.getAjouter);

app.post('/gestion/produit/ajouter', crud.postAjouter);

app.delete('/gestion/produit/:id', crud.deleteId);

app.get('/gestion/produit/modifier/:id', crud.getModifier);

app.put('/gestion/produit/modifier/:id', crud.putModifier);

//Fin CRUD


//Debut Authentification


app.get('/inscription', login.inscriptionGet);

app.post('/inscription', login.inscriptionPost);

app.get('/connexion', login.connexionGet);

app.post('/connexion', login.connexionPost);

app.get('/deconnexion', login.deconnexion);


// Fin Authentification


//Debut Gestion Utilisateur

app.get('/gestion/utilisateurs', utilisateurs.utilisateurGet);

app.post('/gestion/utilisateurs/admin/:id', utilisateurs.utilisateurAdminPost);

app.post('/gestion/utilisateurs/pasAdmin/:id', utilisateurs.utilisateurPasAdminPost);


//Fin Gestion Utilisateur


//Debut Panier

app.get('/panier',panier.getPanier);

app.post('/panier/ajouter/:id',panier.postPanier);

app.delete('/panier/supprimer/:id',panier.deletePanier);


//Fin Panier





app.listen(3000, function () {
    console.log("L'application est lancée et en écoute sur http://localhost:3000")
});




