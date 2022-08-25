import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { flattenObject } from '../utils';

import Loading from '../components/Loading';

import './Profile.css';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState([]);
  let { user } = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true);
    setInfo(flattenObject(user));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='color'>
      <section className='profile-section'>
        <h2>Account Info</h2>
        <div className='profile-container'>
          {info.map((item, i) => {
            const currKey = Object.keys(item)[0];
            if (currKey === 'address') {
              const { city, street, number, zipcode } = item[currKey];
              return (
                <div key={i} className='profile-row'>
                  <div className='val capitalize'>{currKey}:</div>

                  <div className='values'>
                    <span className='profile-val'>{number} </span>
                    <span className='profile-val capitalize'>{street}, </span>
                    <span className='profile-val capitalize'>{city} </span>
                    <span className='profile-val'>
                      {zipcode ? zipcode : '95076'}
                    </span>
                  </div>
                </div>
              );
            } else if (currKey === 'name') {
              const { firstname, lastname } = item[currKey];
              return (
                <div className='profile-row'>
                  <div className='val capitalize'>{currKey}:</div>

                  <div className='values'>
                    <span className='profile-val capitalize'>
                      {firstname ? firstname : 'john'}
                      {` `}
                    </span>
                    <span className='profile-val capitalize'>
                      {lastname ? lastname : 'doe'}
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={i} className='profile-row'>
                  <div className='val capitalize'>{currKey}:</div>

                  <div className='values'>
                    <span className='profile-val'>{item[currKey]}</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </section>
    </div>
  );
};

export default Profile;
