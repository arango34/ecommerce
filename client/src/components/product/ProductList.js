import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Product from './Product';

import './ProductList.css';

const ProductList = () => {
  const { products } = useSelector((state) => state.product);

  const { department } = useParams();

  return (
    <>
      <h2 className='list-header'>
        {!department ? 'All Products' : department}
      </h2>
      <div className='list-container'>
        <div className='list-center'>
          {products.map((product, i) => {
            return <Product key={i} {...product} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ProductList;
