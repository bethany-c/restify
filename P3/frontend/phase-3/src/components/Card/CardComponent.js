import './cardstyles.css'
import { React } from 'react';
import { Card, Button } from 'react-bootstrap';

export const CardComponent = (props) => {
  const {
    propertyID,
    image,
    title,
    description,
    price,
    totalPrice,
    viewBtn,
    topRightBtn
  } = props;

  // const onViewListing = (event) => {
  //   event.preventDefault()
  //   fetch('http://localhost:8000/webpages/' + propertyID + 'detail', {
  //     method: 'GET',
  //   })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data)
  //   })
  // }


  return (
    <div className='col-sm-12 col-md-6 col-lg-4 results-card'>
      <Card>
        <Card.Body>
          { topRightBtn }
          <Card.Img src={ image } alt='Listing image'></Card.Img>
          <Card.Title>{ title }</Card.Title>
          <Card.Text>{ description }</Card.Text>
          <Card.Text>
            <p className='card-left-align'>
                ${ price }/night
              <span className="card-right-align total-price">
                ${ totalPrice } total
              </span>
            </p>
          </Card.Text>
          <Button className="btn btn-primary" size='sm'>View Listing</Button>
        </Card.Body>
      </Card>
    </div>
  


  )

}

export default CardComponent;