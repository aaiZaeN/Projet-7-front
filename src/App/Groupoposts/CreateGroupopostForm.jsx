import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ApiErrors, apiFetch } from '../utils/api'
import { Button } from '../ui/Button';

export function CreateGroupopostForm ({onConnect}) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async function (e) {
    setError(null)
    setLoading(true)
    e.preventDefault()
    //Appel de l'API pour envoie (POST)
    const data = JSON.stringify({title, content})
    console.log(data)
    console.log(e.target)
    try {
      const user = await apiFetch('/groupopost/new', {
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
    <h2>Poster un Groupopost</h2>
    {error && <Alert>{error}</Alert>} 
    <div className="form-group">
      <label htmlFor="title">Titre</label>
      <input type="text" name="title" id="title" className="form-control" value={title}  onChange={e => setTitle(e.target.value)}required/>
    </div>
    <div className="form-group">
      <label htmlFor="content">Contenu</label>
      <input type="textarea" name="content" id="content" className="form-control" value={content}  onChange={e => setContent(e.target.value)}required/>
    </div>
    <Button type="submit" loading={loading} onClick={handleSubmit}>Poster !</Button>
  </form>
  } 

CreateGroupopostForm.propTypes = {
  onConnect: PropTypes.func.isRequired
}

// Message d'alerte
function Alert ({children}) {
  return <div className="alert alert-danger">
    {children}
  </div>
}

