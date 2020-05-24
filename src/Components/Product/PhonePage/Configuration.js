import React, { Component } from 'react';
class Configuration extends Component {
    state = {  }
    render() {
        return (
           
        <button onClick={()=>{this.props.configChange(this.props.configuration)}}>{this.props.configuration}</button>
        
      
        );
    }
}

export default Configuration;
