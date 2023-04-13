import React, { useState, useEffect } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import BsFillStarFill from 'react-icons/bs'
import './cardstyles.css'

const ReservationCard = (props) => {
  const {
    propertyInfo,
  } = props;

  const [start, setStart] = useState()
  const [end, setEnd] = useState()
  const [numGuests, setNumGuests] = useState()
  const [ppn, setPpn] = useState()
  const [total, setTotal] = useState()
  const [numNights, setNumNights] = useState()


  useEffect(() => {
    if(start && end && start < end && start > getToday()) {
      //fetch api to reserve

      //setPpn, call getTotal, 
      
    }
  })

  const onReserve = () => {
    // fetch api to reserve
  }

  function getToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd
    } 
    if(mm<10){
      mm='0'+mm
    }
    return yyyy+'-'+mm+'-'+dd;
  }

  
  function getNights() {
    const night = 24 * 60 * 60 * 1000; 
    const diffDays = Math.round(Math.abs((start - end) / night));
    setNumNights(diffDays)
  }
  
  function getTotalPrice() {
    return (numNights * ppn).toFixed(2)
  }


  return (
    <Card className='sticky-top sticky-offset'>
      <Card.Body>
        <Form>
          <div className='row card-center'>
            <h4>${ propertyInfo.price } per night</h4>
            <a class="mb-2 line-right-align purple-color" href="#rating-link"><BsFillStarFill/>{ propertyInfo.rating }</a>
            <div class="form-group col-lg-6 col-md-12">
              <Form.Control 
                type='date'
                required
                id='start'
                name='start'
                min={ getToday() }
                onChange={ (e) => setStart(e.target.value) }
              />
            </div>
            <div class='form-group col-lg-6 col-md-12'>
              <Form.Control 
                type='date'
                required
                id='end'
                name='end'
                min={ getToday() }
                onChange={ (e) => setEnd(e.target.value) }
              />
            </div>
            <div class="form-group col-12">
              <Form.Control 
                type='number'
                required
                id='end'
                name='# of Guests'
                min={ 0 }
                onChange={ (e) => setNumGuests(e.target.value) }
              />
            </div>
            <p class="card-left-align">
              $ { propertyInfo.price } x { numNights } nights:
              <span class="card-right-align">
                ${ total }
              </span>
            </p>
            <hr/>
            <strong class="card-left-align">
              Total Price
              <span class="card-right-align">
                ${ total }
              </span>
            </strong>
            <div class="submit-form-btn">
              <Button class='full-width'>
                Request to Reserve
              </Button>
            </div>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ReservationCard;