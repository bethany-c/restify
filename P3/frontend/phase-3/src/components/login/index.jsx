// css 
import "../signup/signupstyles.css";


// imports 
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import API from '../API/apiservice';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [isLogin, setLogin] = useState(true);
  const [formDataLogin, setFormDataLogin ] = useState({
    username : "",
    password : ""
  })

  let navigate = useNavigate()

  // const [token, setToken] = useCookies(['mytoken'])


  useEffect(() => {
    console.log("this is the local storage length", localStorage.length)
    if (localStorage.length >= 1) {
      
      navigate("/")
      
    }
    
  }, []);



  const handleSubmit = (event) => {
    event.preventDefault();
    // Send formData to backend API via POST request
    fetch("http://localhost:8000/webpages/login/", {
      method: "POST",
      body: JSON.stringify(formDataLogin),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFormDataLogin(true);
        localStorage.setItem("token", data.token);
        navigate("/")
        


      })
      .catch((error) => console.error(error));
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormDataLogin(values => ({
        ...values,
        [name]: value 
    }))


  }


  return (
    <div className="myform">
        <h4>Please Log In here!</h4>
        <Form onSubmit={handleSubmit} className="p-5 form2" >
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter Username"
                value={formDataLogin.username}
                onChange={handleChange}
                name="username"
                />
            </Form.Group>
            <br />
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Enter password"
                value={formDataLogin.password}
                onChange={handleChange}
                name="password"
                />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
                Log In
            </Button>
        </Form>
        <div></div>
    </div>
  );
}

export default LogIn;