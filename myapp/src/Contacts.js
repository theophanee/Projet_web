import React, { Component } from 'react';
import {Avatar} from "@material-ui/core";
import './CSS/Contacts.css';

class Contacts extends Component {

    constructor(props){
        super(props);
        this.state={
            username:this.props.username,
            conv : this.props.conv
        }
    }

    render() {
        // affiche un contact (utilisateur)
        return <div className='contacts' onClick={()=>this.state.conv(this.state.username)}>
                <button className="contactbutton" >
                    <div className='contactImage'><Avatar/></div>
                    <h2 className='contact'>@{this.state.username}</h2>
                </button>
        </div>

    }
}

export default Contacts;