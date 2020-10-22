import React from 'react'
import axios from 'axios'
import { Component } from 'react';

export default class Register extends Component {

  //Récuperation des information pour 'envoie de la requete d'inscription
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      username: this.username,
      email: this.email,
      password: this.password
    };
    console.log(data);

    //config d'axios + redirection à la page login si OK
    axios.post('users/register', data).then(
    res => {
      document.location.href="http://localhost:3000/login"
      console.log(res)
    }
    //Sinon retourne l'erreur
  ).catch(
    err => {
      console.log(err)
    }
  )
};
  //form
  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
      <form onSubmit={this.handleSubmit}>
        <h3>Inscription</h3>

        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input type="text" className="form-control" placeholder="Nom d'utilisateur"
            onChange={e => this.username = e.target.value}/>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Email"
            onChange={e => this.email = e.target.value}/>
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" className="form-control" placeholder="Mot de passe"
            onChange={e => this.password = e.target.value}/>
        </div>

        <button className="btn btn-primary btn-block">Inscription</button>
      </form>
        </div>
      </div>
    )
  }
}
