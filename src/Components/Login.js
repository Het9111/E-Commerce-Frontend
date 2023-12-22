import React, { useContext, useEffect, useState } from 'react';
import classes from './Login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import LoginContext from '../Context/loginStatus-Context';
import AlertContext from '../Context/alert-Context';

export default function Login() {
  const [email, setEmail] = useState('');
  const [emailValidation, setEamilValidation] = useState();
  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState();

  const [emailTouch, setEmailTouched] = useState(false);
  const [passwordTouch, setPasswordTouched] = useState(false);

  const navigate = useNavigate();
  const ctx = useContext(LoginContext);
  const { login } = ctx;
  const alertCtx = useContext(AlertContext);
  const { showAlert } = alertCtx;

  useEffect(() => {
    setEamilValidation(email.includes('@') && email.includes('.'));
    setPasswordValidation(password.length > 7);
  }, [email, password]);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onEmailTouch = (e) => {
    setEmailTouched(true);
  };
  const onPasswordTouch = (e) => {
    setPasswordTouched(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (emailValidation && passwordValidation) {
      const userData = { email, password };
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('token', data.token);
        login();
        navigate('/products');
        showAlert('success', 'Login SuccessFully');
      }
      if (data.status === 'fail') {
        showAlert('danger', data.message);
      }
    } else {
      showAlert('danger', 'Please Enter valid details');
    }
  };

  return (
    <>
      <div className='container my-3' style={{ borderRadius: '15px' }}>
        <h2 style={{ textAlign: 'center' }}>Login Form</h2>
        <form className='container my-3' style={{ width: '80%' }} onSubmit={submitHandler}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email address
            </label>
            <input type='email' onChange={onEmailChange} value={email} onBlur={onEmailTouch} className='form-control' name='email' id='email' aria-describedby='emailHelp' />
            {emailTouch && !emailValidation && <p className={classes.feedBack}>Enter valid Email.</p>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input type='password' onChange={onPasswordChange} value={password} onBlur={onPasswordTouch} className='form-control' id='password' name='password' />
            {passwordTouch && !passwordValidation && <p className={classes.feedBack}>password must have atleast 8 digit.</p>}
          </div>
          <button type='submit' className='btn btn-primary'>
            Log In
          </button>
          <div className='continer my-'>
            <p>
              If new user <Link to='/signup'>Create account</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
