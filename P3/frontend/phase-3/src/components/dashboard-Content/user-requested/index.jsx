import {React, useEffect, useState, useContext} from 'react'
import '../../dashboard-Content/contentstyle.css';
import CardComponent from '../../Card/CardComponent';
import CardComponentD from '../../Card/CardDashboardApproved/Card';
import AuthContext from '../../../context';
import '../user-approved/approvedstyle.css'



const Requested = () => {

    const [formDataRequested, setFormDataRequested] = useState([]);
    const { token } = useContext(AuthContext)
    const [refresh, setRefresh] = useState(0)


    useEffect(() => {
        // Send formDataLogin to backend API via POST request
        fetch("http://localhost:8000/webpages/reservations/requested/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + token['token'],
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('brother in christ',data);
            setFormDataRequested(data);
    
    
          })
          .catch((error) => console.error(error));
        
        
        }, [refresh]);

    const handleC = (reservationId) => {
      fetch("http://localhost:8000/webpages/" + reservationId + "/terminate/", {
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
    <div id='card' className='card2'>
        {formDataRequested.map((propertyInfo) => (
            <CardComponentD value={propertyInfo} button={{ handleC, text }}/>
        ))}
    </div>
  )
}

export default Requested
