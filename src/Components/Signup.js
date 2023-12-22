import React, { useEffect, useState, useContext } from 'react';
import classes from './Signup.module.css';
import { useNavigate, Link } from 'react-router-dom';
import LoginContext from '../Context/loginStatus-Context';
import AlertContext from '../Context/alert-Context';

export default function Signup() {
  const { login } = useContext(LoginContext);
  const { showAlert } = useContext(AlertContext);

  const [name, setName] = useState('');
  const [nameValidation, setNameValidation] = useState(null);
  const [phone, setPhone] = useState('');
  const [phoneValidation, setPhoneValidation] = useState(null);
  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [address, setAddress] = useState('');
  const [addressValidation, setAddressValidation] = useState(null);
  const [nameTouch, setNameTouched] = useState(false);
  const [emailTouch, setEmailTouched] = useState(false);
  const [passwordTouch, setPasswordTouched] = useState(false);
  const [addressTouch, setAddressTouched] = useState(false);
  const [phoneTouch, setPhoneTouched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAddressValidation(address.trim().length > 0);
    setEmailValidation(email.includes('@') && email.includes('.'));
    setNameValidation(name.trim().length > 0);
    setPhoneValidation(phone.trim().length > 9);
    setPasswordValidation(password.trim().length > 7);
  }, [name, email, password, address, phone]);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onPhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleNameBlur = () => {
    setNameTouched(true);
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handleAddressBlur = () => {
    setAddressTouched(true);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (nameValidation && phoneValidation && passwordValidation && emailValidation && addressValidation) {
      const userData = {
        name,
        email,
        address,
        phone,
        password
      };

      const respone = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setAddress('');
      setName('');
      setPhone('');
      setPassword('');
      setEmail('');
      const data = await respone.json();

      if (data.status === 'success') {
        localStorage.setItem('token', data.token);
        login();
        navigate('/products');
        showAlert('success', 'SignUp Successfully');
      }
      if (data.status === 'fail') {
        showAlert('danger', data.message);
        setNameTouched(false);
        setEmailTouched(false);
        setPasswordTouched(false);
        setPhoneTouched(false);
        setAddressTouched(false);
      }
    } else {
      showAlert('danger', 'Please Fill all the details with required validation.');
    }
  };

  return (
    <>
      <div className='container my-3' style={{ borderRadius: '15px' }}>
        <h2 style={{ textAlign: 'center' }}>Signup Form</h2>
        <form className='container my-3' style={{ width: '80%' }} onSubmit={submitHandler}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input type='text' onChange={onNameChange} onBlur={handleNameBlur} value={name} className='form-control' id='name' name='name' />
            {nameTouch && !nameValidation && <p className={classes.feedBack}>Name is required.</p>}
          </div>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email address
            </label>
            <input type='email' onBlur={handleEmailBlur} onChange={onEmailChange} value={email} className='form-control' id='email' name='email' aria-describedby='emailHelp' />
            {!emailValidation && emailTouch && <p className={classes.feedBack}>Email is not in proper format.Enter valid Email</p>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input type='password' onBlur={handlePasswordBlur} onChange={onPasswordChange} value={password} className='form-control' id='password' name='password' />
            {!passwordValidation && passwordTouch && <p className={classes.feedBack}>Password must have atleast 8 characters.</p>}
          </div>
          <div className='mb-3'>
            <label htmlFor='address' className='form-label'>
              Address
            </label>
            <textarea type='text' onChange={onAddressChange} onBlur={handleAddressBlur} value={address} className='form-control' id='address' name='address' />
            {!addressValidation && addressTouch && <p className={classes.feedBack}>Address is required.</p>}
          </div>
          <div className='mb-3'>
            <label htmlFor='phone' className='form-label'>
              Phone
            </label>
            <input type='text' onBlur={handlePhoneBlur} onChange={onPhoneChange} value={phone} className='form-control' id='phone' name='phone' />
            {!phoneValidation && phoneTouch && <p className={classes.feedBack}>PhoneNo must have 10 digit.</p>}
          </div>
          <button type='submit' className='btn btn-primary'>
            Sign Up
          </button>
          <div className='continer my-3'>
            <p>
              If already have an account <Link to='/login'>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
