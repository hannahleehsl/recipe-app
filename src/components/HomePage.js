import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/public'); // Use the correct path for your Public component
  };

  return (
    <div className="homepage">
      <h1><span className="title">BakeMatch</span></h1>
      <div className="cake">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        <div className="candle">
            <div className="flame"></div>
        </div>
      </div>
      <button class="button-19" onClick={handleButtonClick}>Start</button>
    </div>
  );
};

export default HomePage;
