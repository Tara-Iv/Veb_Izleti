import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Tour = ({ tour }) => {
    return (
        <Card className='my-3 rounded shadow-sm'>
            <Link to={`/tours/${tour._id}`}>
                <Card.Img
                    src={tour.image}
                    variant='top'
                    style={{ height: '200px', objectFit: 'cover' }}
                />
            </Link>
            <Card.Body>
                <Link to={`/tours/${tour._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card.Title as='h5' className='fw-semibold'>
                        {tour.name}
                    </Card.Title>
                </Link>
                <Card.Text as='div' className='mb-2'>
                    <FaMapMarkerAlt className='text-primary me-1' />
                    <span>{tour.location}</span>
                </Card.Text>
                <Card.Text as='div' className='mb-2'>
                    <FaClock className='text-secondary me-1' />
                    <span>{tour.duration} dana</span>
                </Card.Text>
                <Card.Text as='div'>
                    <Badge bg='primary' className='me-2'>
                        {tour.category}
                    </Badge>
                </Card.Text>
                <Card.Text as='h5' className='mt-3 text-primary fw-bold'>
                    {tour.price} RSD
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Tour;