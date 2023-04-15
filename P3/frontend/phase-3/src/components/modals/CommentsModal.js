import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { BsStarFill, BsFillFilePersonFill, BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import './style.css'

const CommentsModal = (props) => {
  const {
    allComments
  } = props;

  const [showModal, setShowModal] = useState(false)
  const [total, setTotal] = useState()
  const [allReviews, setAllReviews] = useState([])
  const replyOrder = ['Original Property Comment', 'Host Property Reply', 'User Property Reply']
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(5);

  const totalPages = Math.ceil(allReviews.length / pagination);

  const start = (page - 1) * pagination;
  const end = start + pagination;

  const handleShow = () => setShowModal(true)
  const handleHide = () => setShowModal(false)
  const handleNextPage = () => { setPage(page + 1) }
  const handlePrevPage = () => { setPage(page - 1) }


  useEffect(() => {
    if(allComments) {
      formatComments()
    }
  }, [allComments])

  const formatComments = () => {
    const sorted = allComments.reduce((acc, comment) => {
      const reservation = comment.reservation
      let reserveArr = acc.find((arr) => arr[0].reservation === reservation)
    
      if (!reserveArr) { // create new array if doesn't exist
        reserveArr = []
        acc.push(reserveArr)
      }
      reserveArr.push(comment)
    
      reserveArr.sort((a, b) => {
        return replyOrder.indexOf(a.reply) - replyOrder.indexOf(b.reply)
      });
      console.log('formatted to ', acc)
      return acc;
    }, [])
    
    setAllReviews(sorted)
  }

  const renderAllComments = () => {
    return allReviews.slice(start, end).map((reserveArr) => (
      <>
        <div className='col-12'>
          
          { replyOrder.map((reply) => {
            const replyObj = reserveArr.find((o) => o.reply === reply)
            if(replyObj && reply === replyOrder[0]) {
              return (
                <>
                <p className="line-left-align">
                  <h5><BsFillFilePersonFill/>{ replyObj.author }</h5>
                </p>
                <span>{ replyObj.text_content }</span>
                </>
              )
            } else if(replyObj) {
              return (
                <>
                  <div className="comment-reply">
                    <h6><BsFillFilePersonFill/>{ replyObj.author }</h6>
                      <span>{ replyObj.text_content }</span>
                    </div>
                </>
              )
            } else {
              return null;
            }
          })}
        </div>  
        <hr/>
      </>
    ));
  };
    

  

  return (
    <>
      <Button className="filter-button" variant='outline-secondary' onClick={ handleShow }>
        All Reviews
      </Button>

      <Modal show={ showModal } onHide={ handleHide }>
        <Modal.Header closeButton>
          <Modal.Title>All Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { renderAllComments() }
          <div className='row'>

            <div className='col-auto'>
              <Button 
                variant='outline-secondary'
                size='sm'
                className='rounded-circle mx-3'
                onClick={ () => handlePrevPage() }
                disabled={ page === 1 ? true : false }
              >
                <BsArrowLeft/>
              </Button> 
            </div>

            <div className='col-auto'>
              <span>{ page } / { totalPages }</span>
            </div>
            <div className='col-auto'>
              <Form.Select onChange={ (e) => setPagination(e.target.value) } className='pagination-bar'>
                <option value='3'>3</option>
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='15'>20</option>
              </Form.Select>
            </div>

            <div className='col-auto'>
              <Button 
                variant='outline-secondary'
                size='sm'
                className='rounded-circle'
                onClick={ () => handleNextPage() }
                disabled={ page === totalPages ? true : false }
              >
                <BsArrowRight/>
              </Button>
            </div>
            
          </div>
        </Modal.Body>
      </Modal>


    </>
  )

}

export default CommentsModal