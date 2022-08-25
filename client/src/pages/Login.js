import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import UserContainer from '../components/UserContainer';
import Loading from '../components/Loading';

import './Login.css';

const Login = () => {
  const [isMember, setIsMember] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { isUserLoading, showAlert, alertText } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [isMember]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className='login-section'>
      <h3 className='h4-login'>
        {isMember ? 'Member Login' : 'Create An Account'}
      </h3>
      <div className='loading-container'>
        <div>
          {isUserLoading ? (
            <p className='login-loading'>Loading...</p>
          ) : (
            <p className='red'>{showAlert ? alertText : ''}</p>
          )}
        </div>
      </div>
      {isMember ? <LoginForm /> : <RegisterForm />}

      <div className='login-p'>
        <span
          className='login-span blue'
          onClick={() => setIsMember(!isMember)}
        >
          {isMember ? 'Not A Member?' : 'Log In'}
        </span>
      </div>
      {isMember && (
        <UserContainer isMember={isMember} setIsMember={setIsMember} />
      )}
    </section>
  );
};

export default Login;
