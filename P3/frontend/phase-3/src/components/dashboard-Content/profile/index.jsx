
import {React, useState, useEffect} from 'react'
import {Form, Container, Col, Row, Image, Button} from 'react-bootstrap';
import './profilestyle.css';
import $ from 'jquery';
const Profile = () => {
    const [formDataProfile, setFormDataProfile] = useState({});


    useEffect(() => {
    // Send formDataLogin to backend API via POST request
    fetch("http://localhost:8000/webpages/profile/edit/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + localStorage.getItem('token')
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFormDataProfile(data);


      })
      .catch((error) => console.error(error));
    
    
    }, []);


    const handleChangeProfile = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormDataProfile(values => ({
            ...values,
            [name]: value 
        }))
    
      }

    const sendEditRequest = () => {
        fetch("http://localhost:8000/webpages/profile/edit/", {
            method: "PATCH",
            body: JSON.stringify(formDataProfile),
            headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + localStorage.getItem('token')
            },
        })
            .then((response) => response.json())
            .then((data) => {
            console.log(data);
            $('#notification').text('Profile edited succesfully!')
    
    
            })
            .catch((error) => console.error(error));

        }

    const putImageIn = (e) => {
        const file = e.target.file
        $('#wizardPicturePreview').attr('src', file.toString())
    }







  return (
    <Form>
        <Container>
            <Row className="picture-container">
                <Col className="picture">
                    <Image fluid rounded className="picture-src" id="wizardPicturePreview" title="" />
                    <input onChange={putImageIn} name="avatar" type="file" id="wizard-picture" className="picture w-100 h-100" />
                </Col>
                <Col xs={12}>
                <h6 className="">Choose Picture</h6>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control onChange={handleChangeProfile} type='text' name="first_name"  value={formDataProfile.first_name}/>
                </Col>
                <Col>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control onChange={handleChangeProfile} type='text' name="last_name"  value={formDataProfile.last_name}/>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control onChange={handleChangeProfile} type='email' name="email"  value={formDataProfile.email}/>
                </Col>
            </Row>
            <br />
            <Row>
                <Col>
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control onChange={handleChangeProfile} type='text' name="phone_number" value={formDataProfile.phone_number}/>
                </Col>
            </Row>
            <br />
            <br />
            <Row id="editbutton" className='aligner'>
                <Col>
                    <Button onClick={sendEditRequest}> Edit </Button>
                </Col>
            </Row>
            <p id='notification'></p>



        </Container>



    </Form>

  )
}

export default Profile
