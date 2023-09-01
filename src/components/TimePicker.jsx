import React, { useState } from 'react';

const TimePicker = ({ initialTime, onTimeChange, timeInterval }) => {
  const [selectedTime, setSelectedTime] = useState(initialTime);

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setSelectedTime(newTime);
    onTimeChange(newTime);
  };

  const generateTimeOptions = () => {
    const timeOptionsArray = [];
    const interval = timeInterval; // Use the passed time interval

    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += interval) {
        const hourString = hours.toString().padStart(2, '0');
        const minuteString = minutes.toString().padStart(2, '0');
        const time = `${hourString}:${minuteString}`;
        timeOptionsArray.push(time);
      }
    }

    return timeOptionsArray;
  };

  return (
    <div>
			<div>Select Time</div>
      <select value={selectedTime} onChange={handleTimeChange}>
        {generateTimeOptions().map((timeOption) => (
          <option key={timeOption} value={timeOption}>
            {timeOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimePicker;
