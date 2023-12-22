import React from 'react';
import classes from './Notification.module.css';

export default function Notification(props) {
  const { type, message } = props;

  return (
    <>
      <div className={`alert ${classes.bar} alert-${type} `} role='alert'>
        {message}
      </div>
    </>
  );
}
