import '../cardstyles.css'
import { React, useEffect, useState, useContext} from 'react';
import { Card, Button } from 'react-bootstrap';
import AuthContext from '../../../context';
import { useNavigate } from 'react-router-dom';

export const CardComponentD = (props) => {
    const { id, available_date, property} = props.value;
    const {handleRequestToCancel, text} = props.button;
    const [price, setPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();



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


    useEffect(() => {
        fetch("http://localhost:8000/webpages/available_date/" + available_date + "/detail/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token['token']
        },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('available date data' ,data);
            setPrice(data.price_per_night)


            // now calculate total price
            const startDate = new Date(data.start_date);
            const endDate = new Date(data.end_date);
            const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
            const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            const totalPrice2 = numDays*data.price_per_night;
            setTotalPrice(totalPrice2)




        })
        .catch((error) => console.error(error));
        
        
        }, []);


return (
    <div className='col-sm-12 col-md-6 col-lg-4 results-card'>
        <Card>
            <Card.Body>
                <Button onClick={() => handleRequestToCancel(id)}>{text}</Button>
                <br />
                <br />
                <Card.Img alt='Listing image'></Card.Img>
                <Card.Title>{ property.address }</Card.Title>
                <Card.Text>{ property.description }</Card.Text>
                <Card.Text>
                    <p className='card-left-align'>
                        ${ price }/night
                    <span className="card-right-align total-price">
                        ${ totalPrice } total
                    </span>
                    </p>
                </Card.Text>
                <Button onClick={onViewListing} className="btn btn-primary" size='sm'>View Listing</Button>
            </Card.Body>
        </Card>
    </div>
  


  )

}

export default CardComponentD;