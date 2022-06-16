const express = require("express");
const Messages = require("./entities/messages.js");

// api pour les messages
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
    
    const mess = new Messages.default(db);
    router.post("/messages", async (req, res) => {
        try{
            // pour creer un message dans la db
            const {auteur,message,destinataire,cpt} = req.body;
            // recupere la requete et vérifie
            if(!message){ //pas de message saisie
                res.status(400).json({
                    status: 400,
                    message: "Saisir un message"
                });return
            }
            if( await mess.create(auteur,message,destinataire,cpt)){ // crée le message dans la db
                res.status(200).json({
                    status: 200,
                    message: "message envoyé"
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
        .route("/messages")
        .get(async (req, res) => { // pour obtenir la db des messages
        try {
            const message = await mess.get();
            if (!message)
                res.sendStatus(404);
            else
                res.send(message);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
    return router;
}
exports.default = init;

