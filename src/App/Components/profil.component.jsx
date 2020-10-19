import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

export default class Profil extends Component {
  //On récupere l'email et le mot de passe pour la suppression du profil
  handleDelete = e => {
    const data = {
      email: this.email,
      password: this.password,
    };
    console.log(data);
    //Config axios + redirection vers la page d'inscription
    axios.delete('users/delete', data).then(
    res => {
      document.location.href="http://localhost:3000/register"
      console.log(res)
    }
  ).catch(
    err => {
      console.log(err)
    }
  )
};

  constructor()
  {
    super()
    this.state={
      show:false
    }
  }
  handleModal()
  {
    this.setState({show:!this.state.show})
  }
  
  render() {
    //Récuperation du token, decodage
    let token = localStorage.getItem('token')      
    let decodedHeader = jwt_decode(token);

    //si le user est connecté on affiche ses informations & si c'est un admin on affiche 'ADMIN'
    //Au click sur supprimer on ouvre un Modal demandant l'email et le password pour confirmer la suppression du profil
    if(this.props.user){
      return (
        <div className="auth-wrapper">
          <div className="auth-inner text-center">
            {decodedHeader.isAdmin && <h2>ADMIN</h2>}
            <h2>Nom: {this.props.user.firstName}</h2>
            <h2>Prénom: {this.props.user.lastName}</h2>
            <h2>Email: {this.props.user.email}</h2>
            <Button className="btn btn-danger" onClick={() => {this.handleModal()}}>Supprimer votre profil</Button>
              <Modal show={this.state.show} >
                <Modal.Header>Pour supprimer votre compte veuillez confirmer vos identifiants</Modal.Header>
                  <Modal.Body>
                    <form onSubmit={this.handleSubmit}>
                      
                      <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" placeholder="Email"
                          onChange={e => this.email = e.target.value}/>
                      </div>

                      <div className="form-group">
                        <label>Mot de passe:</label>
                        <input type="password" className="form-control" placeholder="Mot de passe"
                          onChange={e => this.password = e.target.value}/>
                      </div>

                      <Button className="btn btn-danger btn-block" onClick={() => {this.handleDelete()}}>Confirmer la suppression de votre profil</Button>
                    </form>
                  </Modal.Body> 
                  <Modal.Footer>
                    <Button onClick={() => {this.handleModal()}}>Fermer</Button>
                  </Modal.Footer>
              </Modal>
          </div>
        </div>
      )
    }
    //Si l'utilisateur n'est pas connecté on lui indique et on le redirige vers la page login
    window.setTimeout( function(){
      window.location = "/login";
  }, 3000 );
    return (
      <h2>Vous nêtes pas connecté, vous allez être redirigé vers la page de connexion</h2>
    )
  }
}