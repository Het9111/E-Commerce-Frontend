import React, { Fragment, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Context from '../Context/loginStatus-Context';
import AlertContext from '../Context/alert-Context';

export default function Navbar() {
  const navigate = useNavigate();
  const ctx = useContext(Context);
  const { showAlert } = useContext(AlertContext);
  const { logout, isLogin } = ctx;
  const logoutHandler = () => {
    localStorage.removeItem('token');
    logout();
    showAlert('danger', 'Logged Out Successfully');
    navigate('/login');
  };
  return (
    <Fragment>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <NavLink className='navbar-brand' to='/'>
            Navbar
          </NavLink>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav'>
              <NavLink className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')} to='/' end>
                Home
              </NavLink>
              <NavLink className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')} to='/products'>
                Products
              </NavLink>
              <NavLink className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')} to='/cart'>
                Cart
              </NavLink>
              <div>
                {!isLogin && (
                  <div>
                    <Link to='/login' className='btn btn-dark mx-2'>
                      Login
                    </Link>
                    <Link to='/signup' className='btn btn-dark'>
                      Signup
                    </Link>
                  </div>
                )}
                {isLogin && (
                  <Link to='/login' onClick={logoutHandler} className='btn btn-dark'>
                    Logout
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
