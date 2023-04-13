/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import ImageDisplay from '../../components/modals/ImageDisplay'
import AmenitiesModal from '../../components/modals/AmenitiesModal';
import ReservationCard from '../../components/Card/ReservationCard';
import './style.css'

const PropertyInfo = (props) => {
  const {
    propertyInfo, // called from property/<int:pk>/detail/
    host // called from profile/view/
  } = props;


  const renderImagePreview = () => (
    <div className='row property-imgs'>
      <div className="col-sm-12 col-md-6 left-img">
        <div className="img-container">
          <img className="img-fluid w-100 center-img" src={ propertyInfo.imgs[0]} alt="image1"/>
        </div> 
      </div>
      <div className='col-sm-12 col-md-6 right-img'>
        <div className='relative-position'>
          <img src={ propertyInfo.imgs[1] } alt='image2' className="img-fluid w-100 center-img"/>
          <ImageDisplay images={ propertyInfo.imgs }/>
        </div>
      </div>
    </div>
  )

  const renderPropertyDetails = () => (
    <>
      <div className="property-details">
        <h3>{ propertyInfo.address }</h3>
        <p>{ propertyInfo.number_of_rooms } bedrooms
          <span> &#8226; </span>
          { propertyInfo.number_of_bed } beds
          <span> &#8226; </span>
          { propertyInfo.baths } bathrooms</p>
        <p>Accomodates up to { propertyInfo.number_of_guest } guests</p>
      </div>
      <hr/>
    </>
  )

  const renderDescription = () => {
    <>
    <h5>About the place:</h5>
      <p>{ propertyInfo.description }</p>
    </>
  }

  const renderHost = () => (
    <>
      <h6 id="rating-link">Questions?</h6>
        <p>Contact { host.username } by
        <a href={ `mailto:${ host.email }` }>{ host.email }</a>
          <span> or </span>
          <a href={ `tel:${ host.phone }` }>{ host.phone }</a>
        </p>
    </>
  )

  const renderReservationCard = () => (
    <div class='col-md-5 col-sm-12'>
      <ReservationCard
        propertyInfo={ propertyInfo }
      />
    </div>
  )

  const renderAmenities = () => (
    <>
      <div className='view-amenities-btn'>
        <AmenitiesModal 
          essentials={ propertyInfo.essentials }
          features={ propertyInfo.features }
          location={ propertyInfo.location }
          safety={ propertyInfo.safety_features }
        />
      </div>
    </>
  )

  return (
    <div className="property-info-container">
      {/* { renderImagePreview } */}
      { renderPropertyDetails }
      <div class='row'>
        <div class="col-md-7 col-sm-12">
          { renderAmenities }
          { renderDescription }
          { renderHost }
        </div>

        <div class='col-md-5 col-sm-12'>
          <ReservationCard propertyInfo={ propertyInfo }/>
        </div>
      </div>

      {/* Commented out reviews */}
      

    </div>
  )
}

export default PropertyInfo;