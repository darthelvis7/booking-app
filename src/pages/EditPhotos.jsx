import React, { useState, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../UserContext';
import Form from 'react-bootstrap/Form';
import { getUserDocument, uploadMultiplePhotos } from '../firebase'

const EditPhotos = () => {
  const { user } = useContext(UserContext);
	const [downloadUrls, setDownloadUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


	const [selectedFiles, setSelectedFiles] = useState([]); // Initialize selectedFiles as an empty array

	const handleImageChange = (e) => {
		const files = e.target.files;
		setSelectedFiles([...selectedFiles, ...files]); // Use the spread operator to concatenate new files to the existing array
	};

	const handleImageUpload = async () => {
    setIsLoading(true);
    try {
      const urls = await uploadMultiplePhotos(user.uid, selectedFiles);
      setDownloadUrls(urls);
      setIsLoading(false);
    } catch (error) {
      console.error('Error uploading photos:', error);
      setIsLoading(false);
    }
  };

	useEffect(() => {
    if (user) {
      // Fetch the user data from Firestore using the user's UID
      getUserDocument(user.uid)
        .then((userData) => {
          setDownloadUrls(userData.photos || []);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoading(false);
        });
    }
  }, [user]);


	return (
    <div>
      <div>Edit Photos</div>
      <div>Add new photos</div>
      <Form.Group>
        <Form.Control type="file" multiple onChange={handleImageChange} />
        <Button
          onClick={handleImageUpload}
          variant="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload Photos'}
        </Button>
      </Form.Group>

      {downloadUrls.length > 0 && (
        <div>
          <h4>Uploaded Photos:</h4>
          <ul>
            {downloadUrls.map((url, index) => (
              <li key={index}>
                <img src={url} alt={`Uploaded ${index + 1}`} width="100" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EditPhotos;
