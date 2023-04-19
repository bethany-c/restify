import {React, useEffect, useState, useContext} from 'react'
// import '../../dashboard-Content/contentstyle.css';
// import '../../../dashboard-Content/contentstyle.css'
// import CardComponentD from '../../../Card/CardDashboard/Card';
// import CardComponentD from '../../../Card/CardDashboard/Card';
import CardComponentHC from '../../../Card/CardDashboard/CardHostCancellations';
import CardComponentHRequested from '../../../Card/CardDashboard/CardHostRequested';
import AuthContext from '../../../../context';
import { Button } from 'react-bootstrap';
import '../../../dashboard-Content/contentstyle.css'

const HostRequested = () => {

    const [FormDataHostRequested, setFormDataHostRequested] = useState([]);
    const { token } = useContext(AuthContext)
    const [refresh, setRefresh] = useState(0)
    const [nextURL, setNextUrl] =useState('')
    const [prevURL, setPrevURL] = useState('')
    const [pagination, setPagination] = useState(false)

    useEffect(() => {
      fetchHostCancellations()
    }, []);

    const fetchHostCancellations = (url = "http://localhost:8000/webpages/listings/requested/") => {
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
            console.log('brother in requested array', data);
            setFormDataHostRequested(data);

          }
          else {
            console.log('brother in requested dict', data);
            setFormDataHostRequested(data.results);
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
    //           setFormDataHostRequested(data);

    //         }
    //         else {
    //           console.log(data.results, 'dict response');
    //           setFormDataHostRequested(data.results);

    //         }
    //       })
    //       .catch((error) => console.error(error));
        
        
    //     }, [refresh]);
    


    const handleApprove = (reservationId) => {
        fetch("http://localhost:8000/webpages/" + reservationId + "/approve/", {
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
    const handleDeny = (reservationId) => {
        fetch("http://localhost:8000/webpages/" + reservationId + "/deny/", {
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

    

  // Fetch cancellations data for next page
  const handleNext = () => {
    fetchHostCancellations(nextURL);
    setPagination(false)
  };

  // Fetch cancellations data for previous page
  const handlePrev = () => {
    fetchHostCancellations(prevURL);
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
        {FormDataHostRequested.map((propertyInfo) => (
            <CardComponentHRequested value={propertyInfo} button={{handleApprove, handleDeny}}/>
        ))}
    </div>
    
    </>
  )
}

export default HostRequested 


