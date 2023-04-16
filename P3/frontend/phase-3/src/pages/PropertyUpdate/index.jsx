import Add_pic from '../../components/PhotoAdd'
import Display_pic from '../../components/PhotoDisplay'
import Add_Ava from '../../components/Add_available'
import Display_Ava from '../../components/Display_Available'
import NavbarSO from '../../components/Navbar'
import { Button, Modal, Container } from 'react-bootstrap';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import PropertyUpdateFormfrom from '../../components/Property-update-form';


const PropertyUpdater = () => {
    const searchParams = new URLSearchParams(useLocation().search);
    const id = searchParams.get("property_id");



    return (

    
    <>
      <NavbarSO />
      <PropertyUpdateFormfrom property_id={id} />
   
    </>
    )
}

export default PropertyUpdater