import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../../features/modal/modalSlice';
import { checkout, purchaseFinal } from '../../features/cart/cartSlice';

import ModalItem from './ModalItem';

import './Modal.css';

const Modal = () => {
  const { cartItems, total, isPurchaseFinal } = useSelector(
    (state) => state.cart
  );
  const { isModalLoading } = useSelector((state) => state.modal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isPurchaseFinal) {
      dispatch(checkout());
      navigate('/');
    } else {
      dispatch(purchaseFinal());
    }
  };

  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h3>{isPurchaseFinal ? 'Purchase Confirmed' : 'Confirm Purchase'}</h3>
        <div className={`modal-items-container ${isPurchaseFinal && 'hide'}`}>
          {cartItems.map((item, i) => {
            return <ModalItem key={i} i={i} {...item} />;
          })}
        </div>
        <div className={`modal-total-container ${isPurchaseFinal && 'hidden'}`}>
          <p className={`load ${isModalLoading && 'show-load'}`}>Loading...</p>
          <div className='modal-total-content'>
            <span className='modal-total'>Total </span>
            <span className='modal-total-black'>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className={`modal-btn-container ${isPurchaseFinal && 'center'}`}>
          {isPurchaseFinal ? (
            <p className='thank-you'>Thank you for your purchase.</p>
          ) : (
            <button
              className={`modal-btn modal-clear-btn ${
                isPurchaseFinal && 'no-top'
              }`}
              onClick={() => dispatch(hideModal())}
            >
              Cancel
            </button>
          )}

          <button
            className={`modal-btn confirm-btn ${isPurchaseFinal && 'no-top'}`}
            onClick={handleClick}
          >
            {isPurchaseFinal ? 'Close' : 'Confirm'}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
