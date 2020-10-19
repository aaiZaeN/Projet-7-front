import React from 'react'

//Composant de la page d'erreur, redirection au bout de 3 secs
const Error = () => {
  window.setTimeout( function(){
    window.location = "/groupoposts";
}, 3000 );
  return (
    <div>
      <h1>404</h1>
      <h2>Oops!! Vous ne devriez pas être ici !</h2>
      <p>Vous allez être redirigé à la page d'accueil, si le problème persiste contactez l'administrateur</p>
    </div>
    
  )
}

export default Error
