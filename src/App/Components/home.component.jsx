import axios from 'axios'
import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  
  render() {
    if(this.props.user){
      window.setTimeout( function(){
        window.location = "/groupoposts";
    }, 2500 );
      return (
        <div className="auth-wrapper">
          <div className="auth-inner">
        <div className="hello">
          <h2>Bonjour {this.props.user.firstName} {this.props.user.lastName}</h2>
          <p>Vous êtes connecté, vous allez être redirigé</p>
        </div>
        </div>
        </div>
      )
    }
    return (
      <div className="auth-wrapper">
          <div className="auth-inner">
      <h2>Vous n'êtes pas connecté</h2>
      </div>
      </div>
    )
  }
}
