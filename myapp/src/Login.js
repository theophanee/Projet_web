import React, { Component } from 'react';
import './CSS/Login.css';

class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            login : props.login,
            signUp: props.signUp
        }
    }


    render() {
        // affiche la page de connexion
        // lance les méthodes cliquées
        return <div>
            <div className="btns-wrapper">
                <h1>Touitteur</h1> 
            </div>
        <div className='login'>
            <head>
                <script defer src="MainPage.js"></script>
            </head>
            <form id='formLog' action='/' method='GET'>
                <h2>Veuillez vous connecter</h2> 
                <br/>
                <input type="text" placeholder="Identifiant" id="username" required ></input>
                <br/>
                <input type="password" placeholder="Mot de passe" id="password" required></input>
                <div id="errorLog"></div>
                <br/>
                <button className="bouton" onClick={this.state.login}>Se connecter</button>
                <br/>
                <br/>
                <br/>
                Vous n'avez pas de compte ?
                <button className="bouton" onClick={this.state.signUp}>S'inscrire</button>
            </form>
        </div>
        </div>
    }
}

export default Login;