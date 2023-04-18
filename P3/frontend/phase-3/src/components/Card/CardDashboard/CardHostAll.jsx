import '../cardstyles.css'
import { React, useEffect, useState, useContext} from 'react';
import { Card, Button } from 'react-bootstrap';
import AuthContext from '../../../context';
import { useNavigate } from 'react-router-dom';
import DisplayOne from '../../Display_one_pic';
import { Modal, Form} from 'react-bootstrap';


export const CardComponentHAllListings = (props) => {
    const { id, address, description} = props.value;

    const { token } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        

    }, []);

    const onViewListing = (event) => {
        event.preventDefault()
        fetch('http://localhost:8000/webpages/property/' + id + '/detail/', {
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



return (
    <div className='col-sm-12 col-md-6 col-lg-4 results-card'>
        <Card>
            <div className='fixit w-100'>
                {/* <Button className='fixit-button' size='sm' onClick={handleShowModal}>{text}</Button> */}
                {/* the className for img=fixit-img --> its in the displayOne component but we can use it in cardstyles.css */}
                <DisplayOne property_id={id} />
            </div>
            <Card.Body>
                <Card.Title>{ address }</Card.Title>
                <Card.Text>{ description }</Card.Text>
                <Button onClick={onViewListing} className="btn btn-primary" size='sm'>View Listing</Button>
            </Card.Body>
        </Card>
    </div>
  


  )

}

export default CardComponentHAllListings;