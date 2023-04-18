import {React, useEffect, useState, useContext} from 'react'
// import '../../dashboard-Content/contentstyle.css';
// import '../../../dashboard-Content/contentstyle.css'
import CardComponentHAllListings from '../../../Card/CardDashboard/CardHostAll';
import AuthContext from '../../../../context';
import { Button } from 'react-bootstrap';
import '../../../dashboard-Content/contentstyle.css'

const AllListings = () => {

    const [FormDataAllListings, setFormDataAllListings] = useState([]);
    const { token } = useContext(AuthContext)
    const [refresh, setRefresh] = useState(0)
    const [nextURL, setNextUrl] =useState('')
    const [prevURL, setPrevURL] = useState('')
    const [pagination, setPagination] = useState(false)

    useEffect(() => {
      fetchTerminations()
    }, []);

    const fetchTerminations = (url = "http://localhost:8000/webpages/listings/all/") => {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer " + token['token'],
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            console.log('brother in table array', data);
            setFormDataAllListings(data);

          }
          else {
            console.log('brother in table dict', data);
            setFormDataAllListings(data.results);
            setNextUrl(data.next)
            setPrevURL(data.previous)
            setPagination(true)
          }

  
  
        })
        .catch((error) => console.error(error));
    }

    // useEffect(() => {
    //     // Send formDataLogin to backend API via POST request
    //     fetch("http://localhost:8000/webpages/reservations/approved/", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization" : "Bearer " + token['token']
    //       },
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         if (Array.isArray(data)) {
    //           console.log(data, 'array response');
    //           setFormDataAllListings(data);

    //         }
    //         else {
    //           console.log(data.results, 'dict response');
    //           setFormDataAllListings(data.results);

    //         }
    //       })
    //       .catch((error) => console.error(error));
        
        
    //     }, [refresh]);
    


    // const handleC = (reservationId) => {
    //     fetch("http://localhost:8000/webpages/" + reservationId + "/terminate_request/", {
    //         method: "PATCH",
    //         headers: {
    //           "Content-Type": "application/json",
    //           "Authorization" : "Bearer " + token['token']
    //         },
    //       })
    //         .then((response) => response.json())
    //         .then((data) => {
    //           console.log(data);
    //           setRefresh(5)

    //         })
    //         .catch((error) => console.error(error));


    //     }
    // const text = "Request to Cancel"

  // Fetch cancellations data for next page
  const handleNext = () => {
    fetchTerminations(nextURL);
    setPagination(false)
  };

  // Fetch cancellations data for previous page
  const handlePrev = () => {
    fetchTerminations(prevURL);
  };

  return (<>
    <div className='nextprevbuttons'>
      <div className='prevbutton'>
        {prevURL && <Button onClick={handlePrev}>Previous</Button>}
      </div>
      <div className='nextbutton'>
        {nextURL && <Button onClick={handleNext}>Next</Button>}
      </div>
    </div>
    <div id='card' className='card2'>
        {FormDataAllListings.map((propertyInfo) => (
            <CardComponentHAllListings value={propertyInfo}/>
        ))}
    </div>
    
    </>
  )
}

export default AllListings
