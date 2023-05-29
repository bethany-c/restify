import React, { useState, useEffect, useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import AuthContext from '../../context'


const NotifsModal = () => {
  // const {
  //   user
  // } = props

  const { token } = useContext(AuthContext)
  const [showModal, setShowModal] = useState(false)
  const handleShow = () => setShowModal(true)
  const handleHide = () => setShowModal(false)

  const [notifs, setNotifs] = useState([])


  const getUnreadNotifs = () => {
    fetch('http://localhost:8000/webpages/notifications/new/view/', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token['token']
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('this is notif data', data)
      setNotifs(data)
    })
    .catch((error) => console.log('this is notifs error', error))
  }

  const renderNoNotifs = () => (
    <div>
      No new notifications
    </div>
  )

  const renderNewCircle = () => (
    <div className='circle'></div>
  )


  const renderNotifs = () => {
    if (!notifs || notifs.length === 0) {
      return renderNoNotifs()
    }
    const start = 0;
    const end = Math.min(5, notifs.length)
  
    return notifs.slice(start, end).map((item, index) => {
      return (
        <div key={ index }>
          <div className='comment-section'>
            <p>{ item.user_type.toUpperCase() }: { item.notification_message }</p>
          </div>
          <hr/>
        </div>
      )
    })
  }

  return (
    <>
      <Modal show={ showModal } onHide={ handleHide }>
        <Modal.Header closeButton>
          <Modal.Title>New notifications</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          { renderNotifs() }

        </Modal.Body>
      </Modal>
    </>
  )
}
export default NotifsModal;