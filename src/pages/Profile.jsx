import { React, useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';



import me from '../assets/elviscropped.png';
import avatar from '../assets/profileavatar.png';

import { UserContext } from '../UserContext';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [profileImage, setProfileImage] = useState(null);

	const navigate = useNavigate();

	const editProfile = () => {
		navigate('/editprofile')
	};


  // useEffect(() => {
  //   if (user) {
  //     // Fetch the user data from Firestore using the user's UID
  //     getUserDocument(user.uid)
  //       .then((userData) => {
  //         setLocation(userData.location || '');
  //         setBio(userData.bio || '');
  //         setServices(userData.services || [{ name: '', price: 0 }]);
  //         setIsLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching user data:', error);
  //         setIsLoading(false);
  //       });

  //     // Fetch the user's profileImageUrl and update the profileImage state
  //     fetchUserProfileImageUrl(user.uid);
  //   }
  // }, [user]);

  return (
    <Container className="profile-container">
      <Row className='first-row'>
        <Col xs={4} md={3}>
          <div className="profile-image-container">
            {profileImage ? (
              <Image
                className="profileimage"
                src={profileImage}
                roundedCircle
              />
            ) : (
              <Image
                className="profileimage img-fluid"
                src={avatar}
                roundedCircle
              />
            )}
          </div>
        </Col>
        <Col xs={8} md={6}>
					<div className='top-info'>
          <div className="profile-info">
            <div>
              <h2>{user.displayName}</h2>
            </div>
            <div className="profile-buttons">
              <div className="profile-button">
                <Button onClick={editProfile} variant="secondary">Edit Profile</Button>
              </div>
              <div className="profile-button">
                <Button variant="secondary">Settings</Button>
              </div>
            </div>
          </div>
          <div>About</div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint,
            suscipit fugit. Corrupti quibusdam tempora voluptas adipisci ab,
            assumenda alias culpa magni.
          </div>
					</div>
        </Col>
      </Row>
			<Row className='second-row'>
				<Col xs={6} md={5}>
					 <div>Location</div>
					 <div>Business Name</div>
					 <div>1111 Imagine Avenue</div>
					 <div>Los Angeles, CA 90810</div>
					 <div>111-111-1111</div>
				</Col>
				<Col xs={6}>
						<div>Business Hours</div>
						<div>Monday 9AM-1PM, 2PM-6PM</div>
						<div>Tuesday 9AM-1PM, 2PM-6PM</div>
						<div>Wednesday 9AM-1PM, 2PM-6PM</div>
						<div>Thursday 9AM-1PM, 2PM-6PM</div>
						<div>Friday 9AM-1PM, 2PM-6PM</div>
						<div>Saturday 9AM-1PM, 2PM-6PM</div>
						<div>Sunday 9AM-1PM, 2PM-6PM</div>
				</Col>
				<Col className='services-col' xs={10} md={6}>
					<div className='info-title'>Services</div>
					<ListGroup>
						<ListGroup.Item>
							<div className='service'>
								<div className='service-title-description'>
									<div className='service-title'>Basic Haircut</div>
									<div className='service-description'>Service description</div>
								</div>
								<div className='service-price'>$15</div>
							</div>
						</ListGroup.Item>
						<ListGroup.Item>
							<div className='service'>
								<div className='service-title-description'>
									<div className='service-title'>Haircut and Beard</div>
									<div className='service-description'>Service description</div>
								</div>
								<div className='service-price'>$30</div>
							</div>
						</ListGroup.Item>
						<ListGroup.Item>
							<div className='service'>
								<div className='service-title-description'>
									<div className='service-title'>Hair Color</div>
									<div className='service-description'>Service description</div>
								</div>
								<div className='service-price'>$50</div>
							</div>
						</ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>
			<Row className='third-row'>
				<div>Photos</div>
				<Col md={12} className="photo-column">
				<Image className='portfolio-photo' src={avatar} rounded />
				<Image className='portfolio-photo' src={avatar} rounded />
				<Image className='portfolio-photo' src={avatar} rounded />
				<Image className='portfolio-photo' src={avatar} rounded />
				<Image className='portfolio-photo' src={avatar} rounded />
				<Image className='portfolio-photo' src={avatar} rounded />
				<Image className='portfolio-photo' src={avatar} rounded />
				</Col>
			</Row>
    </Container>
  );
};

export default Profile;
