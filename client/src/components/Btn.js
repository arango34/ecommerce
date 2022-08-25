import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Btn = ({ btn, page, department }) => {
  const [path, setPath] = useState('/products');

  useEffect(() => {
    if (+btn > 1 && department) {
      setPath(`/products/${department}?page=${btn}`);
    }

    if (department && !+btn > 1) {
      setPath(`/products/${department}`);
    }

    if (+btn > 1 && !department) {
      setPath(`/products?page=${btn}`);
    }
  }, [department, btn]);

  return (
    <>
      {(!page && btn === '1') || btn === page ? (
        <div className='btn-link small'>{btn}</div>
      ) : (
        <Link to={path} className='btn-link small'>
          {btn}
        </Link>
      )}
    </>
  );
};

export default Btn;
