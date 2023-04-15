import React, { useState, useEffect, useContext } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap'
// import FilterForm from "../../components/Filter-input"
import { Modal, Container } from 'react-bootstrap';
import NavbarSO from '../../components/Navbar/'
import CardComponentD from '../../components/Card/CardComponent'
import './style.css'
import SearchBar from '../../components/Inputs/SearchBar'
import AuthContext from '../../context'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  let navigate = useNavigate();
  const {setIsloggedin, token} = useContext(AuthContext)
  const [start, setStart] = useState(getToday())
  const [end, setEnd] = useState(getToday())
  const [min, setMin] = useState()
  const [max, setMax] = useState()
  const [result, setResult] = useState([])


  const [FilterformData, setFormData] = useState({
    price_per_night: 0,
    number_of_bed: 0,
    number_of_rooms: 0,
    baths: 0,
    essentials: "",
    features: "",
    location: "",
    safety_features: "",
  });

  const [showModal, setShowModal] = useState(false);
  


  const [address, setLocation] = useState('')
  const [numGuest, setNumGuest] = useState(0)

  const [invalid, setInvalid] = useState(false)

  function handleShowModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  // this is an authenticated view I am calling 
  useEffect(() => {
    setResult([]);
    console.log(token['token'])
    console.log(token['token'] === undefined)
    if (token['token'] === undefined) {
      setIsloggedin(false)
    }
    else {
      setIsloggedin(true)
    }}
  , []);



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
    if(!address || numGuest < 1) {
      setInvalid(true)
    } else {
      setInvalid(false)
      handleSearch()
    }
  }

  const handleSearch = (event) => {
    console.log('http://localhost:8000/webpages/property/search/?location='+address+'&start_date='+start+'&end_date='+end+'&number_of_guest='+numGuest);
    fetch('http://localhost:8000/webpages/property/search/?location='+address+'&start_date='+start+'&end_date='+end+'&number_of_guest='+numGuest, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setResult(data);
      console.log( result);
    })
    .catch(error => {
      console.log(error);
    });
  }


  const handleFilter = (event) => {
    console.log('http://localhost:8000/webpages/property/filter/?price_per_night='+FilterformData.price_per_night+'&number_of_rooms='+FilterformData.number_of_rooms+'&number_of_bed='+FilterformData.number_of_bed+'&baths='+FilterformData.baths+'&essentials='+FilterformData.essentials+'&features='+FilterformData.features+'&safety_features='+FilterformData.safety_features+'&location='+FilterformData.location);
    //price_per_night, number_of_rooms, number_of_bed, baths, essentials, features, safety_features, location
  // For filter
  fetch('http://localhost:8000/webpages/property/filter/?price_per_night='+FilterformData.price_per_night+'&number_of_rooms='+FilterformData.number_of_rooms+'&number_of_bed='+FilterformData.number_of_bed+'&baths='+FilterformData.baths+'&essentials='+FilterformData.essentials+'&features='+FilterformData.features+'&safety_features='+FilterformData.safety_features+'&location='+FilterformData.location, {
      method: 'GET',
      body: JSON.stringify(result),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setResult(data);
      console.log( result);
    })
    .catch(error => {
      console.log(error);
    });
  }
  




