import {React, useEffect, useState, useContext} from 'react'
import '../../dashboard-Content/contentstyle.css';
import CardComponent from '../../Card/CardComponent';
import CardComponentD from '../../Card/CardDashboard/Card';
import AuthContext from '../../../context';


const Approved = () => {

    const [formDataApproved, setFormDataApproved] = useState([]);
    const { token } = useContext(AuthContext)


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
