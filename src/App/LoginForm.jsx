import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { ApiErrors, apiFetch } from './utils/api';
import { Button } from './ui/Button';


// formulaire de connection 
export function LoginForm ({onConnect}) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async function (e) {
    setError(null)
    setLoading(true)
    e.preventDefault()
    const data = new FormData(e.target);
    try {
      const user = await apiFetch('/user/login', {
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
    <h2>Se connecter</h2>
    {error && <Alert>{error}</Alert>} 
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" className="form-control" required/>
    </div>
    <div className="form-group">
      <label htmlFor="password">Mot de passe</label>
      <input type="password" name="password" id="password" className="form-control" required/>
    </div>
    <Button type="submit" loading={loading}>Se connecter</Button>
  </form>
  

  } 


LoginForm.propTypes = {
  onConnect: PropTypes.func.isRequired
}

// Message d'alerte
function Alert ({children}) {
  return <div className="alert alert-danger">
    {children}
  </div>
}

