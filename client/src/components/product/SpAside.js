import { useState, useRef } from 'react';

import './SpAside.css';

const SpAside = ({ title, price, titleRef, priceRef, qtyRef, addToCart }) => {
  const [isAlert, setIsAlert] = useState(false);
  const btn = useRef();
  const handleClick = () => {
    btn.current.disabled = true;
    setIsAlert(!isAlert);
    addToCart();
    setTimeout(() => {
      setIsAlert(false);
      btn.current.disabled = false;
    }, 1000);
  };
  return (
    <>
      {!title ? (
        ''
      ) : (
        <aside className='sp-aside'>
          <p ref={titleRef} className='sp-aside-title'>
            {title}
          </p>
          <h1 ref={priceRef} className='sp-aside-price'>
            ${price.toFixed(2)}
          </h1>
          <div className='sp-aside-adc-container'>
            <p className={`item-added-alert ${isAlert && 'show-alert'}`}>
              Item Added
            </p>
            <div className='sp-aside-btn-container'>
              <div className='aside-select-container'>
                <span className='sp-aside-span'>Qty: </span>
                <select
                  ref={qtyRef}
                  name='sp-aside-select'
                  className='sp-aside-select'
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                  <option value='9'>9</option>
                  <option value='10'>10</option>
                </select>
              </div>
              <button
                ref={btn}
                className='btn sp-aside-btn'
                onClick={handleClick}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default SpAside;
