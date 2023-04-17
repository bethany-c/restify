/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, useContext } from 'react';
import ImageDisplay from '../../components/modals/ImageDisplay'
import AmenitiesModal from '../../components/modals/AmenitiesModal';
import ReservationCard from '../../components/Card/ReservationCard';
import CommentsModal from '../../components/modals/CommentsModal';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import NavbarSO from '../../components/Navbar';
import { BsStarFill, BsPersonFill } from 'react-icons/bs'
import AuthContext from '../../context';


const PropertyInfo = (props) => {

  const {state} = useLocation();
  const host = state.property_owner
  const { token } = useContext(AuthContext);
  const { isloggedIn } = useContext(AuthContext);

  const [username, setUsername] = useState(null)
  const [allComments, setAllComments] = useState([])
  const [allRatings, setAllRatings] = useState([])


  useEffect(() => {
    // console.log('state is ', state)
    getLoggedInUser()
    getComments()
    getRatings()
  }, [])

  useEffect(() => {
    console.log('all ratings i s', allRatings)
  }, [allRatings])

  const getLoggedInUser = () => {
    fetch('http://localhost:8000/webpages/profile/view/', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token['token']
      },
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('tis is login data', data)
      if(!data.username) {
        // console.log('no username')
        setUsername(null)
      } else {
        // console.log('i am logged in')
        setUsername(data.username)
      }
    })
  }

  const getComments = () => {
    fetch('http://localhost:8000/webpages/reservations/property/' + state.id + '/property-comments/view/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token['token']
      },
    })
    .then((res) => res.json())
    .then((data) => {
      // console.log('this is the data ', data)
      setAllComments(data)
    })
  }

  const getRatings = () => {
    fetch('http://localhost:8000/webpages/rating/' + state.id + '/list/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token['token']
      },
    })
    .then((res) => res.json())
    .then((data) => {
      // console.log('this is the ratings ', data)
      setAllRatings(data)
    })
  }

  const getAverage = () => {
    if(!allRatings) {
      return
    }
    const ratings = allRatings.map(rating => {return rating.rating})
    var total = ratings.reduce((a, b) => a + b, 0)
    var ave = total/ratings.length
    return ave.toFixed(2)
  }


  // const renderImagePreview = () => (
  //   <div className='row property-imgs'>
  //     <div className="col-sm-12 col-md-6 left-img">
  //       <div className="img-container">
  //         <img className="img-fluid w-100 center-img" src={ propertyInfo.imgs[0]} alt="image1"/>
  //       </div> 
  //     </div>
  //     <div className='col-sm-12 col-md-6 right-img'>
  //       <div className='relative-position'>
  //         <img src={ propertyInfo.imgs[1] } alt='image2' className="img-fluid w-100 center-img"/>
  //         <ImageDisplay images={ propertyInfo.imgs }/>
  //       </div>
  //     </div>
  //   </div>
  // )

  const renderPropertyDetails = () => (
    <>
      <div className="property-details">
        <h3>{ state.address }</h3>
        <p>{ state.number_of_rooms } bedrooms
          <span> &#8226; </span>
          { state.number_of_bed } beds
          <span> &#8226; </span>
          { state.baths } bathrooms</p>
        <p>Accomodates up to { state.number_of_guest } guests</p>
      </div>
      <hr/>
    </>
  )

  const renderDescription = () => {
    <>
    <h5>About the place:</h5>
      <p>{ state.description }</p>
    </>
  }

  const renderHost = () => (
    <>
      <h6 id="rating-link">Questions?</h6>
        <p>Contact { host.username } by 
          { host.email && host.phone_number && (
            <>
              <a href={`mailto:${host.email}`}> { host.email }</a>
              <span> or </span>
              <a href={`tel:${host.phone_number}`}>{ host.phone_number }</a>
            </>
          )}

          { host.email && !host.phone_number && (
            <a href={`mailto:${host.email}`}> { host.email }</a>
          )}

          { !host.email && host.phone_number && (
            <a href={`tel:${host.phone_number}`}> { host.phone_number }</a>
          )}
        </p>
    </>
  )

  const renderReservationCard = () => (
    <div className='col-md-5 col-sm-12'>
      <ReservationCard
        propertyInfo={ state }
      />
    </div>
  )

  const renderAmenities = () => (
    <>
      <div className='view-amenities-btn'>
        <AmenitiesModal 
          essentials={ state.essentials }
          features={ state.features }
          location={ state.location }
          safety={ state.safety_features }
          address={ state.address }
        />
      </div>
    </>
  )

  const renderAmenitiesPreview = () => {
    let allAmenities = [...state.essentials, ...state.features, ...state.location, ...state.safety_features]
    return (
      <>
        <h5>Amenities</h5>
        <div>
          { allAmenities.slice(0, 9).map((amenity, index) => {
        
            if(index % 2 === 0) {
              return (
                <div className='row'>
                  <div className="col-md-6 col-sm-12">
                    <span>&#8226; </span>{ (amenity.replace('_', ' ')) }
                  </div>
                  { allAmenities[index + 1] && (
                    <div className="col-md-6 col-sm-12">
                      <span>&#8226; </span>{ allAmenities[index+1].replace('_', ' ') }
                    </div>
                  )}
                </div>
              )
            } else { return null }
          })}
        </div>
      </>
    )
  }



  const renderReviews = () => (
    <>
      <h4 className="line-left-align" id="all-property-reviews">
        Reviews
        <p className="mb-2 rating-right-align purple-color"><BsStarFill/>{ getAverage() }</p>
      </h4>
      <div className='comment-container row'>
      { allComments.filter(comment => comment.reply === 'Original Property Comment').map((comment, index) => {

        const twoSentences = comment.text_content.split('.').slice(0, 2).join('. ') + (comment.text_content.split('.').length > 2 ? 
       '... see more': '')
        return (
          <div className="col-sm-12 col-md-6 comment-card">
            <p className="line-left-align">
              <h5><BsPersonFill/>{ comment.author }</h5>
              {/* <p className="mb-2 line-right-align purple-color"><BsStarFill/>{ comment.rating }</p> */}
            </p>
            <span>{ twoSentences }</span>
          </div>
        );
        }).slice(0, 6)}


      </div>
    </>
  )

  return (
    <>
      <div className="property-info-container">
        {/* { renderImagePreview() } */}

        {/* <div className="property-details">
          <h3>{ state.address }</h3>
          <p>{ state.number_of_rooms } bedrooms
            <span> &#8226; </span>
            { state.number_of_bed } beds
            <span> &#8226; </span>
            { state.baths } bathrooms</p>
          <p>Accomodates up to { state.number_of_guest } guests</p>
        </div>
        <hr/> */}
        { renderPropertyDetails() }

        <div className='row'>
          <div className="col-md-7 col-sm-12">
            { renderAmenitiesPreview() }
            {/* <div className='view-amenities-btn'>
              <AmenitiesModal 
              essentials={ state.essentials }
              features={ state.features }
              location={ state.location }
              safety={ state.safety_features }
              address={ state.address }
              />
            </div> */}
            { renderAmenities() }
            {/* <h5>About the place:</h5>
            <p>{ state.description }</p> */}
            { renderDescription() }
            {/* <h6 id="rating-link">Questions?</h6>
            <p>Contact { host.username } by
              <span> or </span>
              <a href={ `tel:${ host.phone_number }` }>{ host.phone_number }</a>
            </p> */}
            { renderHost() }
          </div>

          {/* <div className='col-md-5 col-sm-12'>
            <ReservationCard propertyInfo={ state }/>
          </div> */}
          { renderReservationCard() }
        </div>
        <hr className="sticky-line"></hr>

        {/* Commented out reviews */}
        { renderReviews() }
        
        <CommentsModal 
          allComments={ allComments }
          username={ username }
          hostUsername={ host.username }
          getComments={ getComments }
          getRatings={ getRatings }
          allRatings={ allRatings }
        />
      </div>
    </>
  )
}

export default PropertyInfo;