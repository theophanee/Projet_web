import React, { Component } from 'react';
import {Avatar} from "@material-ui/core";
import './CSS/PostBox.css';

class PostBox extends Component {

    constructor(props){
        super(props);
        this.state={
            login : this.props.login,
            texte : this.props.texte,
            avatar : this.props.avatar,
            setProfilUser : this.props.setProfilUser,
            getLog : this.props.getLog,
            image: this.props.image
        }
    }
    
    render() {
        // affiche un post
        // avatar, identifiant, et texte
        if(!this.state.avatar){
            this.state.avatar = <Avatar/>
        }
        return <div className='post'>
            <div className='postbox'>
                <div className='avatar'>
                    {this.state.avatar}
                </div>
                <div className='usr'>
                    <button className='pseudo' onClick={()=>this.state.setProfilUser(this.state.login)}>
                        {"@"+this.state.login}
                    </button>
                </div>
            </div>
            <div className='post_txt'>{this.state.texte}</div>
            <div className='PostImage'>
                <img src={this.state.image} alt=""></img>
            </div>
        </div>  
    }
}

export default PostBox;