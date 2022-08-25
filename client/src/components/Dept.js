import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import './Dept.css';

const Dept = ({ images, department }) => {
  const { ref: topRef, inView: topRefIsVisible } = useInView();
  const { ref: bottomRef, inView: bottomRefIsVisible } = useInView();

  return (
    <div
      className={`department-container-link no-pointer ${
        (topRefIsVisible || bottomRefIsVisible) && 'animate'
      }`}
    >
      <Link to={`products/${department}`} className='no-pointer'>
        <div className='department-container'>
          <div className='dept-img-container'>
            <div className='dept-title-container'>
              <div ref={topRef} className='top-ref'></div>

              <h2 className='department-title'>{department}</h2>
              <button className='department-link'>Shop Now</button>
            </div>
            {images.map((img, i) => (
              <div key={i} className={i === 0 ? 'move-left' : ''}>
                <img src={img} alt='' />
              </div>
            ))}
          </div>
        </div>
        <div ref={bottomRef} className='bottom-ref'></div>
      </Link>
    </div>
  );
};

export default Dept;
