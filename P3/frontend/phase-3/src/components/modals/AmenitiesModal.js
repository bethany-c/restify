import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'

const AmenitiesModal = (props) => {
  const {
    essentials,
    features,
    location,
    safety,
    address
  } = props;

  const [showModal, setShowModal] = useState(false)
  const [total, setTotal] = useState()

  const handleShow = () => setShowModal(true);
  const handleHide = () => setShowModal(false);

  useEffect(() => {
    setTotal(essentials.length + features.length + location.length + safety.length)
  }, [essentials, features, location, safety])

  const renderItem = (arr, title) => {
    if (arr.length > 0) {
      return (
        <>
          <div className="amenities-title">
            <strong>{ title }</strong>
          </div>
          { arr.map((item, index) => {
            if(index % 2 === 0) {
              return (
                <div className="form-group row">
                  <div className="col-md-4">
                    <span>{ item }</span>
                  </div>
                  { arr[index + 1] && (
                    <div className='col-md-4 offset-md-2'>
                      <span>{ item[index + 1] }</span>
                    </div>
                  )}
                </div>
              )
            } else {
              return null;
            }
          })}
        </>
      )
    } else {
      return null;
    }
  }

  return (
    <>
      <Button className="filter-button" variant='outline-secondary' onClick={ handleShow }>
        View all { total } amenities
      </Button>

      <Modal show={ showModal } onHide={ handleHide }>
        <Modal.Header closeButton>
          <Modal.Title>Amentities at { address }</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { renderItem(essentials, 'Essentials') }
          { renderItem(features, 'Features') }
          { renderItem(location, 'Location') }
          { renderItem(safety, 'Safety') }
          

        </Modal.Body>
      </Modal>
    </>

  )

}

export default AmenitiesModal;

