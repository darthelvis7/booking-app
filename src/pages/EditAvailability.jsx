import React, { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { Button } from 'react-bootstrap';
import TimePicker from '../components/TimePicker';
import { updateUserAvailability } from '../firebase';

const EditAvailability = () => {
	const { user, setUser } = useContext(UserContext);

  const [timeInterval, setTimeInterval] = useState(30); // Default interval is 30 minutes

  const handleIntervalChange = (event) => {
    setTimeInterval(parseInt(event.target.value));
  };

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
    } catch (error) {
      console.error('Error updating services:', error);
    }
  };

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
      {Object.keys(availability).map((day) => (
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
      <Button onClick={handleAvailabilityUpdate}>Submit</Button>
    </div>
  );
};

export default EditAvailability;
