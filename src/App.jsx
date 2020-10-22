import React, {Component} from 'react';
import './index.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Wall } from './App/Wall';
import Home from './App/Components/home.component'
import Nav from './App/Components/nav.component'
import Login from './App/Components/login.component'
import Register from './App/Components/register.component'
import axios from 'axios'
import CreateGroupopost from './App/Components/creategroupopost.component'
import Profil from './App/Components/profil.component'
import Error from './App/Error'
import Footer from './App/Footer'


export default class App extends Component {
  state = {};

  componentDidMount = () => {
    axios.get('users/me').then(
      res => {
        this.setUser(res.data);
      },
      err => {
        console.log(err)
      }
    )
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

render() {
  return (
    <BrowserRouter>
      <div className="App">
          <Nav user={this.state.user} setUser={this.setUser} />
        
            <Switch>
              <Route exact path="/" component={() => <Home user={this.state.user}/>} />
              <Route exact path="/profil" component={() => <Profil user={this.state.user}/>} />
              <Route exact path="/createGroupopost" component={() => <CreateGroupopost user={this.state.user}/>} />
              <Route exact path="/login" component={() => <Login setUser={this.setUser}/>}/>
              <Route exact path="/groupoposts" component={() => <Wall setUser={this.setUser} />}/>
              <Route exact path="/register" component={Register}/>
              <Route component={Error} />
            </Switch>
          <Footer />
          
      </div>
    </BrowserRouter>
    );
  }
}