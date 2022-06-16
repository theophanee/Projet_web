class Posts {
    constructor(db) {
      this.db = db
      // suite plus tard avec la BD
    }
  
    // un post c'est un identifiant et un texte
    create(login, texte, image) {
      return new Promise((resolve, reject) => {
        // À remplacer par une requête bd
        const post = {
          login: login,
          texte: texte,
          image: image
        };
        // on insert dans la db les données de la requete
        this.db.posts.insert(post, function(err, newDoc){
          if(err)
            resolve();
          else  
            resolve(newDoc);
        })
      });
    }
  
    get() {
      // retourne tous les posts de la db
      return new Promise((resolve, reject) => {
        // À remplacer par une requête bd
        this.db.posts.find({}, function(err, doc){
          if(doc){
            resolve(doc);
          }else{
            resolve();
          }
        });
      });
    }
  }
  
  exports.default = Posts;
  
  