module.exports = {
    ifLogin: function (req, res, next) {
        if (req.session.utilisateur == null) {
            res.locals.connecte = false;
        } else {
            res.locals.connecte = req.session.utilisateur;
        }
        next();
    },  ifAdmin: function (req, res, next) {
        if (req.session.admin == null) {
            res.locals.admin = false;
        } else {
            res.locals.admin = req.session.admin;
        }
        next();
    },
};

/*
ifLogin est une methode
const regleUtilisateurs =require('./middlewares/regleUtilisateurs');
app.use(function (req, res, next) {
   regleUtilisateurs.ifLogin(req,res,next);
});
*/
