import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import Btn from './Btn';

import './BtnContainer.css';

const BtnContainer = ({ page }) => {
  const [btns, setBtns] = useState([]);
  const { lastPage } = useSelector((state) => state.product);
  const { department } = useParams();

  useEffect(() => {
    if (!page) {
      if (lastPage) {
        setBtns(['1']);
      } else {
        setBtns(['1', '2']);
      }
    } else {
      if (lastPage) {
        setBtns([+page - 1, page]);
      } else {
        setBtns([+page - 1, page, +page + 1]);
      }
    }

    // setPg(page)
  }, [page, lastPage]);

  return (
    <div className='btn-container'>
      {page ? (
        <Link
          to={
            department
              ? `/products/${department}${page > 2 ? `?page=${+page - 1}` : ''}`
              : `/products${page > 2 ? `?page=${+page - 1}` : ''}`
          }
          className='btn-link'
        >
          <FaAngleLeft />
        </Link>
      ) : (
        <div className='btn-link'>
          <FaAngleLeft />
        </div>
      )}

      <div className='btns'>
        {btns.map((btn, i) => (
          <Btn key={i} btn={btn} page={page} department={department} />
        ))}
      </div>
      {lastPage ? (
        <div className='btn-link'>
          <FaAngleRight />
        </div>
      ) : (
        <Link
          to={
            department
              ? `/products/${department}?page=${page ? +page + 1 : '2'}`
              : `/products?page=${page ? +page + 1 : '2'}`
          }
          className='btn-link'
        >
          <FaAngleRight />
        </Link>
      )}
    </div>
  );
};

export default BtnContainer;
