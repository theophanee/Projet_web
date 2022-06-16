class Users {
  constructor(db) {
    this.db = db
    // suite plus tard avec la BD
  }

  create(nom, prenom, login, password) {
    return new Promise((resolve, reject) => {
      // À remplacer par une requête bd
      const user = {
        nom: nom,
        prenom: prenom,
        login: login,
        password: password
      };
      this.db.users.insert(user, function(err, newDoc){
        if(err)
          resolve();
        else  
          resolve(newDoc);
      })
    });
  }

  get(userid) {
    return new Promise((resolve, reject) => {
      this.db.users.findOne({_id: userid}, function (err, docs){
        if (docs){
          resolve(docs)
        }
        else resolve()
      })
    });
  }

  getUsers() {
    // retourne tous les posts de la db
    return new Promise((resolve, reject) => {
      // À remplacer par une requête bd
      this.db.users.find({}, function(err, doc){
        if(doc){
          resolve(doc);
        }else{
          resolve();
        }
      });
    });
  }

  async exists(login) {
    return new Promise((resolve, reject) => {
      this.db.users.findOne({login: login}, function(err, docs){
        if(docs){
          resolve(docs._id);
        }else{
          resolve();
        }
      });
    });
  }

  checkpassword(login, password) {
    return new Promise((resolve, reject) => {
      // À remplacer par une requête bd
      this.db.users.findOne({login: login, password: password}, function(err, docs){
        if(docs){
          resolve(docs._id);
        }else{
          resolve();
        }
      });
      return
    });
  }

}

exports.default = Users;

