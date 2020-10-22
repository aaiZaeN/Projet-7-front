import React, { memo, useState, useEffect, getItems } from 'react'
import PropTypes from 'prop-types'
import { Loader } from '../ui/Loader'
import jwt_decode from "jwt-decode"
import axios from 'axios'
import moment from 'moment'
const fs = require('fs')
const querystring = require('querystring')

//Composant Groupoposts permetant l'affichage des Groupoposts
export function Groupoposts({groupoposts, onClick}) {

  if (groupoposts === null) {
    return <Loader />
  }
  //On récupère la la liste des Groupoposts
  return <div className="row">
    {console.log('groupopost', groupoposts)}
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


const Groupopost = memo(function ({ groupopost }) {
  const deleteGroupopost = () => {
    axios.delete("/messages/" + groupopost.id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }})
          .then(function (response) {
            document.location.href="http://localhost:3000/groupoposts"
              console.log(response)
          })
          .catch(function (error) {
              console.log(error);
          });
    }

  return (
    <div className="row boxMessage" key={groupopost.id}>
      <div className="card w-100">
        <div className="card-body ">
          <div className="card-title"><h3>{groupopost.title}</h3></div>
              <p className="card-text">{groupopost.content}</p>
              <p className="username">{groupopost.User.username}</p>
              {(groupopost.UserId == decodedHeader.userId || decodedHeader.isAdmin) && 
                <button key={groupopost.id}className="btn btn-danger" onClick={e => deleteGroupopost()}>Supprimer</button>
              }
              <div className="mt-3">Crée le : {moment(groupopost.createdAt).format("dd, MM Do YYYY, h:m:s a")}</div>
            </div>
        </div>
  </div>  )
})