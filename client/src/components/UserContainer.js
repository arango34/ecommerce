import { useSelector } from 'react-redux';
import ContainerUser from './ContainerUser';

import './UserContainer.css';

const UserContainer = ({ isMember, setIsMember }) => {
  const { users } = useSelector((state) => state.user);
  return (
    <div className='login-users-container'>
      <p className='users-container-p'>
        Create account{' '}
        <span className='here blue' onClick={() => setIsMember(!isMember)}>
          here
        </span>{' '}
        or choose user from below.
      </p>
      <div className='users-container'>
        {!users && <p className='no-users'>No available users.</p>}
        {users && users.map((user, i) => <ContainerUser key={i} {...user} />)}
      </div>
    </div>
  );
};

export default UserContainer;
