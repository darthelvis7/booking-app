import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


const Home = () => {
	return (
		<Container>
			<Row>
				<Col xs={12} md={8}>
					<Row>
      			<h1 className="main-heading display-md-1">Welcome to Booking App</h1>
						<h1 className="main-heading2 display-md-1">Experience Total Schedule Authority, Verify Appointments, and Spotlight Your Services.</h1>
						<div className='signup'>
						<Button className='signup-button' variant='dark'>Sign Up</Button>
						<div className='signup-text'>
						<p className='singup-text'>Alreaday have an account? <Link to="/signin">Sign In</Link></p>
						</div>
					</div>
					</Row>
				</Col>
			</Row>
		</Container>
	)
}

export default Home;