import { React, useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import {
  getUserProfileImageUrl,
  getUserDocument,
} from '../firebase';
import avatar from '../assets/profileavatar.png';

import { UserContext } from '../UserContext';

const Profile = () => {
  const { user } = useContext(UserContext);
  const [bio, setBio] = useState(null);
  const [business, setBusiness] = useState(null);
  const [address, setAddress] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [zip, setZip] = useState(null);
  const [phone, setPhone] = useState(null);
  // const [services, setServices] = useState([{ name: '', description: '', price: 0 }]);
  const [services, setServices] = useState([]);
  const [availability, setAvailability] = useState({
    sunday: { startTime: '', endTime: '' },
    monday: { startTime: '', endTime: '' },
    tuesday: { startTime: '', endTime: '' },
    wednesday: { startTime: '', endTime: '' },
    thursday: { startTime: '', endTime: '' },
    friday: { startTime: '', endTime: '' },
    saturday: { startTime: '', endTime: '' },
  });
  const [profileImage, setProfileImage] = useState(null);
	const [isLoading, setIsLoading] = useState(true); // Add loading state


	const navigate = useNavigate();

	const editProfile = () => {
		navigate('/editprofile')
	};

  const editServices = () => {
		navigate('/editservices')
	};

  const editAvailability = () => {
    navigate('/editAvailability')
  };

  const editPhotos = () => {
    navigate('/editPhotos')
  };

	useEffect(() => {
    if (user) {
      // Fetch the user data from Firestore using the user's UID
      getUserDocument(user.uid)
        .then((userData) => {
          // setLocation(userData.location || '');
          setBio(userData.bio || '');
          setBusiness(userData.business || '');
          setAddress(userData.address || '');
          setCity(userData.city || '');
          setState(userData.state || '');
          setZip(userData.zip || '');
          setPhone(userData.phone || '');
          setAvailability(userData.availability || {
						sunday: { startTime: '', endTime: '' },
						monday: { startTime: '', endTime: '' },
						tuesday: { startTime: '', endTime: '' },
						wednesday: { startTime: '', endTime: '' },
						thursday: { startTime: '', endTime: '' },
						friday: { startTime: '', endTime: '' },
						saturday: { startTime: '', endTime: '' },
					});
          setServices(userData.services || []);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoading(false);
        });

      // Fetch the user's profileImageUrl and update the profileImage state
      fetchUserProfileImageUrl(user.uid);
    }
  }, [user]);

	const fetchUserProfileImageUrl = async (userId) => {
    try {
      const profileImageUrl = await getUserProfileImageUrl(userId);
      setProfileImage(profileImageUrl);
      setIsLoading(false); // Set loading state to false once the image is fetched
    } catch (error) {
      console.error('Error fetching profile image:', error);
      setIsLoading(false); // Set loading state to false in case of an error
    }
  };

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
                className="profileimage"
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
          <div>Bio</div>
          <div>
           {bio}
          </div>
					</div>
        </Col>
      </Row>
			<Row className='second-row'>
				<Col xs={6} md={5}>
					 <div>Location</div>
					 <div>{business}</div>
					 <div>{address}</div>
					 <div>{`${city}, ${state}                                                                       ${zip}`}</div>
					 <div>{phone}</div>
				</Col>
        <Col xs={6}>
  <Button onClick={editAvailability} variant='primary'>Edit Availability</Button>
  <div>Business Hours</div>
  <div>MONDAY {availability.monday.start && availability.monday.end ? `${availability.monday.start} to ${availability.monday.end}` : 'Closed'}</div>
  <div>TUESDAY {availability.tuesday.start && availability.tuesday.end ? `${availability.tuesday.start} to ${availability.tuesday.end}` : 'Closed'}</div>
  <div>WEDNESDAY {availability.wednesday.start && availability.wednesday.end ? `${availability.wednesday.start} to ${availability.wednesday.end}` : 'Closed'}</div>
  <div>THURSDAY {availability.thursday.start && availability.thursday.end ? `${availability.thursday.start} to ${availability.thursday.end}` : 'Closed'}</div>
  <div>FRIDAY {availability.friday.start && availability.friday.end ? `${availability.friday.start} to ${availability.friday.end}` : 'Closed'}</div>
  <div>SATURDAY {availability.saturday.start && availability.saturday.end ? `${availability.saturday.start} to ${availability.saturday.end}` : 'Closed'}</div>
  <div>SUNDAY {availability.sunday.start && availability.sunday.end ? `${availability.sunday.start} to ${availability.sunday.end}` : 'Closed'}</div>
</Col>
				<Col className='services-col' xs={10} md={6}>
					<div className='info-title'>Services</div>
          <div>
          <div>
            <Button onClick={editServices} variant="primary">Edit Services</Button>
          </div>
      {services.length === 0 ? (
        <div>You currently don't offer any services</div>
      ) : (
        <ListGroup>
          {services.map((service, index) => (
            <ListGroup.Item key={index}>
              <div className='service'>
                <div className='service-title-description'>
                  <div className='service-title'>{service.name}</div>
                  <div className='service-description'>{service.description}</div>
                </div>
                <div className='service-price'>{service.price}</div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        
      )}
      </div>	
				</Col>
			</Row>
			<Row className='third-row'>
				<div>Photos</div>
        <div>
          <Button onClick={editPhotos} >Edit Photos</Button>
        </div>
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
