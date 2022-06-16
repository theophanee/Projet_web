import React, { Component } from 'react';
import {Avatar} from "@material-ui/core";
import './CSS/Poster.css';

class Poster extends Component {

    constructor(props){
        super(props);
        this.state={
            setPost : this.props.setPost,
            avatar : <Avatar src="https://th.bing.com/th/id/OIP.lGXE7LLGxJUA6HoQ4u1kggHaE7?pid=ImgDet&rs=1"  />
        }
    }
    
    render() {
        // pour envoyer un post
        // lance la methode setPost pour envoyer textePost dans la db
        return <div className='post'>
            <div className='poster'>
                <div className='post_input'>
                    {this.state.avatar}
                    <input id="textePost" className='ecrirePost' placeholder='Quoi de neuf ?'></input>
                    <input id="ImagePost" className='ImagePost' placeholder='Mettre une image' type="text"></input>
                    <button className="bouton" onClick={this.state.setPost}>Poster</button>
                </div>
            </div>
        </div>  
    }

}

export default Poster;