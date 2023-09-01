import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { Button } from 'react-bootstrap';
import TimePicker from '../components/TimePicker';
import { updateUserAvailability, getUserDocument } from '../firebase';

const EditAvailability = () => {
	const { user, setUser } = useContext(UserContext);

	const [userData, setUserData] = useState(null);


	const [isLoading, setIsLoading] = useState(true); // Add loading state


  const [timeInterval, setTimeInterval] = useState(30); // Default interval is 30 minutes

  const handleIntervalChange = (event) => {
    setTimeInterval(parseInt(event.target.value));
  };


	const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  const [availability, setAvailability] = useState({
    monday: { start: '09:00 AM', end: '06:00 PM' },
		tuesday: { start: '09:00 AM', end: '06:00 PM' },
    wednesday: { start: '09:00 AM', end: '06:00 PM' },
    thursday: { start: '09:00 AM', end: '06:00 PM' },
    friday: { start: '09:00 AM', end: '06:00 PM' },
    saturday: { start: '09:00 AM', end: '06:00 PM' },
    sunday: { start: '09:00 AM', end: '06:00 PM' },
    // Repeat for other days of the week
  });

  const handleTimeChange = (day, timeType, newTime) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: {
        ...prevAvailability[day],
        [timeType]: newTime,
      },
    }));
  };

	const handleAvailabilityUpdate = async () => {
    try {
      await updateUserAvailability(user.uid, availability);
      console.log('Availability updated successfully!');
      console.log(availability);
			console.log("test", availability.monday.start);
    } catch (error) {
      console.error('Error updating services:', error);
    }
  };



	useEffect(() => {
    if (user) {
      // Fetch the user data from Firestore using the user's UID
      getUserDocument(user.uid)
        .then((userData) => {
          setAvailability(userData.availability || {
						sunday: { startTime: '', endTime: '' },
						monday: { startTime: '', endTime: '' },
						tuesday: { startTime: '', endTime: '' },
						wednesday: { startTime: '', endTime: '' },
						thursday: { startTime: '', endTime: '' },
						friday: { startTime: '', endTime: '' },
						saturday: { startTime: '', endTime: '' },
					});
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoading(false);
        });
			}
		}, []);


  return (
    <div>
      <h2>Edit Availability</h2>
      <div>
        <label>Select time interval:</label>
        <select value={timeInterval} onChange={handleIntervalChange}>
          <option value={15}>15 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>
        </select>
      </div>
			{daysOfWeek.map((day) => (
      <div key={day}>
        <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
        <div>
          <label>Start Time:</label>
          <TimePicker
            initialTime={availability[day].start}
            onTimeChange={(newTime) => handleTimeChange(day, 'start', newTime)}
            timeInterval={timeInterval}
          />
        </div>
        <div>
          <label>End Time:</label>
          <TimePicker
            initialTime={availability[day].end}
            onTimeChange={(newTime) => handleTimeChange(day, 'end', newTime)}
            timeInterval={timeInterval}
          />
        </div>
      </div>
    ))}
			<div>{availability.monday.start}</div>
			<select value={2}>
				<option>1</option>
				<option>2</option>
				<option>3</option>
			</select>
      <Button onClick={handleAvailabilityUpdate}>Submit</Button>
    </div>
  );
};

export default EditAvailability;
