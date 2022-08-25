import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import Dept from '../components/Dept';
import Loading from '../components/Loading';
import { getProductImgs } from '../features/product/productSlice';

import './Home.css';

const Home = () => {
  const { productsIsLoading, imgs } = useSelector((state) => state.product);
  const { ref, inView } = useInView();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductImgs());
  }, [dispatch]);

  return (
    <>
      {productsIsLoading ? (
        <Loading />
      ) : (
        <section className='home-section'>
          <header>
            <div className='banner'>
              <h1 className='push'>The Greatest Online</h1>
              <h1>Shopping Experience</h1>
            </div>
            <div className='overlay'></div>
          </header>
          <div className='departments-container-2 animate'>
            {imgs.map((img, i) => {
              return <Dept key={i} {...img} />;
            })}
          </div>
          <div ref={ref}></div>
          <Link
            to={'/products'}
            className={`all-products-link-container ${inView && 'animate'}`}
          >
            Browse All Products
          </Link>
        </section>
      )}
    </>
  );
};

export default Home;
