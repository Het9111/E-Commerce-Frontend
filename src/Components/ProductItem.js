import React from 'react';

function ProductItem(props) {
  const { name, price, image, description, discount, company } = props.product;
  return (
    <>
      <div className='col'>
        <div className='card' style={{ width: '18rem' }}>
          <img src={image} className='card-img-top' alt='Nothing' />
          <div className='card-body'>
            <h5 className='card-title'>{name}</h5>
            <p className='card-text'>{description}</p>
          </div>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>Company: {company}</li>
            <li className='list-group-item'>Price: {price}</li>
            <li className='list-group-item'>Discount: {discount}</li>
          </ul>
          <div className='card-body'>
            <a href='#' className='card-link'>
              Card link
            </a>
            <a href='#' className='card-link'>
              Another link
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductItem;
