/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import ImageDisplay from '../../components/modals/ImageDisplay'
import AmenitiesModal from '../../components/modals/AmenitiesModal';
import ReservationCard from '../../components/Card/ReservationCard';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import NavbarSO from '../../components/Navbar';

const PropertyInfo = (props) => {

  const {state} = useLocation();
  const host = state.property_owner




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
        <a href={ `mailto:${ host.email }` }>{ host.email }</a>
          <span> or </span>
          <a href={ `tel:${ host.phone_number }` }>{ host.phone_number }</a>
        </p>
    </>
  )

  const renderReservationCard = () => (
    <div class='col-md-5 col-sm-12'>
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
        />
      </div>
    </>
  )

  return (<>
    <NavbarSO />
    <div className="property-info-container">
      {/* { renderImagePreview() } */}

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
      <div class='row'>
        <div class="col-md-7 col-sm-12">
          <div className='view-amenities-btn'>
            <AmenitiesModal 
            essentials={ state.essentials }
            features={ state.features }
            location={ state.location }
            safety={ state.safety_features }
            address={ state.address }
            />
          </div>
          <h5>About the place:</h5>
          <p>{ state.description }</p>
          <h6 id="rating-link">Questions?</h6>
          <p>Contact { host.username } by
            <a href={ `mailto:${ host.email }` }>{ host.email }</a>
            <span> or </span>
            <a href={ `tel:${ host.phone_number }` }>{ host.phone_number }</a>
          </p>
        </div>

        <div class='col-md-5 col-sm-12'>
          <ReservationCard propertyInfo={ state }/>
        </div>
      </div>

      {/* Commented out reviews */}
      

    </div>
    </>
  )
}

export default PropertyInfo;