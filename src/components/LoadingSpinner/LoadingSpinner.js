import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size }) => {
  // size can be 'small', 'medium' (default), 'large'
  return (
    <div className={`loading-spinner-overlay ${size === 'small' ? 'small-spinner-overlay' : ''}`}>
      <div className={`lds-ellipsis ${size === 'small' ? 'small-lds-ellipsis' : ''}`}>
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 