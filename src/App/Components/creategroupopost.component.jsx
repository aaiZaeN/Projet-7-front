import React from 'react'
import axios from 'axios'
import { Component } from 'react';

export default class CreateGroupopost extends Component {

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      title: this.title,
      content: this.content,
    };
    console.log(data);

    axios.post('groupoposts', data).then(
    res => {
      document.location.href="http://localhost:3000/groupoposts"
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
        <h3>Créer un Groupopost</h3>

        <div className="form-group">
          <label>Titre</label>
          <input type="text" className="form-control" placeholder="Titre"
            onChange={e => this.title = e.target.value}/>
        </div>

        <div className="form-group">
          <label>Contenu</label>
          <textarea type="textarea" className="form-control" placeholder="Contenu"
            onChange={e => this.content = e.target.value}/>
        </div>

        <button className="btn btn-primary btn-block">Poster un groupopost</button>
      </form>
      </div>
      </div>
    )
  }
}
