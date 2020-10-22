import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Logo from'../images/icon-left-font-monochrome-black.png'

//Composant Nav
export default class Nav extends Component {
  
  //Clear du localStorage à la déconnexion de l'utilisateur
  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.setUser(null);
  };
  //Récuperation de title & content pour envoie
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      title: this.title,
      content: this.content,
    };
    console.log(data);
    //Config axios + redirection à la page Groupoposts si OK, sinon on retourne l'erreur
    axios.post('messages', data).then(
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

  state = {
    selectedFile: null
  }

  fileSelectedHandler = e => {
    this.setState({
    selectedFile: e.target.files[0]
    })
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    axios.post('messages/newimages')
      .then(res => {
        console.log(res)
      })
  }
  render() {
    let buttons;
    //Si l'utilisateur on affiche ces lien dans la Navbar
    if(this.props.user){
      buttons = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Button onClick={() => {this.handleModal()}}>Ajouter un Groupopost</Button>
              <Modal show={this.state.show}>
                <Modal.Header>Créer un Groupopost</Modal.Header>
                <Modal.Body>
                  <form onSubmit={this.handleSubmit}>

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
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => {this.fileSelectedHandler()}}>Fermer</Button>
                </Modal.Footer>
              </Modal>
          </li>

          <li className="nav-item">
            <Link to={'/profil'} className="nav-link">Profil</Link>
          </li>

          <li className="nav-item">
            <Link to={'/'} onClick={this.handleLogout} className="nav-link" to={'/login'}>Se déconnecter</Link>
          </li>
        </ul>
      )
    //Sinon on affiche seulement 'se connecter' et 's'inscrire'
    }else{
      buttons = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link href="" className="nav-link" to={'/login'}>Se connecter</Link>
              </li>
          <li className="nav-item">
            <Link href="" className="nav-link" to={'/register'}>S'inscrire</Link>
          </li>
        </ul>
      )
    }
    //Logo Groupomania
    return (
      <nav className="navbar navbar-expand fixed-top navbar-light mb-5">
        <div className="container">
            <img src={Logo} style={{width:200}} />
            <div className="collapse navbar-collapse">
              {buttons}
            </div>
          </div>  
        </nav>
    )
  }
}
  
