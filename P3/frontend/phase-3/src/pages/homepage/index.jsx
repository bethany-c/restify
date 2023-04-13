import React, { useState } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
import NavbarSO from '../../components/Navbar'
import './style.css'
import FilterModal from '../../components/modals/FilterModal'
import SearchBar from '../../components/Inputs/SearchBar'

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
      <div className='wrapper'>
        <SearchBar
          setLocation={ setLocation }
          setStart={ setStart }
          setEnd={ setEnd }
          setNumGuest={ setNumGuest }
          onSearch={ onSearch }
          invalid={ invalid }
        />
      </div>
      {/* <FilterModal/> */}
    </div>
  )
}

export default HomePage
