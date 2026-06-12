//.map - prolazi kroz niz i pravi novi na osnovu uslova 

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {
    return (
        <div className='rating'>
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                    {value >= star ? (
                        <FaStar className='rating-star' />
                    ) : value >= star - 0.5 ? (
                        <FaStarHalfAlt className='rating-star' />
                    ) : (
                        <FaRegStar className='rating-star' />
                    )}
                </span>
            ))}
            {text && <span className='rating-text'>{text}</span>}
        </div>
    );
};

export default Rating;