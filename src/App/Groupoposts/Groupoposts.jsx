import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Loader } from '../ui/Loader'
import jwt_decode from "jwt-decode"
import axios from 'axios'

//Composant Groupoposts permetant l'affichage des Groupoposts
export function Groupoposts({groupoposts, onClick}) {


  //Si il n'y à pas de Groupoposts ou qu'ils chargent on affiche le 'Loader'
  if (groupoposts === null) {
    return <Loader />
  }
  //On récupère la la liste des Groupoposts
  return <div className="row">
    {groupoposts.map(groupopost => <div className="items-align-center w-100 mb-5" key={groupopost.id}>
      <Groupopost groupopost={groupopost} onClick={onClick} />
    </div> )}
  </div>
}
Groupoposts.propTypes = {
  groupoposts: PropTypes.array
}
//Récuperation du token
let token = localStorage.getItem('token')
//Decriptage du token
let decodedHeader = jwt_decode(token);

//Mise en forme des Groupoposts, affichage du bouton supprimé si le Groupopost 
//a été créé par le user connécté ou si le user connécté est un admin


const deleteGroupopost = (groupopost) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  axios.delete('groupoposts/delete', groupopost.id)
      .then(function (response) {
          console.log(response)
      })
      .catch(function (error) {
          console.log(error);
      });
}
const Groupopost = memo(function ({ groupopost }) {
  return <div className="row" key={groupopost.id}>
  <div className="card w-100">
    <div className="card-body ">
      <div className="card-title"><h3>{groupopost.title}</h3></div>
      <p className="card-text">{groupopost.content}</p>
<p>{groupopost.id}</p>
      {(groupopost.UserId == decodedHeader.idUSERS || decodedHeader.isAdmin) && 
      <button key={groupopost.id}className="btn btn-danger" onClick={deleteGroupopost}>Supprimer</button>}
    </div>
    </div>
  </div>  
})