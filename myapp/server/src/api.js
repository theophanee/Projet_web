const express = require("express");
const Users = require("./entities/users.js");

function init(db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    
    const users = new Users.default(db);
    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            if (!login || !password) {
                res.status(400).json({
                    status: 400,
                    "message": "Requête invalide : login et password nécessaires"
                });
                return;
            }
            if(! await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            let userid = await users.checkpassword(login, password);
            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté",
                            userid: userid
                        });
                        req.session.save();
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "login et/ou le mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    router.post("/user/signUp", async (req, res) => {
        try{
            const {nom,prenom,login,password,confirm} = req.body;
            if(!password || !confirm || !nom || !prenom || !login){
                res.status(400).json({
                    status: 400,
                    message: "Veuillez remplir les champs"
                });return

            }
            if(await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Cet utilisateur existe déjà"
                });
                return;
            }else{
                if(password !== confirm){
                    res.status(500).json({
                        status: 500,
                        "message" : "Confirmer le mot de passe"
                    });return
                }
            }
            if( await users.create(nom,prenom,login,password)){
                res.status(200).json({
                    status: 200,
                    message: "login et mdp accepter"
                });
            }
        }catch(error){
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (error || "Erreur interne").toString(),
                number: 10
            });
        }
            
    });

    router
        .route("/user/:user_id(\\d+)")
        .get(async (req, res) => {
        try {
            const user = await users.get(req.params.user_id);
            if (!user)
                res.sendStatus(404);
            else
                res.send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));
        
    router
        .route("/user")
        .get(async (req, res) => { // pour obtenir les users de la db
        try {
            const user = await users.getUsers();
            if (!user)
                res.sendStatus(404);
            else
                res.send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
        

    router.put("/user", (req, res) => {
        const { login, password, nom, prenom } = req.body;
        if (!login || !password || !nom || !prenom) {
            res.status(400).send("Missing fields");
        } else {
            users.create(nom, prenom, login, password)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });

    return router;
}
exports.default = init;

