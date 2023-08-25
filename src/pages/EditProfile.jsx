import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import {
  getUserProfileImageUrl,
  updateUserDocumentProfileImage,
} from '../firebase';
import avatar from '../assets/profileavatar.png';

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
	const [pickedImage, setPickedImage] = useState(null);


  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (user) {
      // Fetch the user data from Firestore using the user's UID
      // getUserDocument(user.uid)
      //   .then((userData) => {
      //     setLocation(userData.location || '');
      //     setBio(userData.bio || '');
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

  return (
    <Container>
      <div>Edit profile</div>
      <Row>
        <Col>
          <div>
						{isLoading ? (
							<Image
							className="profileimage"
							src={avatar}
							roundedCircle
						/>
						) : (
							<Image
							className="profileimage"
							src={profileImage}
							roundedCircle
						/>
						) 
						}
						<div>
          <form onSubmit={handleImageUpload}>
            <input type="file" onChange={handleImageChange} />
            <button type="submit">Update Profile Image</button>
          </form>
        </div>
          </div>
          <div>
            <div>username</div>
            <div>Change profile photo</div>
          </div>
        </Col>
        <Col>
          <div className="edit-input">
            <div className="edit-input-title">Bio</div>
            <div className="edit-input">
              <Form.Control type="text" />
            </div>
          </div>
          <div className="edit-input">
            <div className="edit-input-title">Business Name</div>
            <div className="edit-input">
              <Form.Control type="text" />
            </div>
          </div>
          <div className="edit-input">
            <div className="edit-input-title">Location</div>
            <div className="edit-input">
              <Form.Group>
                <Form.Label>Business Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Street Address</Form.Label>
                <Form.Control type="text" placeholder="" />
              </Form.Group>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="city" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Zip Code</Form.Label>
                <Form.Control type="text" placeholder="zip" />
              </Form.Group>
            </div>
          </div>
          <div className="edit-input">
            <div className="edit-input-title">Phone Number</div>
            <div className="edit-input">
              <Form.Control type="text" placeholder="13232" />
            </div>
          </div>
          <div className="edit-input">
            <div className="edit-input-title">Availability</div>
            <div className="edit-input"></div>
          </div>
          <div className="edit-input">
            <div className="edit-input-title">Services</div>
            <div className="edit-input"></div>
          </div>
          <div className="edit-input">
            <div className="edit-input-title">Photos</div>
            <div className="edit-input"></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
