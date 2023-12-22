import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Notification from './Notification';
import LoginContext from '../Context/loginStatus-Context';
import AlertContext from '../Context/alert-Context';

export default function Home() {
  const ctx = useContext(LoginContext);
  const { alert, alertMessage, alertType } = useContext(AlertContext);

  const { login } = ctx;
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login();
    }
  });
  return (
    <>
      <Navbar />
      {alert && <Notification type={alertType} message={alertMessage} />}
      <main>
        <Outlet />
      </main>
    </>
  );
}
