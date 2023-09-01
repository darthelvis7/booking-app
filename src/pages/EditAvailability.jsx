import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import TimePicker from '../components/TimePicker'

const EditAvailability = () => {

	const [timeInterval, setTimeInterval] = useState(30); // Default interval is 30 minutes

  const handleIntervalChange = (event) => {
    setTimeInterval(parseInt(event.target.value));
  };

	const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('06:00 PM');

	const handleStartTimeChange = (newStartTime) => {
    setStartTime(newStartTime);
		console.log(startTime);
  };

  const handleEndTimeChange = (newEndTime) => {
    setEndTime(newEndTime);
		console.log(endTime);
  };

	const handleSubmitTime = () => {
		console.log("start time:", startTime);
		console.log("end time:", endTime)
	};

	return (
		<div>
      <h2>Parent Component</h2>
      <div>
        <label>Select time interval:</label>
        <select value={timeInterval} onChange={handleIntervalChange}>
          <option value={15}>15 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>
        </select>
      </div>
      <div>
        <h3>Start Time</h3>
        <TimePicker
          initialTime="09:00 AM"
          onTimeChange={handleStartTimeChange}
          timeInterval={timeInterval}
        />
      </div>
			<div>
        <h3>End Time</h3>
        <TimePicker
          initialTime="06:00 PM"
          onTimeChange={handleEndTimeChange}
          timeInterval={timeInterval}
        />
      </div>
			<Button onClick={handleSubmitTime}>Submit</Button>
    </div>
	)
}

export default EditAvailability