import React from 'react'
import axios from 'axios'
import { Component } from 'react';

export default class Register extends Component {

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };
    console.log(data);

    axios.post('http://localhost:8080/api/users/register', data).then(
    res => {
      document.location.href="http://localhost:3000/login"
      console.log(res)
    }
  ).catch(
    err => {
      console.log(err)
    }
  )
};
  
  render() {
    return (
      <div className="auth-wrapper">
          <div className="auth-inner">
      <form onSubmit={this.handleSubmit}>
        <h3>Inscription</h3>

        <div className="form-group">
          <label>Nom</label>
          <input type="text" className="form-control" placeholder="Nom"
            onChange={e => this.firstName = e.target.value}/>
        </div>

        <div className="form-group">
          <label>Prénom</label>
          <input type="text" className="form-control" placeholder="Prénom"
            onChange={e => this.lastName = e.target.value}/>
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
