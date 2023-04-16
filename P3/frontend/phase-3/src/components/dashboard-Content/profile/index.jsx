
import {React, useState, useEffect, useContext} from 'react'
import {Form, Container, Col, Row, Image, Button} from 'react-bootstrap';
import './profilestyle.css';
import $ from 'jquery';
import AuthContext from '../../../context';
const Profile = () => {
    const [formDataProfile, setFormDataProfile] = useState({});
    const { token } = useContext(AuthContext);


    useEffect(() => {
    // Send formDataLogin to backend API via POST request
    fetch("http://localhost:8000/webpages/profile/edit/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token['token']
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
            "Authorization" : "Bearer " + token['token']
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
        
        fetch("http://localhost:8000/webpages/profile/edit/", {
            method: "PATCH",
            body: JSON.stringify({
                avatar:e.target.value
            }),
            headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token['token']
            },
        })
            .then((response) => response.json())
            .then((data) => {
            console.log(data);
            $('#notification').text('Profile edited succesfully!')
    
    
            })
            .catch((error) => console.error(error));


    }


  return (
    <Form className='form234'>
        <Container>
            <Row>
                <Col className='picture-col'>
                    <div className='picture-frame'>
                        <Image fluid roundedCircle src={formDataProfile.avatar} id="wizardPicturePreview" title="" />
                        <h6 className="">Choose Picture</h6>
                        <input onChange={putImageIn} name="avatar" type="file"/>
                    </div>
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
