import React, { Component } from 'react';
import {Avatar} from "@material-ui/core";
import PostBox from './PostBox';
import Poster from './Poster';
import './CSS/Profil.css';

class Profil extends Component {

    constructor(props){
        super(props);
        this.state={
            login : this.props.login,
            setPost : this.props.setPost,
            posts : this.props.liste_post,
            avatar : <Avatar src="https://th.bing.com/th/id/OIP.lGXE7LLGxJUA6HoQ4u1kggHaE7?pid=ImgDet&rs=1"  />
        }
    }

    render() {

        // affiche le profil de l'utilisateur
        // identifiant, avatar et ses posts
        var cpt=0; // pour avoir son nombre de posts
        this.state.posts.forEach(element => {
            if(element.login===this.state.login){
                cpt++;
            }
        });

        // sort de la liste des posts les posts de son identifiant
        return <div className='profil'>
            <div className='profilusr'>
                <div className='username'><h3>{"@"+this.state.login}</h3></div>
                <div className="nbTweets">{cpt} Touittes</div>
            </div>
            
            <div className='entete'>

            <img className='banniere'
                src="https://th.bing.com/th/id/R.62ab55790f82733895bc8e3b859aec2f?rik=1yxVuJVF04O%2bew&riu=http%3a%2f%2fwww.studiocast.fr%2fimages%2ftwitter.png&ehk=HB7nHZJhkzZ8uvXPKelqGurZibvQ6W2COMw%2bh8JU5iY%3d&risl=&pid=ImgRaw&r=0"
                alt=""
            >
            </img>
            <div className='ppProfil' id="ppProfil">{this.state.avatar}</div>

            <div className='username'>
                <h3>{"@"+this.state.login}</h3>
            </div>
            </div>

            <Poster setPost={this.state.setPost}/>
            {this.state.posts.map(postbox => {
                if(this.state.login===postbox.login )
                    return <PostBox image={postbox.image} login={postbox.login} texte={postbox.texte} avatar={this.state.avatar}/> 
                return <div></div>
            })}

        </div>

        
    }

}

export default Profil;