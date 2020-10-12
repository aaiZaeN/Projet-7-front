import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../ui/Button'
import { Loader } from '../ui/Loader'

export function Groupoposts({groupoposts, onClick}) {
  if (groupoposts === null) {
    return <Loader />
  }

  return <div className="row">
    {(groupopost => <div className="col-md-4 mb-4" key={groupopost.id}>
      <Groupopost groupopost={groupopost} onClick={onClick} />
    </div> )}
  </div>
}

Groupoposts.propTypes = {
  groupoposts: PropTypes.array,
  onClick: PropTypes.func.isRequired,
}

const Groupopost = memo(function ({ groupopost, onClick }) {
  return <div className="card">
    <div className="card-body">
      <div className="card-title">{groupopost.title}</div>
      <p className="card-text">{groupopost.short}</p>
      <Button onClick={() => onClick(groupopost)}>Voir le Groupopost</Button>
    </div>
  </div>  
})