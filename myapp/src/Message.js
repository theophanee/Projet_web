import React, { Component } from 'react';
import {Avatar} from "@material-ui/core";
import './CSS/Message.css';

class Message extends Component {

    constructor(props){
        super(props);
        this.state={
            reponse : this.props.reponse,
            texte : this.props.texte
        }
    }

    render() {
        // affiche un message : avatar, texte
        if(this.state.reponse)
        // si c'est une réponse on affiche à gauche etc
        // différemment que si c'est notre message
            return <div className='reponse'>
                <div className='messageEcris'>
                    <Avatar/>
                    <p className='messageTexte'>{this.state.texte}</p>
                </div>
            </div>
        else{// si c'est notre message
            return <div className='message'>
            <div className='messageEcris'>
                <img
                    className='messageImage'
                    src="https://th.bing.com/th/id/OIP.lGXE7LLGxJUA6HoQ4u1kggHaE7?pid=ImgDet&rs=1"  
                    alt=""/>
                <p className='messageTexte'>{this.state.texte}</p>
            </div>
            </div>
        }
            

    }
}

export default Message;