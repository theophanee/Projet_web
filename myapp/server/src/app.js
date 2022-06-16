const cors = require('cors')
const path = require('path');
const api = require('./api.js');
const apiPosts = require('./apiPosts.js');
const apiMessages = require('./apiMessages.js');
const Datastore = require('nedb');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

const express = require('express');
const app = express()
const session = require("express-session");

let db = {};
db.users = new Datastore('../data/users.db');
db.users.loadDatabase();
db.posts = new Datastore('../data/posts.db');
db.posts.loadDatabase();
db.messages = new Datastore('../data/messages.db');
db.messages.loadDatabase();

app.use( cors({
    credentials: true,
    origin: 'http://localhost:3000'
}) );

app.use(session({
    secret: "technoweb rocks"
}));

//db.messages.insert({auteur: "Theophane77", message: "bonjour", destinataire: "Barka91"}, function(err, newDoc){})
/*const user = {
    login: "pikachu",
    password: "1234",
    nom: "chu",
    prenom: "pika"
};
db.users.insert(user);*/
app.use('/api', api.default(db));
app.use('/apiPosts', apiPosts.default(db));
app.use('/apiMessages', apiMessages.default(db));

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

