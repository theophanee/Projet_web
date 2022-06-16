const express = require("express");
const Posts = require("./entities/posts.js");

// api des posts
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
    
    const posts = new Posts.default(db);
    router.post("/posts", async (req, res) => {
        try{
            // recupere la requete
            const {login,texte,image} = req.body;
            if(!texte){ // texte non saisie
                res.status(400).json({
                    status: 400,
                    message: "Saisir un texte"
                });return
            }
            if( await posts.create(login,texte,image)){ // crée le post dans la db
                res.status(200).json({
                    status: 200,
                    message: "login et texte accepter"
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
        .route("/posts")
        .get(async (req, res) => { // pour obtenir les posts de la db
        try {
            const post = await posts.get();
            if (!post)
                res.sendStatus(404);
            else
                res.send(post);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
    return router;
}
exports.default = init;

