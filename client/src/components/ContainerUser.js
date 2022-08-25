import './UserContainer.css';

const ContainerUser = ({ username, password }) => {
  return (
    <div className='user-center'>
      <div className='container-user'>
        <span className='bracket'>{'{ '}</span>
        <div className='user-flex flex-first'>
          <span className='login-key'>Username: </span>
          <span className='login-val'>{username}</span>
        </div>
        <div className='user-flex'>
          <span className='login-key'>Password: </span>
          <span className='login-val'>{password}</span>
        </div>
        <span className='bracket'>{' }'}</span>
      </div>
    </div>
  );
};

export default ContainerUser;
