import { React, useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import TimePicker from '../components/TimePicker';
import Button from 'react-bootstrap/Button';
import { getUserDocument, updateUserAvailability, updateUserTimeSlots } from '../firebase';

const EditAvailability = () => {
  const { user, setUser } = useContext(UserContext);

  const [userData, setUserData] = useState(null);

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const [timeInterval, setTimeInterval] = useState(30); // Default interval is 30 minutes

  const handleIntervalChange = (event) => {
    setTimeInterval(parseInt(event.target.value));
  };

  const daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

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

	const [timeSlots, setTimeSlots] = useState({
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
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
			await updateUserTimeSlots(user.uid, timeSlots);
			console.log(timeSlots);
    } catch (error) {
      console.error('Error updating services:', error);
    }
  };

// Function to generate time slots at 30-minute intervals
const generateTimeSlots = (startTime, endTime) => {
  const slots = [];
  const start = new Date(`2023-01-01T${startTime}`);
  const end = new Date(`2023-01-01T${endTime}`);

  while (start < end) {
    const formattedTime = start.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    slots.push(formattedTime);
    start.setMinutes(start.getMinutes() + 30);
  }

  return slots;
};

  useEffect(() => {
    // Generate time slots whenever the availability changes
    const updatedTimeSlots = {};
    for (const day in availability) {
      const { start, end } = availability[day];
      updatedTimeSlots[day] = generateTimeSlots(start, end);
    }
    setTimeSlots(updatedTimeSlots);
  }, [availability]);

  useEffect(() => {
    if (user) {
      // Fetch the user data from Firestore using the user's UID
      getUserDocument(user.uid)
        .then((userData) => {
          setAvailability(
            userData.availability || {
              sunday: { start: '', end: '' },
              monday: { start: '', end: '' },
              tuesday: { start: '', end: '' },
              wednesday: { start: '', end: '' },
              thursday: { start: '', end: '' },
              friday: { start: '', end: '' },
              saturday: { start: '', end: '' },
            }
          );
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
              onTimeChange={(newTime) =>
                handleTimeChange(day, 'start', newTime)
              }
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
			<div>
      <h4>Sunday</h4>
      <ul>
        {timeSlots.sunday.map((slot) => (
          <li key={slot}>{slot}</li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default EditAvailability;
