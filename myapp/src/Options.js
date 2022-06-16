import React, { Component } from 'react';
import OptionsAffiche from './OptionsAffiche';
import HomeIcon from "@material-ui/icons/Home";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import PostAddIcon from '@material-ui/icons/PostAdd';
import './CSS/Options.css';

class Options extends Component {

    constructor(props){
        super(props);
        this.state={
            messMethod : this.props.messMethod,
            logout : this.props.logout,
            profil : this.props.profil,
            posts : this.props.posts          
        }
    }

    render() {
        // affiche les options disponibles et lance les méthodes correspondantes
        return <div className="optionss">
            <OptionsAffiche method={this.state.posts} icon={HomeIcon} texte="Accueil"/>
            <OptionsAffiche method={this.state.profil}  icon={AccountCircleIcon} texte="Profil"/>
            <OptionsAffiche method={this.state.posts} icon={PostAddIcon} texte="Poster"/>
            <OptionsAffiche method={this.state.messMethod} icon={MailOutlineIcon} texte="Messages"/>
            <OptionsAffiche method={this.state.logout} icon={CloseIcon} texte="Déconnexion"/>
        </div>
    }

}

export default Options;