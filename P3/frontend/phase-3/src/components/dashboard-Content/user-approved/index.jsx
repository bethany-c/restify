import {React, useEffect, useState, useContext} from 'react'
import '../../dashboard-Content/contentstyle.css';
import CardComponent from '../../Card/CardComponent';
import CardComponentD from '../../Card/CardDashboard/Card';
import AuthContext from '../../../context';
import { Button } from 'react-bootstrap';


const Approved = () => {

    const [formDataApproved, setFormDataApproved] = useState([]);
    const { token } = useContext(AuthContext)
    const [refresh, setRefresh] = useState(0)



    useEffect(() => {
        // Send formDataLogin to backend API via POST request
        fetch("http://localhost:8000/webpages/reservations/approved/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token['token']
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setFormDataApproved(data);
    
    
          })
          .catch((error) => console.error(error));
        
        
        }, [refresh]);
    


    const handleRequestToCancel = (reservationId) => {
        fetch("http://localhost:8000/webpages/" + reservationId + "/terminate_request/", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization" : "Bearer " + token['token']
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setRefresh(5)

            })
            .catch((error) => console.error(error));


        }
    const text = "Cancel Your Reservation"

  return (
    <div id='cards' className='cards2'>
        {formDataApproved.map((propertyInfo) => (
            <CardComponentD value={propertyInfo} button={{handleRequestToCancel, text}}/>
        ))}
    </div>
  )
}

export default Approved
