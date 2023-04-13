import React, { useState } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
import NavbarSO from '../../components/Navbar'
import './style.css'
import FilterModal from '../../components/modals/FilterModal'
const HomePage = () => {

  const [start, setStart] = useState(getToday())
  const [end, setEnd] = useState(getToday())
  const [min, setMin] = useState()
  const [max, setMax] = useState()

  const [location, setLocation] = useState('')
  const [numGuest, setNumGuest] = useState(0)

  const [invalid, setInvalid] = useState(false)

  



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

  function makeDay(day) {
    var today = new Date(day);
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

  function checkDate() {
    var today = getToday();
    setMin(today)
    // document.getElementById("start").setAttribute("min", today);
    var start = document.getElementById('start');
    var end = document.getElementById('end');
    
    if(start) {
      var minDate = new Date(start);
      minDate.setDate(minDate.getDate() + 2);
      let strMinDate = new Date(minDate).toISOString().slice(0, 10);
      var mini = makeDay(strMinDate);
      setMin(mini)
      // document.getElementById('end').setAttribute('min', mini);
    }
    if(end) {
      var maxDate = new Date(end.value);
      maxDate.setDate(maxDate.getDate());
      let strMaxDate = new Date(maxDate).toISOString().slice(0, 10);
      var maxi = makeDay(strMaxDate)
      setMax(maxi)
      // document.getElementById('start').setAttribute('max', maxi)
    }
  };

  const onSearch = () => {
    if(!location || numGuest < 1) {
      setInvalid(true)
    } else {
      setInvalid(false)
      handleSearch()
    }
  }

  const handleSearch = (event) => {
    fetch('http://localhost:8000/webpages/property/search', {
      method: 'GET',
      body: JSON.stringify({
        start_date: start,
        end_date: end,
        location: location,
        number_of_guest: numGuest
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
  }

  return (
    <div>
      <NavbarSO />
      <div className='wrapper2'>

        <InputGroup>
          <Form.Control 
            placeholder='Location'
            type='text'
            required
            name='location'
            onChange={ (e) => setLocation(e.target.value) }
          />
          <Form.Control 
            type='date'
            required
            id='start'
            name='start'
            min={ getToday() }
            onChange={ (e) => setStart(e.target.value) }
          />
          <Form.Control 
            type='date'
            required
            id='end'
            name='end'
            min={ getToday( )}
            onChange={ (e) => setEnd(e.target.value) }
          />

          <Form.Control 
            placeholder='# of Guests'
            type="number"
            min="0"
            required
            name='numGuests'
            onChange={ (e) => setNumGuest(e.target.value) }
          />
          <Button onClick={ () => onSearch() }>Search</Button>

        </InputGroup>

        { invalid ? 
          <p className='invalid'>
            Missing required field
          </p>
          : null
        }
      </div>
      <FilterModal/>
    </div>
  )
}

export default HomePage
