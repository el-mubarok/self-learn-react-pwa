import React from 'react';
import { BasketOutline, Cart, CartOutline } from 'react-ionicons';

const About: React.FC = () => {
  return (
    <div className="main p-4 main-bg">

      <div className="header d-flex justify-content-between align-items-center">
        <div className="header-text">
          <h3 className="title m-0 h1">My Cart</h3>
          <p className="subtitle m-0 h3">inside your cart</p>
        </div>
        <BasketOutline style={{transform: "rotate(25deg)"}} width="40px" height="40px" color={'#303030'} />
      </div>

    </div>
  );
};

export default About;