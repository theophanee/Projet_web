import React, { Component } from 'react';
import './CSS/Page.css';
import Options from './Options';
import Posts from './Posts';

class PagePosts extends Component {

    constructor(props){
        super(props);
        this.state={
            messMethod : this.props.messages,
            logout : this.props.logout,
            profil : this.props.profil,
            posts : this.props.posts,
            setPost : this.props.setPost,
            liste_post : this.props.liste_post,
            setProfilUser : this.props.setProfilUser,
            login : this.props.login
        }
    }
    
    render() {
        // retourne les options et la liste des posts
        console.log(this.state.liste_post)
        return <div className='Page'>
            <Options posts={this.state.posts} profil={this.state.profil} messMethod={this.state.messMethod} logout={this.state.logout}/>
            <Posts login={this.state.login} setProfilUser={this.state.setProfilUser} liste_post={this.state.liste_post} setPost={this.state.setPost}/>
        </div>
    }

}

export default PagePosts;