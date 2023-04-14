import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import API from '../API/apiservice';


import { useNavigate } from 'react-router-dom';

function DisplayOne(props) {
  const [pictures, setPictures] = useState([]);
  const firstpic= pictures.length > 0 ? pictures[0] : null;


  useEffect(() => {
    fetch('http://localhost:8000/webpages/picture/'+props.property_id +'/list/', {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token'),
        "Content-Type": "application/json"
      }

    })
    .then((response) => response.json())
    .then((data) => {
      const pictureData = data.map(picture => ({ id: picture.id, name: picture.name, image: picture.image }));
      setPictures(pictureData);

    })
  })
  if (pictures.length === 0){
    return <p>The list is empty</p>;
  }

  return (
    <div>

            <img src={firstpic.image} alt={firstpic.name} style={{ width: '50vh', height: '50vh' }} />

   

        
          

          <hr className="divider" />
        </div>


  );
}

export default DisplayOne;
