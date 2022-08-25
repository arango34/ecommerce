import { Rating } from 'react-simple-star-rating';

import './SpDescription.css';

const SpDescription = ({ image, rating, description, title, imgRef }) => {
  return (
    <>
      {!rating ? (
        ''
      ) : (
        <div className='sp-desc-container'>
          <div className='sp-img-container'>
            <img ref={imgRef} src={image} alt={title} className='sp-img' />
          </div>
          <footer className='sp-desc-footer'>
            <div className='sp-rating-container'>
              <p className='sp-reviews'>{rating.count} Reviews</p>
              <Rating
                size={30}
                initialValue={rating.rate}
                allowHalfIcon={true}
                readonly={true}
              />
            </div>
            <div className='sp-desc'>
              <h1 className='sp-product-desc'>Product Description</h1>
              <p className='desc'>{description}</p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default SpDescription;
