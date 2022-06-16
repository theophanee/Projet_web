import React, { Component } from 'react';
import './CSS/Messages.css'; 
import Contacts from './Contacts';
import Message from './Message';
import Options from './Options';

class Messages extends Component {

    constructor(props){
        super(props);
        this.state={
            messMethod : this.props.messages,
            logout : this.props.logout,
            profil : this.props.profil,
            posts : this.props.posts,
            envoyerMessages: this.props.envoyerMessages,
            contacts: this.props.contacts,
            liste_messages: this.props.liste_messages,
            destinataire : this.props.destinataire,
            auteur : this.props.auteur,
            conv : this.props.conv
        }
    }

    render() {
        
        if(!this.state.liste_messages){
            this.state.liste_messages = [];
        }else{
            //affiche en fonction de cpt pour avoir les messages dans l'ordre
            this.state.liste_messages.sort(function(a,b){
                return a.cpt-b.cpt;
            });
        }
        //page des messages
        // affiche les options, les contacts et les discussions
        // envoyerMessage permet d'envoyer le message dans la db
        return <div className='messages'>
            <Options posts={this.state.posts} profil={this.state.profil} messMethod={this.state.messMethod} logout={this.state.logout}/>
           
            <div className='Menu'>
                <div className='box'>
                    {this.state.contacts.map(contact=>(
                        <Contacts username={contact.login} conv={this.state.conv}/>
                    ))}
                </div>
            </div>
            <div className='chat'>
                <div className='box'>
                    <div className='chatBoxTop'>
                        <h2 className=''>{this.state.destinataire}</h2>
                    {this.state.liste_messages.map(messages=> {
                        if(this.state.auteur===messages.auteur && 
                            this.state.destinataire===messages.destinataire)
                            return <Message texte={messages.message}/> 
                        if(this.state.destinataire===messages.auteur && 
                            this.state.auteur===messages.destinataire)
                            return <Message texte={messages.message} reponse={true}/> 
                        return <div></div>
                    })}
                    </div>
                    <div className='chatBoxBottom'>
                        <textarea id='envoyerMessage' className='ecrireMessage' placeholder='Ecrire un message'></textarea>
                        <button className="bouton" onClick={this.state.envoyerMessages}>Envoyer</button>
                    </div>
                </div>
            </div>
        </div>

    }
}

export default Messages;