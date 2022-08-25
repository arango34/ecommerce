import { Link } from 'react-router-dom';

import './NavInput.css';

const NavInput = ({ searchValue, setSearchTerm, searchItems, searchTerm }) => {
  const handleClick = () => {
    setSearchTerm('');
    searchValue.current.value = '';
  };

  return (
    <div className='search-drpdwn'>
      <input
        type='text'
        className='nav-input'
        id='nav-input'
        ref={searchValue}
        onChange={() => setSearchTerm(searchValue.current.value)}
        placeholder="type something (e.g., women's)"
        autoComplete='off'
      />
      <div
        className={`dropdown-content search-left ${
          searchTerm.length > 1 && 'show-search'
        }`}
      >
        {searchItems.map((item, i) => (
          <Link to={`/product/${item.id}`} key={i} onClick={handleClick}>
            <div className='drpdwn-link'>
              <div className='drpdwn-img-container'>
                <img src={item.image} alt='' className='drpdwn-img' />
              </div>
              <p className='drpdwn-p'>{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavInput;
