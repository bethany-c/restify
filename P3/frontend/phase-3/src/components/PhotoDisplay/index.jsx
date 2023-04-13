import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import API from '../API/apiservice';


import { useNavigate } from 'react-router-dom';

function DisplayPic(props) {
  const [pictures, setPictures] = useState([]);


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

  return (
    <div>
      {pictures.map(picture => (
        <div key={picture.id}>
          <img src={picture.image} alt={picture.name} style={{ width: '50vh', height: '50vh' }} />
          <h3>Description: {picture.name} </h3>
          <hr className="divider" />
        </div>
      ))}
    </div>
  );
}

export default DisplayPic;
