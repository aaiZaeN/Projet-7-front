import React, { useState, useEffect } from 'react';
import { useGroupoposts } from './hooks/groupoposts';
import { Groupoposts } from './Groupoposts/Groupoposts';
import { Groupopost } from './Groupoposts/Groupopost'
import { CreateGroupopostForm } from './Groupoposts/CreateGroupopostForm';
import { useToggle } from './hooks'
import { Modal } from './ui/Modal'

export function Site() {

  const [page, setPage] = useState('groupoposts')
  const [add, toggleAdd] = useToggle(false)

  const {
    groupoposts,
    groupopost,
    fetchGroupopost,
    fetchGroupoposts,
    deselectGroupopost,
    createGroupopost,
  } = useGroupoposts()
  
  let content = null
  if (page === 'groupoposts') {
    content = <Groupoposts groupoposts={groupoposts} onClick={fetchGroupopost} />
}

  useEffect(function () {
    if (page === 'groupoposts') {
       fetchGroupoposts()
    }
  }, [page, fetchGroupoposts, add])

  // indique sur quelle page on se trouve
  return <>
    <NavBar currentPage={page} onClick={setPage} onButtonClick={toggleAdd} />
    <div className="container">
      {groupopost ? <Groupopost groupopost={groupopost} onCLose={deselectGroupopost} /> : null}
      {add && <Modal title="Créer un Groupopost" onClose={toggleAdd}>
          <CreateGroupopostForm onSubmit={createGroupopost} />
        </Modal>}
        {content}
    </div>
  </>
}

// fonction permettant d'afficher sur quelle page on se trouve
function NavBar({ currentPage, onClick, onButtonClick }) {

  const navClass = function (page) {
    let className = 'nav-item'
    if (page === currentPage) {
      className = 'active'
    }
    return className;
  }
// navbar
  return <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
    <a href="#groupoposts" className="navbar-brand">LOGO</a>
    <ul className="navbar-nav mr-auto">
      <li className={navClass('groupoposts')}>
        <a href="#groupoposts" className="nav-link" onClick={() => onClick('groupoposts')}>Les Groupoposts</a>
      </li>
      <li className={navClass('profil')}>
        <a href="#profil" className="nav-link" onClick={() => onClick('profil')}>Mon Profil</a>
      </li>
    </ul>
    <button onClick={onButtonClick} className="btn btn-outline-light">
      Ajouter un groupoposts
    </button>
  </nav>
}