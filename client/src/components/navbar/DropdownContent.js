import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../features/user/userSlice';

import './DropdownContent.css';

const DropdownContent = () => {
  const { departments } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className='drpdwn-flex'>
      <div className='drpdwn-cont signin-container'>
        <h4 className='drpdwn-header'>Account</h4>
        {user ? (
          <div className='drpdwn-link sign-out' onClick={handleClick}>
            Sign out
          </div>
        ) : (
          <Link to='/login'>
            <div className='drpdwn-link'>Sign in/Register</div>
          </Link>
        )}

        <Link to={user ? '/profile' : '/login'}>
          <div className='drpdwn-link capitalize'>account info</div>
        </Link>
      </div>
      <div className='drpdwn-cont drpdwn-departments-container'>
        <h4 className='drpdwn-header'>Departments</h4>
        <div className='drpdwn-departments'>
          {departments.map((department, i) => (
            <Link to={`/products/${department}`} key={i}>
              <div className='drpdwn-link capitalize'>{department}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownContent;
