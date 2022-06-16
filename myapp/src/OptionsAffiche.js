import React, { Component } from 'react';

class OptionsAffiche extends Component {

    constructor(props){ 
        super(props);
        this.state={
            icon : this.props.icon,
            texte : this.props.texte,
            method : this.props.method
        }
    }
    
    render(){
        // pour mieux présenter les options
        return(
            <button className="optionAffiche" onClick={this.state.method}>
                <this.state.icon/>
                <h2 className='texte_option'>{this.state.texte}</h2>
            </button>
        )
    }

}

export default OptionsAffiche