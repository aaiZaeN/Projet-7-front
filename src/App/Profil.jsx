import React from 'react'

//Composant Profil permettant l'affichage des infos de l'user (Nom, Prénom, Email) et un bouton "supprimer mon profil"
const Profil = () => {
  return (
    <div>
      <h1>Mon Profil</h1>
      <h2>Mon Prénom</h2>
      <h2>Mon Nom</h2>
      <h2>Mon Email</h2>
      <button className="btn btn-danger mh-4">Supprimer mon profil</button>
    </div>
  )
}

export default Profil
