import React from 'react';
import { LoginForm } from './App/LoginForm';
import { Site } from './App/Site';
//import Footer from './App/Footer';
//import { SignupForm } from './App/SignupForm';
//import Error from './App/Error';
import { Groupoposts } from './App/Groupoposts/Groupoposts';
import Profil from './App/Profil'



//import { SignupForm } from './App/SignupForm';

export default function App() {
 const [user, setUser] = React.useState(null)


  return (
    user ? <Site /> : <LoginForm onConnect={setUser} />
    //user ? <Site /> : <SignupForm onConnect={setUser} />
    //<Site />
    //<Profil />
  );
}



