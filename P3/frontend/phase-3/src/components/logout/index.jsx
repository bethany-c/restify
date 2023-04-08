import React from 'react'
import { Button } from 'react-bootstrap';
import API from '../API/apiservice';

const LogOut = () => {

return (<>
  <Button variant="primary" onClick={API.LogOutUser}> Log Out </Button>
  </>
  )
}

export default LogOut
