import React from 'react';
import { PricetagOutline } from 'react-ionicons';

const CardProduct = (props: any) => {
  const className = props.className;
  const data = props.data;
  return (
    <div className={`card-product ${className}`}>
      <img src={`${data.image}`} alt="..."/>
      <div>
        <small className="product-category">#{data.category}</small>
        <h1 className="product-title">{data.title}</h1>
        <div className="product-price d-flex align-items-center">
          <PricetagOutline width="20px" height="20px" />
          <p className="mb-0">${data.price}</p>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;