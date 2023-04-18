import {React, useEffect, useState, useContext} from 'react'
import '../../../dashboard-Content/contentstyle.css'
import CardComponentD from '../../../Card/CardDashboard/Card';
import AuthContext from '../../../../context';
import '../user-approved/approvedstyle.css'
import {Button} from 'react-bootstrap'



const Requested = () => {

    const [formDataRequested, setFormDataRequested] = useState([]);
    const { token } = useContext(AuthContext)
    const [refresh, setRefresh] = useState(0)
    const [nextURL, setNextUrl] =useState('')
    const [prevURL, setPrevURL] = useState('')
    const [pagination, setPagination] = useState(false)

    useEffect(() => {
      fetchRequested()
    }, []);
    
    const fetchRequested = (url = "http://localhost:8000/webpages/reservations/requested/") => {
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
            console.log('brother in jesus array', data);
            setFormDataRequested(data);

          }
          else {
            console.log('brother in jesus dict', data);
            setFormDataRequested(data.results);
            setNextUrl(data.next)
            setPrevURL(data.previous)
            setPagination(true)
          }

  
  
        })
        .catch((error) => console.error(error));
    }



    // useEffect(() => {
    //     // Send formDataLogin to backend API via POST request
    //     fetch("http://localhost:8000/webpages/reservations/requested/", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization" : "Bearer " + token['token'],
    //       },
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         if (Array.isArray(data)) {
    //         console.log('brother in christ array',data);
    //         setFormDataRequested(data);
    //         }
    //         else {
    //           console.log('brother in christ dict',data.results);
    //           setFormDataRequested(data.results);

    //         }
    
    
    //       })
    //       .catch((error) => console.error(error));
        
        
    //     }, [refresh]);

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
            // this is to refresh the page and show the change immidietely 
            setRefresh(5)

          })
          .catch((error) => console.error(error));


      }
      const text = "Cancel Your Reservation"
    // Fetch cancellations data for next page
  const handleNext = () => {
    fetchRequested(nextURL);
    setPagination(false)
  };

  // Fetch cancellations data for previous page
  const handlePrev = () => {
    fetchRequested(prevURL);
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
        {formDataRequested.map((propertyInfo) => (
            <CardComponentD value={propertyInfo} button={{ handleC, text }}/>
        ))}
    </div>
  </>
  )
}

export default Requested