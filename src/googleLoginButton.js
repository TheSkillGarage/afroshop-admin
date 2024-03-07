// ConnectButton.js
import React from 'react';
import { GoogleLogo } from './images';

const ConnectButton = ({ provider }) => {
 

  const handleClick = () => {
    // Redirect to the Strapi authentication endpoint
    window.location.href = `${process.env.REACT_APP_API_URL}/connect/${provider}`;
  };

  return (
   <div className="mt-6 w-[400px]" onClick={handleClick}>
          <button className="flex gap-2 justify-center items-center border border-1 border-[#CCCCCC] rounded w-full h-[53px]">
            <img src={GoogleLogo} alt="google-logo" />
            Continue with Google
          </button>
        </div>
  );
};

export default ConnectButton;
