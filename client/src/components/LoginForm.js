import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setShowAlert, setAlertText } from '../features/user/userSlice';

import { login } from '../features/user/userSlice';

import './LoginForm.css';

const initialState = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const [state, setState] = useState(initialState);
  const { user, alertText } = useSelector((state) => state.user);
  const btn = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    btn.current.disabled = true;

    const { username, password } = state;

    if (!username || !password) {
      dispatch(setAlertText('Please provide all values'));
      dispatch(setShowAlert());
      setTimeout(() => {
        dispatch(setShowAlert());
        dispatch(setAlertText(''));
      }, 2000);
      return;
    }

    const currentUser = { username, password };

    dispatch(login(currentUser));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  useEffect(() => {
    if (!alertText) {
      btn.current.disabled = false;
    }
  }, [alertText]);

  return (
    <form className='input-form' onSubmit={handleSubmit}>
      <div className='input-wrapper'>
        <label htmlFor='username'>Username: </label>
        <input
          type='text'
          name='username'
          className='login-input'
          onChange={handleChange}
        />
      </div>
      <div className='input-wrapper'>
        <label htmlFor='password' className='password-label'>
          Password:{' '}
        </label>
        <input
          type='password'
          name='password'
          className='login-input'
          onChange={handleChange}
        />
      </div>
      <div className='btn-login-container'>
        <button type='submit' className='btn btn-login' ref={btn}>
          Log In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
