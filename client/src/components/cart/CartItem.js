import { useDispatch } from 'react-redux';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

import {
  removeCartItem,
  changeItemAmount,
} from '../../features/cart/cartSlice';

import './CartItem.css';

const CartItem = ({ id, title, amount, img, price }) => {
  const dispatch = useDispatch();
  return (
    <article className='cart-item'>
      <div className='cart-flex'>
        <div className='cart-title-container'>
          <div className='cart-img-container'>
            <img src={img} alt='' className='cart-img' />
          </div>
          <p className='cart-title'>{title}</p>
        </div>
        <div className='cart-item-price'>
          <div className='cart-price-container'>
            <div className='cart-amount-container'>
              <div className='increment-container'>
                <FaAngleUp
                  className='cart-increase'
                  onClick={() =>
                    dispatch(changeItemAmount({ id, operator: '+' }))
                  }
                />
                <FaAngleDown
                  className='cart-decrease'
                  onClick={() =>
                    dispatch(changeItemAmount({ id, operator: '-' }))
                  }
                />
              </div>
              <p className='cart-amount'>{amount}</p>
            </div>
            <p className='cart-price'>${price.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className='cart-delete-container'>
        <p className='cart-delete' onClick={() => dispatch(removeCartItem(id))}>
          delete
        </p>
      </div>
    </article>
  );
};

export default CartItem;