const handleChange = (event) => {
  const { name, value, type, checked } = event.target;

if (type === 'checkbox' ) {
  // Handle amenities checkbox inputs
  if (checked){
    if (FilterformData[name] === ""){
      setFormData({
        ...FilterformData,
        [name]: value

      });
    }
    else{
      setFormData({
        ...FilterformData,
        [name]: FilterformData[name]+","+value

      });
      
    }
  }
  
  else{
    var ns;
    if (FilterformData[name].includes(","+value)){
        ns = FilterformData[name].replace(","+value, "");
    }
    else if(FilterformData[name].includes(value+",")){
      ns = FilterformData[name].replace(value+",", "");
    }
    else if(FilterformData[name].includes(value)){
      ns = FilterformData[name].replace(value, "");
    }
    
    setFormData({
      ...FilterformData,
      [name]: ns

    });
  }}
  else if (type === 'number') {
    // Handle number inputs
    setFormData({
      ...FilterformData,
      [name]: parseFloat(value)
    });
  } }
  return (
    <div>
      <NavbarSO />

      <div className='wrapper2'>
        <SearchBar
          setLocation={ setLocation }
          setStart={ setStart }
          setEnd={ setEnd }
          setNumGuest={ setNumGuest }
          onSearch={ onSearch }
          invalid={ invalid }
        />
        
      </div>
      <button className="btn btn-outline-secondary col-md-4 offset-md-3 mt-3" onClick={handleShowModal}>Filter</button>
      <div className='row   m-4'>
      {result.map(r => (
        <div key={r.id} >
          <p> property_id is {r.property}</p>

        </div>
      ))}
      </div>


      <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold mb-2 text-uppercase">Filter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="myform">
        <h4>Happy Filtering</h4>
        <Form  className="p-5 form2" >
            <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                type="number"
                value={FilterformData.price_per_night}
                onChange={handleChange}
                name="price_per_night"
                />
            </Form.Group>

            <br />
            <Form.Group controlId="formNum_room">
                <Form.Label>Bed Room Number</Form.Label>
                <Form.Control
                type="number"
                value={FilterformData.number_of_rooms }
                onChange={handleChange}
                name="number_of_rooms"
                />
            </Form.Group>
            <br />
            <Form.Group controlId="formBed">
                <Form.Label>Bed Number</Form.Label>
                <Form.Control
                type="number"
                value={FilterformData.number_of_bed}
                onChange={handleChange}
                name="number_of_bed"
                />
            </Form.Group>
            <br />
            <Form.Group controlId="formBaths">
                <Form.Label>Bath Room Number</Form.Label>
                <Form.Control
                type="number"
                value={FilterformData.baths}
                onChange={handleChange}
                name="baths"
                />
            </Form.Group>
            <br />
            <Form.Group controlId="formEssentials">
              <Form.Label>Essentials</Form.Label>
              <div>
                <Form.Check name="essentials" type="checkbox" label="Pool" value="pool" onChange={handleChange} />
                <Form.Check name="essentials" type="checkbox" label="Hot Tub" value="hot_tub" onChange={handleChange} />
                <Form.Check name="essentials" type="checkbox" label="Patio" value="patio" onChange={handleChange} />
                <Form.Check name="essentials" type="checkbox" label="Grill" value="grill" onChange={handleChange} />
                <Form.Check name="essentials" type="checkbox" label="Gym" value="gym" onChange={handleChange} />
                <Form.Check name="essentials" type="checkbox" label="Piano" value="fire_pit" onChange={handleChange} />
                <Form.Check name="essentials" type="checkbox" label="Fire Pit" value="washer" onChange={handleChange} />
                <Form.Check name="essentials" type="checkbox" label="Outdoor Shower" value="outdoor_shower" onChange={handleChange} />


                
              </div>
            </Form.Group>
            <br />
            <Form.Group controlId="formFeatures">
              <Form.Label>Features</Form.Label>
              <div>
                <Form.Check type="checkbox" name="features" label="WiFi" value="wifi" onChange={handleChange} />
                <Form.Check type="checkbox" name="features" label="TV" value="tv" onChange={handleChange} />
                <Form.Check type="checkbox" name="features" label="Kitchen" value="kitchen" onChange={handleChange} />
                <Form.Check type="checkbox" name="features" label="Workspace" value="workspace" onChange={handleChange} />
                <Form.Check type="checkbox" name="features" label="Air Conditioning" value="air_conditioning" onChange={handleChange} />
                <Form.Check type="checkbox" name="features" label="Heating" value="heating" onChange={handleChange} />
                <Form.Check type="checkbox" name="features" label="Washer" value="washer" onChange={handleChange} />
                <Form.Check type="checkbox" name="features" label="Dryer" value="dryer" onChange={handleChange} />
                
              </div>
            </Form.Group>

            <br />
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <div>
                <Form.Check type="checkbox" name="location" label="Lake Access" value="lake_access" onChange={handleChange} />
                <Form.Check type="checkbox" name="location" label="Beach Access" value="beach_access" onChange={handleChange} />
                <Form.Check type="checkbox" name="location" label="Ski-in/Ski-out" value="skiin_skiout'" onChange={handleChange} />
              </div>
            </Form.Group>
            <br />

            <Form.Group controlId="formSafety_features">
              <Form.Label>Safety Features</Form.Label>
              <div>
                <Form.Check type="checkbox" name="safety_features" label="Smoke Detector" value="smoke_detector" onChange={handleChange} />
                <Form.Check type="checkbox" name="safety_features" label="First Aid Kit" value="first_aid_kit" onChange={handleChange} />
                <Form.Check type="checkbox" name="safety_features" label="Fire Extinguisher" value="fire_extinguisher" onChange={handleChange} />
              </div>

            </Form.Group>
            <br />


            
            <Button variant="primary"  onClick={handleFilter}>
                Go Filter!
            </Button>
        </Form>
        <div></div>
    </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      
    </div>

    

  )
}

export default HomePage
