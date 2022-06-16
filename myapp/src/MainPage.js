import React, { Component } from 'react';
import Login from './Login';
import './CSS/MainPage.css';
import SignUp from './SignUp';
import PagePosts from './PagePosts';
import Messages from './Messages';
import ProfilPage from './ProfilPage';
import axios from 'axios';

// page principale du projet
class MainPage extends Component{

    constructor(props){
        super(props);        

        this.state={
            page : null,
            login: null,
            posts : null,
            contacts: null,
            liste_messages: null,
            destinataire: null,
            cpt : 0,
            api: axios.create({ // pour les api
                withCredentials: true,
                baseURL:  'http://localhost:4000'
            })
        }

        this.getConnected = this.getConnected.bind(this);
        this.setLogout = this.setLogout.bind(this);
        this.setSignUp = this.setSignUp.bind(this);
        this.setPagePosts = this.setPagePosts.bind(this);
        this.setMessages = this.setMessages.bind(this);
        this.setProfilPage = this.setProfilPage.bind(this);
        this.setInscription = this.setInscription.bind(this);
        this.setPost = this.setPost.bind(this);
        this.setProfilUser = this.setProfilUser.bind(this);
        this.setConversation = this.setConversation.bind(this);
    }

    getConnected = () => {
        // methode qui sert à se connecter avec login et mdp

        // recupere les  valeurs
        var login = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        // pour les erreurs
        const form = document.getElementById("formLog");
        const error = document.getElementById('errorLog');
        let messages;
       
        return new Promise(resolve =>{

            form.addEventListener('submit',(e)=>{ // pour afficher les messages d'erreurs
                if(!messages){
                    e.preventDefault();
                    error.innerText = messages;
                }
            });
            this.state.api.post('/api/user/login',{ // pour se connecter
                login: login,
                password: password
            })
                .then((response)=>{
                    // si c'est bon alors on envoie la page tweets et on garde le login
                    this.setState((state)=>{
                        state.login = login;
                        state.page = "tweets";
                        return this.state;
                    })
                })
                .catch((err)=>{
                    // sinon on affiche le message d'erreur
                    console.log(err.response)
                    messages = err.response.data.message;
                    error.innerText = messages;
                })
                
            // on recupere les posts de l'api
            this.state.api.get('/apiPosts/posts')
                .then((response)=>{
                    // on les places dans une liste
                    this.setState((state)=>{
                        state.posts = response.data;
                        return this.state;
                    })
                })
                .catch((erreur)=>{
                    // sinon message erreur
                    console.log("erreur : "+erreur.response.data)
                })
        })
    }

    setInscription = () =>{
        // permet de signUp
        // recupere les valeurs
        var nom = document.getElementById("nom").value;
        var prenom =document.getElementById("prenom").value;
        var login =document.getElementById("identifiant").value;
        var mdp =document.getElementById("mdp").value;
        var cmdp =document.getElementById("cmdp").value;
        //pour les erreurs
        const formSig = document.getElementById("formSig");
        const errorSig = document.getElementById('errorSig');
        let messages;
       
        return new Promise(resolve =>{
            
            formSig.addEventListener('submit',(e)=>{// pour afficher les erreurs
                if(!messages){
                    e.preventDefault();
                    errorSig.innerText = messages;
                }
            });
            // pour envoyer la requete d'inscription
            this.state.api.post('/api/user/signUp',{
                login: login,
                password: mdp,
                confirm: cmdp,
                nom: nom,
                prenom: prenom
            })
            .then((response)=>{
                // alors on revient à la page login
                this.setState((state)=>{
                    state.page = "logout";
                    return this.state;
                })
            })
            .catch((err)=>{
                // on affiche les erreurs
                messages = err.response.data.message;
                errorSig.innerText = messages;
            }) 
        })
    }

    setPost = () =>{
        // permet de poster
        var texte = document.getElementById("textePost").value; // texte du post
        var image = document.getElementById("ImagePost").value;
        return new Promise(resolve =>{  
            this.state.api.post('/apiPosts/posts',{ // envoie la requete dans l'api pour 
                login: this.state.login,
                texte: texte,
                image: image
            })
            .then((response)=>{
                this.setState((state)=>{
                    console.log("poster");
                    state.page="tweets";
                    return this.state;
                })
            })
            .catch((err)=>{
                console.log("non poster : ");
            })
        })
    }

