import React from 'react';
import Navbar from './Navbar';

export default function Errorpage() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <h1 className='my-5' style={{ margin: 'auto', width: 'fit-content' }}>
          Oops... This page is not available
        </h1>
      </div>
    </>
  );
}
