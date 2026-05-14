'use client'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { PuffLoader } from 'react-spinners'

export default function SpinnerB() {
  return (
    <Modal
      size="lg" >
      <Modal.Body style={{ fontSize: '35px' }}>
        <div><PuffLoader
          color='var(--them)'
          size='250px'
          speedMultiplier={1}
        /></div>

      </Modal.Body>


    </Modal>
  )
}
