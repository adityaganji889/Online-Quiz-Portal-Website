import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function LandingPage() {
  return (
    <Container fluid={true} className='register h-screen w-screen'>
       <Row className='d-flex justify-content-center align-items-center mx-5 pt-5 gx-5'>
        <Col md={6} className='d-flex align-items-center'  data-aos="fade-right">
            <div className='d-flex flex-column justify-content-center align-items-center gx-5'>
            <h1 className='d-flex align-self-start'>
                Quiz Portal
            </h1>
            <h5>Online quizzes are a good method to gauge your knowledge. Numerous websites provide online quizzes covering a range of topics and industries. Regardless of age, taking a quiz is always entertaining. It is an interesting approach to learn.</h5>
            <div className='d-flex align-self-start'>
            <Link className='btn btn-primary mt-5' to="/login">
                Let's get started
            </Link>
            </div>
            </div>
        </Col>
        <Col md={6} className='d-flex justify-content-center align-items-center my-4'  data-aos="fade-left">
         <div className='d-flex justify-content-center'>
         <lottie-player src="https://lottie.host/2c5cd61f-8c64-4fff-a6d4-785593c2356d/T1fG6nMS73.json"  background="#9599E2"  speed="1"  style={{width:"100%",height:"100%"}}  loop  autoplay></lottie-player>
         </div>
        </Col>
       </Row>
    </Container>
  )
}

export default LandingPage