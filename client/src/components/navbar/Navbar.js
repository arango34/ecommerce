import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';

import InputContainer from './InputContainer';
import NavDropdownBtn from './NavDropdownBtn';
import CartSidebar from '../cart/CartSidebar';

import { setShowCart } from '../../features/cart/cartSlice';

import logo from '../../assets/e-commerce-logo.png';
import './Navbar.css';

const Navbar = () => {
  let { amount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <nav className='nav-wrapper'>
      <div className='navbar'>
        <div className='navbar-container'>
          <Link to={'/'} className='logo-container'>
            <img src={logo} alt='E-Commerce' className='logo' />
          </Link>
          <div className='nav-spacer'></div>
          <InputContainer />
          <div className='nav-spacer'></div>
          <NavDropdownBtn />
          <div className='nav-spacer'></div>
          <div className='nav-height height-cart'>
            <div
              className='nav-container'
              onClick={() => dispatch(setShowCart())}
            >
              <FaShoppingCart className='cart-icon' />
              <div className='amount-container'>
                <p className='total-amount'>{amount > 0 ? amount : ''}</p>
              </div>
            </div>
          </div>
          <div className='nav-spacer-small'></div>
        </div>
        <CartSidebar />
      </div>
    </nav>
  );
};

export default Navbar;
