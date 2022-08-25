import { useSelector } from 'react-redux';

import './ModalItem.css';

const ModalItem = ({ i, title, amount, img, price }) => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <article
      className={
        i === cartItems.length - 1 ? 'modal-item no-bottom' : 'modal-item'
      }
    >
      <div className='modal-flex'>
        <div className='cart-img-container'>
          <img src={img} alt='' className='modal-img' />
        </div>
        <p className='modal-title'>{title}</p>
        <div className='cart-price-container'>
          <div className='cart-amount-container'>
            <div className='modal-qty-container'>Qty.</div>
            <p className='modal-amount'>{amount}</p>
          </div>
          <p className='modal-price'>${price.toFixed(2)}</p>
        </div>
      </div>
    </article>
  );
};

export default ModalItem;
