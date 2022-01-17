import React, { useEffect, useState } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ dropDate }) => {
  // State
  const [timerString, setTimerString] = useState('');

  // useEffect will run on component load
  useEffect(() => {
    console.log('Setting interval...');

    // Use setInterval to run this piece of code every second
    const interval = setInterval(() => {
      const currentDate = new Date().getTime();
      const distance = dropDate - currentDate;

      // Get the time difference properties
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // We have our desired output; set it in state
      setTimerString(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      // If our distance goes below zero, it's time for the drop
      if (distance < 0) {
        console.log('Clearing interval...');
        clearInterval(interval);
      }
    }, 1000);

    // When the componen unmounts, clean up the interval
    return () => {
      if(interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <div className="timer-container">
      <p>
        {timerString && <p className="timer-value">{`⏳ ${timerString}`}</p>}
      </p>
    </div>
  );  
};

export default CountdownTimer;