import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SpAside from '../components/product/SpAside';
import SpDescription from '../components/product/SpDescription';
import Loading from '../components/Loading';

import { getSingleProduct } from '../features/product/productSlice';
import { addCartItem } from '../features/cart/cartSlice';

import './SingleProduct.css';

const SingleProduct = () => {
  const { id } = useParams();
  const imgRef = useRef();
  const titleRef = useRef();
  const priceRef = useRef();
  const qtyRef = useRef();
  const { singleProduct, productsIsLoading } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      addCartItem({
        id,
        title: titleRef.current.textContent,
        img: imgRef.current.src,
        amount: +qtyRef.current.value,
        price: +priceRef.current.textContent.slice(1),
      })
    );
  };

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [dispatch, id]);
  return (
    <>
      {productsIsLoading && !singleProduct ? (
        <Loading />
      ) : (
        <section className='single-product-section'>
          <div className='single-product-container'>
            <SpDescription {...singleProduct} imgRef={imgRef} />
            <SpAside
              {...singleProduct}
              titleRef={titleRef}
              priceRef={priceRef}
              qtyRef={qtyRef}
              addToCart={addToCart}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default SingleProduct;
