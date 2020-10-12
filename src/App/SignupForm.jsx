import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { ApiErrors, apiFetch } from './utils/api';
import { Button } from './ui/Button';
 
export function SignupForm ({onConnect}) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async function (e) {
    setError(null)
    setLoading(true)
    e.preventDefault()
    //Appel de l'API pour envoie (POST)
    const data = JSON.stringify({lastName, firstName, email, password})
    console.log(data)
    console.log(e.target)
    try {
      const user = await apiFetch('/user/register', {
        method: 'POST',
        body: data
    }) 
        onConnect(user)
    } catch (e) {
      if (e instanceof ApiErrors) {
        setError(e.errors[0].message)
      } else {
        console.error(e)
      }
      setLoading(false)
    }
  }

  // formulaire de connection
  return <form className="container mt-4">
    <h2>S'inscrire</h2>
    {error && <Alert>{error}</Alert>} 
    <div className="form-group">
      <label htmlFor="lastName">Nom</label>
      <input type="text" name="lastName" id="lastName" className="form-control" value={lastName}  onChange={e => setLastName(e.target.value)}required/>
    </div>
    <div className="form-group">
      <label htmlFor="firstName">Prénom</label>
      <input type="text" name="firstName" id="firstName" className="form-control" value={firstName}  onChange={e => setFirstName(e.target.value)}required/>
    </div>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" className="form-control" value={email}  onChange={e => setEmail(e.target.value)}required/>
    </div>
    <div className="form-group">
      <label htmlFor="password">Mot de passe</label>
      <input type="password" name="password" id="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required/>
    </div>
  
    <Button type="submit" loading={loading} onClick={handleSubmit}>S'inscrire</Button>
    <Button type="button">Connection</Button>
  </form>
  } 

SignupForm.propTypes = {
  onConnect: PropTypes.func.isRequired
}

// Message d'alerte
function Alert ({children}) {
  return <div className="alert alert-danger">
    {children}
  </div>
}

