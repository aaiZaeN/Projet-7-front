import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  state = {}

  handleSubmit = e => {
    e.preventDefault();

    const data = {
      email: this.email,
      password: this.password
    }

    axios.post('users/login', data)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      this.setState({
        loggedIn: true
      });
      window.location.reload();
      this.props.setUser(res.data.user);
    }) 
    .catch(err => {
      console.log(err)
    })
  };

  
render() {
    if(this.state.loggedIn){
      return <Redirect to ={'/'} />;
    }
    
    return (
      <div className="auth-wrapper">
          <div className="auth-inner">
      <form onSubmit={this.handleSubmit}>
      <h3>Connection</h3>

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

      <button className="btn btn-primary btn-block">Connexion</button>
    </form>
    </div>
    </div>
    )
  }
}
  
