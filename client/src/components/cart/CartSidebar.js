import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import CartItem from './CartItem';

import { setShowCart } from '../../features/cart/cartSlice';
import { showModal } from '../../features/modal/modalSlice';

import './CartSidebar.css';

const CartSidebar = () => {
  const { isShowCart, cartItems, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (user) {
      dispatch(showModal());
    } else {
      dispatch(setShowCart());
      navigate('/login');
    }
  };

  return (
    <div
      className={`side-container collapse ${
        isShowCart ? 'show-cart' : 'hide-cart'
      }`}
    >
      <div className='content'>
        <button
          type='button'
          className='cart-close-btn'
          onClick={() => dispatch(setShowCart())}
        >
          <FaTimes />
        </button>
        <h1 className='cart-header'>Cart Items</h1>
        {cartItems.length < 1 ? (
          <p className='empty-cart'>Your cart is empty.</p>
        ) : (
          <>
            <div className='cart-items-container'>
              {cartItems.map((item, i) => {
                return <CartItem key={i} {...item} />;
              })}
            </div>
            <div className='total-container'>
              <h2 className='cart-total'>
                <span className='cart-span'>Total: </span>${total.toFixed(2)}
              </h2>
              <button className='checkout-link' onClick={handleClick}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
