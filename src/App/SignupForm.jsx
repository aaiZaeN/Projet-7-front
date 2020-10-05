import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { ApiErrors, apiFetch } from './utils/api';



// formulaire de connection 
export function SignupForm ({onConnect}) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async function (e) {
    setError(null)
    setLoading(true)
    e.preventDefault()
    const data = new FormData(e.target);
    try {
      const user = await apiFetch('/user/lregister', {
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
  

  return <form className="container mt-4" onSubmit={handleSubmit}>
    <h2>S'inscrire</h2>
    {error && <Alert>{error}</Alert>} 
    <div className="form-group">
      <label htmlFor="lastName">Nom</label>
      <input type="text" name="lastName" id="lastName" className="form-control" required/>
    </div>
    <div className="form-group">
      <label htmlFor="firstName">Prénom</label>
      <input type="firstName" name="firstName" id="firstName" className="form-control" required/>
    </div>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" className="form-control" required/>
    </div>
    <div className="form-group">
      <label htmlFor="password">Mot de passe</label>
      <input type="password" name="password" id="password" className="form-control" required/>
    </div>
    <button type="submit" className="btn btn-primary">S'inscrire</button>
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

