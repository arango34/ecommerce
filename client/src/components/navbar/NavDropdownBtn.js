import { useSelector } from 'react-redux';

import DropdownContent from './DropdownContent';
import { FaChevronDown } from 'react-icons/fa';

import './NavDropdownBtn.css';

const NavDropdownBtn = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className='dropdown'>
      <div className='nav-height'>
        <div className='drpdwnbtn-container dropbtn'>
          <p className='drpdwn-small'>
            Hello,{' '}
            <span className={`${user && 'bolder'}`}>
              {user ? user.username : 'Sign in'}
            </span>
            {` `}
            {!user && <span className='smaller'>(users available)</span>}
          </p>
          <div className='drpdwn-big-container'>
            <p className='drpdwn-big'>Account {'&'} Departments</p>
            <FaChevronDown className='drpdwn-icon' />
          </div>
        </div>
      </div>
      <div className='dropdown-content'>
        <DropdownContent />
      </div>
    </div>
  );
};

export default NavDropdownBtn;
