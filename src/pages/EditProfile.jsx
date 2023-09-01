import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import {
  getUserProfileImageUrl,
  updateUserDocumentProfileImage,
	getUserDocument,
	updateUserDocumentField,
} from '../firebase';
import avatar from '../assets/profileavatar.png';


const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [pickedImage, setPickedImage] = useState(null);
  const [bio, setBio] = useState('');
	const [business, setBusiness] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [phone, setPhone] = useState('');
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (user) {
      // Fetch the user data from Firestore using the user's UID
      // getUserDocument(user.uid)
      //   .then((userData) => {
      //     setBio(userData.bio || '');
			// 		setBusiness(userData.business || '');
      //     setAddress(userData.address || '');
      //     setCity(userData.city || '');
      //     setState(userData.state || '');
      //     setZip(userData.zip || '');
			// 		setPhone(userData.phone || '');
      //     setServices(userData.services || [{ name: '', price: 0 }]);
      //     setIsLoading(false);
      //   })
      //   .catch((error) => {
      //     console.error('Error fetching user data:', error);
      //     setIsLoading(false);
      //   });

      // Fetch the user's profileImageUrl and update the profileImage state
      fetchUserProfileImageUrl(user.uid);
    }
  }, [user]);

  // Image Update

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPickedImage(file || ''); // Set the initial value to an empty string
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!pickedImage) return;

    try {
      const imageUrl = await updateUserDocumentProfileImage(
        user.uid,
        pickedImage
      );
      console.log('Profile image uploaded successfully!');
      console.log('Profile image URL:', imageUrl);
      setUser({ ...user, profileImageUrl: imageUrl });
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  // Profile Update

	const handleSubmit = (e) => {
    e.preventDefault();
    handleProfileUpdate();
  };

  const handleProfileUpdate = async (e) => {
    // e.preventDefault();
    console.log('button pressed');
		await updateUserDocumentField(user.uid, 'bio', bio);
		await updateUserDocumentField(user.uid, 'business', business);
		await updateUserDocumentField(user.uid, 'address', address);
		await updateUserDocumentField(user.uid, 'city', city);
		await updateUserDocumentField(user.uid, 'state', state);
		await updateUserDocumentField(user.uid, 'zip', zip);
		await updateUserDocumentField(user.uid, 'phone', phone);
  };

  return (
    <Container>
      <div>Edit profile</div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={4} md={3}>
            {isLoading ? (
              <Image className="profileimage" src={avatar} roundedCircle />
            ) : (
              <Image
                className="edit-profile-image"
                src={profileImage}
                roundedCircle
              />
            )}
          </Col>
          <Col xs={8} md={6}>
            <div>
              <div>Username</div>
							<Form.Group>Profile Photo
  <Form.Control
    type="file"
    onChange={handleImageChange}
  />
</Form.Group>
            </div>
          </Col>
        </Row>
        <Row>
          <Form.Group>
            <div>
              <Form.Label>Bio</Form.Label>
            </div>
            <div>
              <Form.Control onChange={(e) => setBio(e.target.value)}
 placeholder={bio} as="textarea"></Form.Control>
            </div>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <div>
              <Form.Label>Business Name</Form.Label>
            </div>
            <div>
              <Form.Control onChange={(e) => setBusiness(e.target.value)} placeholder={business}></Form.Control>
            </div>
          </Form.Group>
          <Form.Group>
            <div>
              <Form.Label>Address</Form.Label>
            </div>
            <div>
              <Form.Control onChange={(e) => setAddress(e.target.value)} placeholder={address}></Form.Control>
            </div>
          </Form.Group>
          <Form.Group>
            <div>
              <Form.Label>City</Form.Label>
            </div>
            <div>
              <Form.Control onChange={(e) => setCity(e.target.value)} placeholder={city}></Form.Control>
            </div>
          </Form.Group>
          <Form.Group>
            <div>
              <Form.Label>State</Form.Label>
            </div>
            <div>
              <Form.Control onChange={(e) => setState(e.target.value)} placeholder={state}></Form.Control>
            </div>
          </Form.Group>
          <Form.Group>
            <div>
              <Form.Label>Zip Code</Form.Label>
            </div>
            <div>
              <Form.Control onChange={(e) => setZip(e.target.value)} placeholder={zip}></Form.Control>
            </div>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <div>
              <Form.Label>Phone Number</Form.Label>
            </div>
            <div>
              <Form.Control onChange={(e) => setPhone(e.target.value)} placeholder={phone}></Form.Control>
            </div>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default EditProfile;
