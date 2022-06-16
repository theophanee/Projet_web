import React, { Component } from 'react';
import './CSS/Page.css';
import Options from './Options';
import Profil from './Profil';
import {Avatar} from "@material-ui/core";

class ProfilPage extends Component {

    constructor(props){
        super(props);
        this.state={
            messMethod : this.props.messages,
            logout : this.props.logout,
            profil : this.props.profil,
            posts : this.props.posts,
            login : this.props.login,
            setPost : this.props.setPost,
            liste_post : this.props.liste_post
        }
    }
    render() {
        // affiche les options et le profil de l'utilisateur
        return <div className='Page'>
            <Options posts={this.state.posts} profil={this.state.profil} messMethod={this.state.messMethod} logout={this.state.logout}/>
            <Profil liste_post={this.state.liste_post} setPost={this.state.setPost} avatar={Avatar} login={this.state.login}/>
        </div>
    }

}

export default ProfilPage;