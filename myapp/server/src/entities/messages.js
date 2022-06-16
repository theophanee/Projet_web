class Messages {
  constructor(db) {
    this.db = db
    // suite plus tard avec la BD
  }

  // un message c'est l'identifiant de l'auteur, le message écrit et l'identifiant du destinataire
  create(auteur, message, destinataire , cpt ) {
    return new Promise((resolve, reject) => {
      // À remplacer par une requête bd
      const mess = {
        auteur: auteur,
        message: message,
        destinataire: destinataire,
        cpt : cpt
      };
      // on insert dans la db les données de la requete
      this.db.messages.insert(mess, function(err, newDoc){
        if(err)
          resolve();
        else  
          resolve(newDoc);
      })
    });
  }

  get() {
    // retourne les messages de la db
    return new Promise((resolve, reject) => {
      // À remplacer par une requête bd
      this.db.messages.find({}, function(err, doc){
        if(doc){
          resolve(doc);
        }else{
          resolve();
        }
      });
    });
  }  
}

exports.default = Messages;

