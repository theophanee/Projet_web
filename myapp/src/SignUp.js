import React, { Component } from 'react';
import './CSS/SignUp.css';

class SignUp extends Component{


    constructor(props){
        super(props);
        this.state={
            method : props.method,
            annuler : props.annuler
        }
    }

    render() {
        // permet d'inscrire un utilisateur
        // saisie son nom, prenom, login et mdp
        // on peut toujours annuler une inscription et revenir à la page de connexion
        // la saisie est vérifiée
        return <div className='SignUp'>            
        <head>
            <script defer src="MainPage.js"></script>
        </head>
        <form id='formSig' action='/' method='GET'>

            <h2 className='titreInscription'>Veuillez créer un compte</h2>
            
            <input type="text" id="nom" name="user_nom" placeholder="Nom" required></input>
            <br/>
            <input type="text" id="prenom" name="user_prenom" placeholder="Prenom" required></input>
            <br/>
            <input type="text" id="identifiant" name="usr" placeholder="Identifiant" required></input>
            <br/>
            <input type="password" id="mdp" name="mdp" placeholder="Mot de passe" required></input>
            <br/>
            <input type="password" id="cmdp" name="mdp" placeholder="Confirmer mot de passe" required></input>
            <br/>
            <div id="errorSig"></div>
            <button className="bouton" onClick={this.state.annuler} >Annuler</button>
            <button className="bouton" onClick={this.state.method}>S'enregistrer</button>
        </form>
        </div>
    }


}

export default SignUp;