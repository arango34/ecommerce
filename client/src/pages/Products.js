import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from '../components/product/ProductList';
import BtnContainer from '../components/BtnContainer';
import Loading from '../components/Loading';
import { getProducts } from '../features/product/productSlice';

const Products = () => {
  const { productsIsLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const { department } = useParams();

  useEffect(() => {
    dispatch(getProducts({ department, page: query.get('page') }));
  }, [dispatch, department, query]);

  return (
    <>
      {productsIsLoading ? (
        <Loading />
      ) : (
        <section className='product-list-section'>
          <ProductList />
          <BtnContainer page={query.get('page')} />
        </section>
      )}
    </>
  );
};

export default Products;
