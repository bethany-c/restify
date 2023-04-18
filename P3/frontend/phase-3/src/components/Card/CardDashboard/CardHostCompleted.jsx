import '../cardstyles.css'
import { React, useEffect, useState, useContext} from 'react';
import { Card, Button } from 'react-bootstrap';
import AuthContext from '../../../context';
import { useNavigate } from 'react-router-dom';
import DisplayOne from '../../Display_one_pic';
import { Modal, Form} from 'react-bootstrap';


export const CardComponentHComp = (props) => {
    const { id, property} = props.value;
    const {text} = props.button;
    // const [price, setPrice] = useState(0);
    // const [start, setStart] = useState()
    // const [end, setEnd] = useState()
    // const [totalPrice, setTotalPrice] = useState(0);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [ShowButton, setShowButton] = useState(true)
    const [UserHistoryModalData, setUserHistoryModalData] = useState({
        content: ""
    })


    useEffect(() => {
        

    }, []);

    const onViewListing = (event) => {
        event.preventDefault()
        fetch('http://localhost:8000/webpages/property/' + property.id + '/detail/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },

        })
        .then((res) => res.json())
        .then((data) => {
        console.log(data, 'this is right before the navigate')
        navigate('/property-info', {state: data});

        })
    }


    function handleShowModal() {
        setShowModal(true);
    }
    
    function handleCloseModal() {
        setShowModal(false);
    }




    const sendUserHistory = () => {

        fetch('http://localhost:8000/webpages/' + id + '/review_for_guest/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token['token'],
            },
            body: JSON.stringify(UserHistoryModalData)

    
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, 'this is the response from userhistory')
                setShowButton(false)
                navigate('/dashboard/host_completed/')

    
            })

            .catch((error) => console.error(error))
        


    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserHistoryModalData(values => ({
            ...values,
            [name]: value 
        }))

        console.log(UserHistoryModalData, 'THIS IS THE MODAL DATA')

    }








return (
    <div className='col-sm-12 col-md-6 col-lg-4 results-card'>
        <Card>
            <div className='fixit w-100'>
                {ShowButton ? (
                    <Button className='fixit-button' size='sm' onClick={handleShowModal}>{text}</Button>
                ) : (
                    <div></div>
                )}
                {/* the className for img=fixit-img --> its in the displayOne component but we can use it in cardstyles.css */}
                <DisplayOne property_id={property.id} />
            </div>
            <Card.Body>
                <Card.Title>{ property.address }</Card.Title>
                <Card.Text>{ property.description }</Card.Text>
                {/* <Card.Text>
                    <p className='card-left-align'>
                        ${ price }/night
                    <span className="card-right-align total-price">
                        ${ totalPrice } total
                    </span>
                    </p>
                </Card.Text> */}
                <Button onClick={onViewListing} className="btn btn-primary" size='sm'>View Listing</Button>
            </Card.Body>
        </Card>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold mb-2">Leave a Review for Your Guest!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label> Your Comment </Form.Label>
                        <Form.Control 
                        type='text'
                        as="textarea" 
                        name='content'
                        rows={5}
                        onChange={handleChange}/>

                    </Form.Group>
                    <br />
                    <div className='makeitwork'>
                        <Button variant='primary' onClick={sendUserHistory} > Submit </Button>
                        <Button variant='dark' onClick={handleCloseModal}> Close </Button>
                    </div>
                </Form>
            </Modal.Body>

        </Modal>
    </div>
  


  )

}

export default CardComponentHComp;