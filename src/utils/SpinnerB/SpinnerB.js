'use client'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { PuffLoader } from 'react-spinners'

export default function SpinnerB() {
  return (
    <Modal 
    size="lg" >
<Modal.Body style={{fontSize:'35px'}}>
<div><PuffLoader
    color="rgba(25, 165, 175)"
    size='250px'
    speedMultiplier={1}
  /></div>

</Modal.Body>


</Modal>
  )
}
