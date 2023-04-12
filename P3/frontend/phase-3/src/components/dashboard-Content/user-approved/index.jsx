import {React, useEffect, useState} from 'react'
import '../../dashboard-Content/contentstyle.css';
import CardComponent from '../../Card/CardComponent';
import CardComponentD from '../../Card/CardDashboard/Card';


const Approved = () => {

    const [formDataApproved, setFormDataApproved] = useState([]);


    useEffect(() => {
        // Send formDataLogin to backend API via POST request
        fetch("http://localhost:8000/webpages/reservations/approved/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + localStorage.getItem('token')
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setFormDataApproved(data);
    
    
          })
          .catch((error) => console.error(error));
        
        
        }, []);

  return (
    <div>
        {formDataApproved.map((propertyInfo) => (
            <CardComponentD value={propertyInfo} />
        ))}
    </div>
  )
}

export default Approved
