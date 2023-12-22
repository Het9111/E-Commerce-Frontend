import React, { useState } from 'react';
import AlertContext from './alert-Context';

export default function AlertContextProvider(props) {
  const [alert, setAlert] = useState(true);
  const [alertMessage, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');
  const showAlert = (alertType, msg) => {
    setAlertMsg(msg);
    setAlertType(alertType);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 1500);
  };
  return <AlertContext.Provider value={{ showAlert, alert, alertType, alertMessage }}>{props.children}</AlertContext.Provider>;
}
