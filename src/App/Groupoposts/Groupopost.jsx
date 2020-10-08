import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from '../../ui/Modal'

export function Groupopost({ groupopost, onCLose}) {
  return (
    <Modal title={groupopost.title} onClose={onCLose}>
      {!groupopost}
    </Modal>
  )
}

Groupopost.propTypes = {
  groupopost: PropTypes.object.isRequired,
}