import React, {Component} from 'react'
import jwt_decode from 'jwt-decode'

export default class Home extends Component {
  //Si le User est connécté: Bobjour 'Nom' 'Prenom' + redirection
  render() {
    //Récuperation du token
    let token = localStorage.getItem('token')
    //Decriptage du token
    let decodedHeader = jwt_decode(token);
    console.log(decodedHeader)
    if(this.props.user){
      window.setTimeout( function(){
        window.location = "/groupoposts";
    }, 2500 );
      return (
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div className="hello">
              <h2>Bonjour {decodedHeader.username}</h2>
              <p>Vous êtes connecté, vous allez être redirigé</p>
            </div>
          </div>
        </div>
      )
    }
    //Si l'utilisateur n'est pas connecté:
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h2>Vous n'êtes pas connecté</h2>
        </div>
      </div>
    )
  }
}
