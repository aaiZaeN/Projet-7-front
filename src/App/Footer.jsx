import React from 'react'

//Composant Footer, fixé en bas de l'écran
const Footer = () => {
  return (
    <div className="d-flex flex-column">
      <footer className="sticky-footer" className="py-4 bg-dark text-white-50 fixed-bottom">
        <div className="container text-center">
          <small>Copyright &copy; Projet 7 - OpenClassRooms - Réalisé par Maxence Maucourant
          </small>
        </div>
      </footer>
    </div>
  )
}

export default Footer
  