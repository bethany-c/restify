import Add_pic from '../../components/PhotoAdd'
import Display_pic from '../../components/PhotoDisplay'
import Add_Ava from '../../components/Add_available'
import Display_Ava from '../../components/Display_Available'
import NavbarSO from '../../components/Navbar'
import { Button, Modal, Container } from 'react-bootstrap';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

function Property_extra(props) {
  const searchParams = new URLSearchParams(useLocation().search);
    const id = searchParams.get("property_id");

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);

  
    function handleShowModal() {
      setShowModal(true);
    }
  
    function handleCloseModal() {
      setShowModal(false);
    }
    function handleShowModal2() {
        setShowModal2(true);
      }
    
      function handleCloseModal2() {
        setShowModal2(false);
      }
      function handleShowModal3() {
        setShowModal3(true);
      }
    
      function handleCloseModal3() {
        setShowModal3(false);
      }
  
    return (
      <>
      <NavbarSO />
      <div>
        <hr className="divider" />
        <h2 className='m-3'>Pictures of Property</h2>
        
        <div className="form-group row m-3">
          <div className="col-md-4">
            <button className="btn btn-outline-primary mt-3" onClick={handleShowModal2}>Add Picture</button>
          </div>
          <button className="btn btn-outline-secondary col-md-4 offset-md-3 mt-3" onClick={handleShowModal}>View Uploaded Picture(s)</button>
        </div>

        <hr className="divider" />

        <Display_Ava property_id={id}/>
        <Container className="d-flex justify-content-center">
          <button className="btn btn-outline-primary mt-3 mb-3" onClick={handleShowModal3}>Add Availble Dates & Price</button>
        </Container>
      
        

        <Modal show={showModal2} onHide={handleCloseModal2}>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold mb-2 text-uppercase">Upload photo!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Add_pic property_id={id} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal2}>Close</Button>
          </Modal.Footer>
        </Modal>
  
        
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold mb-2 text-uppercase">Your Uploaded Photos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Display_pic property_id={id}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal3} onHide={handleCloseModal3}>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold mb-2 text-uppercase">Add Available Dates!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Add_Ava  property_id={id}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal3}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
    );
  }
  
  export default Property_extra;