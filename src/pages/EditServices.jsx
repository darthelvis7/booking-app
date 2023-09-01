import {React, useState, useEffect, useContext} from 'react';
import { UserContext } from '../UserContext';
import {
  // updateUserDocumentLocation,
  // updateUserDocumentBio,
  updateUserDocumentServices,
  removeServiceFromUserDocument,
	getUserDocument
  // updateUserDocumentProfileImage,
} from '../firebase';

const EditServices = () => {

	const { user, setUser } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true); // Add loading state



	const [services, setServices] = useState([{ name: '', description: '', price: 0 }]);

	useEffect(() => {
    if (user) {
      // Fetch the user data from Firestore using the user's UID
      getUserDocument(user.uid)
        .then((userData) => {
          // setLocation(userData.location || '');
          // setBio(userData.bio || '');
          setServices(userData.services || [{ name: '', description: '', price: 0 }]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoading(false);
        });

      // Fetch the user's profileImageUrl and update the profileImage state
      // fetchUserProfileImageUrl(user.uid);
    }
  }, [user]);

	const handleServiceAdd = () => {
    // Add a new service object with empty name and price to the services state
    setServices([...services, { name: '', description: '', price: 0 }]);
  };

  const handleServiceChange = (index, field, value) => {
    setServices((prevServices) => {
      const updatedServices = [...prevServices];
      updatedServices[index][field] = value;
      return updatedServices;
    });
  };

  const handleServiceRemove = async (index) => {
    const removedService = services[index];
    setServices((prevServices) => {
      const updatedServices = [...prevServices];
      updatedServices.splice(index, 1);
      return updatedServices;
    });
    try {
      await removeServiceFromUserDocument(user.uid, removedService);
      console.log('Service removed successfully!');
    } catch (error) {
      console.error('Error removing service:', error);
    }
  };

  const handleServicesUpdate = async () => {
    try {
      await updateUserDocumentServices(user.uid, services);
      console.log('Services updated successfully!');
      console.log(services);
    } catch (error) {
      console.error('Error updating services:', error);
    }
  };

	return (
		<div>
			<div>
        <h1>Update Services</h1>
        {services.map((service, index) => (
          <div key={index}>
            <input
              type="text"
              value={service.name}
              onChange={(e) =>
                handleServiceChange(index, 'name', e.target.value)
              }
              placeholder="Service name"
            />
						 <input
              type="text"
              value={service.description}
              onChange={(e) =>
                handleServiceChange(index, 'description', e.target.value)
              }
              placeholder="Service description"
            />
            <input
              type="number"
              value={service.price}
              onChange={(e) =>
                handleServiceChange(index, 'price', parseFloat(e.target.value))
              }
              placeholder="Price"
            />
            <button onClick={() => handleServiceRemove(index)}>Remove</button>
          </div>
        ))}
        <button onClick={handleServiceAdd}>Add Service</button>
        <button onClick={handleServicesUpdate}>Update Services</button>
      </div>
		</div>
	)
}

export default EditServices