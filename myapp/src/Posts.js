import React, { Component } from 'react';
import Poster from './Poster';
import PostBox from './PostBox';
import {Avatar} from "@material-ui/core";
import './CSS/Posts.css';

class Posts extends Component {

    constructor(props){
        super(props);
        this.state={
            setPost: this.props.setPost,
            posts : this.props.liste_post,
            setProfilUser : this.props.setProfilUser,
            login : this.props.login
        }
    }
    render() {
        // affiche les posts grace à la liste
        return <div className='actualite'>
            <div className='titre'>
                <h2>Accueil</h2>
            </div> 
            <Poster setPost={this.state.setPost}/>
            {this.state.posts.map(postbox => {
                if(this.state.login===postbox.login )
                    return <PostBox image={postbox.image} setProfilUser={this.state.setProfilUser} login={postbox.login} texte={postbox.texte} avatar={<Avatar src="https://th.bing.com/th/id/OIP.lGXE7LLGxJUA6HoQ4u1kggHaE7?pid=ImgDet&rs=1"/>}/> 
                else
                    return <PostBox image={postbox.image} setProfilUser={this.state.setProfilUser} login={postbox.login} texte={postbox.texte}/> 
            })}

        </div>

        
    }

}

export default Posts;