import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import './Product.css';

const Product = ({ id, image, price, rating, title }) => {
  return (
    <Link to={`/product/${id}`} className='list-product no-pointer'>
      <article>
        <div className='product-filler'></div>
        <div className='list-img-container'>
          <img className='list-img' src={image} alt={title} />
        </div>
        <footer className='list-item-footer'>
          <h4 className='list-item-title'>{title}</h4>

          <div className='list-rating-container'>
            <Rating
              size={20}
              initialValue={rating.rate}
              allowHalfIcon={true}
              readonly={true}
            />
            <span className='list-span'>{rating.count}</span>
          </div>

          <p className='list-price'>${price.toFixed(2)}</p>
        </footer>
      </article>
    </Link>
  );
};

export default Product;
