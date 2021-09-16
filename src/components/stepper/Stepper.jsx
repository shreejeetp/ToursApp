import React from 'react';
import './Stepper.css';

function Stepper(props) {
  return (
    <div>
      <div className='stepper'>
        {Array(props.length)
          .fill()
          .map((a, i) => (
            <div
              onClick={() => props.setTrip(i)}
              className='stepper__step'
              style={i === props.main ? { width: '40px', height: '40px' } : {}}
            >
              {i === props.main ? i + 1 : ''}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Stepper;
