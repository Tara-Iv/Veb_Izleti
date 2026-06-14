import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';
import Rating from './Rating';

const Tour = ({ tour }) => {
    return (
        <Card className='my-3 tour-card'>
            <Link to={`/tours/${tour._id}`}>
                <div className='tour-card-img-wrapper'>
                    <Card.Img
                        src={tour.image}
                        variant='top'
                    />
                </div>
            </Link>
            <Card.Body>
                <Link to={`/tours/${tour._id}`} style={{ textDecoration: 'none' }}>
                    <Card.Title>{tour.name}</Card.Title>
                </Link>
                <Card.Text as='div' className='mb-1 text-muted small'>
                    <FaMapMarkerAlt className='me-1' />
                    {tour.location}
                </Card.Text>
                <Card.Text as='div' className='mb-2 text-muted small'>
                    <FaClock className='me-1' />
                    {tour.duration} {tour.duration === 1 ? 'dan' : 'dana'}
                </Card.Text>
                <Badge bg='primary' className='mb-2'>{tour.category}</Badge>
                <div className='tour-price mt-2'>{tour.price.toLocaleString('sr-RS')} RSD</div>
                <Rating
                    value={tour.rating}
                    text={tour.numReviews > 0 ? `(${tour.numReviews})` : 'Nema ocena'}
                />
            </Card.Body>
        </Card>
    );
};

export default Tour;