    setLogout = () =>{
        // revient à la page login
        this.setState((state)=>{
            state.page = "logout"; 
            return this.state;
        })
    }

    setSignUp = () => {
        // vient à la page d'inscription
        this.setState((state)=>{
            state.page = "inscription";
            return this.state;
        });

    }

    setMessages = () =>{
        this.state.api.get('/api/user') //recupere les utilisateurs de la db
        .then((response=>{ 
            this.setState((state)=>{
                state.contacts = response.data;
                state.page = "messages";
                return this.state;
            });
        }))
        .catch((error)=>{
            console.log("erreur : "+error.response);
        })
        // affiche la page des messages
    }

    setConversation = (destinataire) => {
        this.state.api.get('/apiMessages/messages')
        .then((response)=>{
            this.setState((state)=>{
                state.cpt = (response.data).length ;
                state.liste_messages = response.data;
                state.destinataire = destinataire;
                state.page = "messages";
                return this.state;
            })
        })
        .catch((err)=>{
            console.log("liste messages erreur : "+err.response.data);
        })
    }

    envoyerMessages = () => {
        // permet d'envoyer un message
        var message = document.getElementById("envoyerMessage").value; // texte du message
        return new Promise(resolve =>{
            
            this.state.api.post('/apiMessages/messages',{ // envoie la requete dans l'api des messages
                auteur: this.state.login,
                message: message,
                destinataire: this.state.destinataire,
                cpt : this.state.cpt
            })
            .then((response)=>{
                console.log("envoye");
                this.setState((state)=>{
                    console.log("message envoye");
                    state.page="messages";
                    state.cpt ++;
                    return this.state;
                })
            })
            .catch((err)=>{
                console.log("message non envoye");
            })
        })
    }

    setProfilPage= () => {
        // affiche le profil de l'utilisateur
        this.setState((state)=>{
            state.page = "profil";
            return this.state;
        })
    }

    setProfilUser = (log) => { 
        // affiche la page d'un utilisateur choisi
        this.setState((state)=>{
            state.page = "profilUsr";
            state.profil_usr = log;
            return this.state;
        })
    }

    setPagePosts= () => {   
        // affiche la page des posts
        this.state.api.get('/apiPosts/posts') //recupere les posts de la db
        .then((response=>{
            this.setState((state)=>{
                state.posts = response.data;
                state.page = "tweets";
                return this.state;
            });
        }))
        .catch((error)=>{
            console.log("erreur : "+error.response.data)
        });
    }

    render(){
        let comp;
        comp = <Login signUp={this.setSignUp} login={this.getConnected}  />;

        if(this.state.page === "inscription") {
            comp = <SignUp method={this.setInscription} annuler={this.setLogout}/>;
        }
        else if(this.state.page === "logout"){
            comp = <Login signUp={this.setSignUp} login={this.getConnected}/>;
        }
        else if(this.state.page === "tweets"){
            comp = <PagePosts login={this.state.login} setProfilUser={this.setProfilUser} liste_post={this.state.posts} setPost={this.setPost} posts={this.setPagePosts} profil={this.setProfilPage} messages={this.setMessages} logout={this.setLogout}/>;
        }
        else if(this.state.page === "messages"){
            comp = <Messages conv={this.setConversation} auteur={this.state.login} destinataire={this.state.destinataire} liste_messages={this.state.liste_messages} contacts={this.state.contacts} posts={this.setPagePosts} envoyerMessages={this.envoyerMessages} profil={this.setProfilPage} messages={this.setMessages} logout={this.setLogout}/>;
        }
        else if(this.state.page === "profil"){
            comp = <ProfilPage setProfilUser={this.setProfilUser} liste_post={this.state.posts} setPost={this.setPost} login={this.state.login} posts={this.setPagePosts} profil={this.setProfilPage} messages={this.setMessages} logout={this.setLogout}/>;
        }
        else if(this.state.page === "profilUsr"){
            comp = <ProfilPage setProfilUser={this.setProfilUser} liste_post={this.state.posts} setPost={this.setPost} login={this.state.profil_usr} posts={this.setPagePosts} profil={this.setProfilPage} messages={this.setMessages} logout={this.setLogout}/>;
        }
        return <nav className='nav1'> 
                {comp}
        </nav>
    }
}
export default MainPage;