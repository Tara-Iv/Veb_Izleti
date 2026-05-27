import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import { cancelBooking } from '../slices/bookingSlice';
import { FaTrash, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { formatDate, formatPrice } from '../utils/bookingUtils';
import tours from '../tours_list';

const MyBookingsScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { bookings } = useSelector((state) => state.booking);

   const cancelHandler = (index) => {
    if (window.confirm('Da li ste sigurni da želite da otkažete rezervaciju?')) {
        dispatch(cancelBooking(index));
        toast.success('Rezervacija je otkazana.');
    }
};

    const getTourImage = (tourId) => {
        const tour = tours.find((t) => t._id === tourId);
        return tour ? tour.image : '';
    };

    const getTourDuration = (tourId) => {
        const tour = tours.find((t) => t._id === tourId);
        return tour ? tour.duration : 1;
    };

    return (
        <>
            <h1 className='mb-4'>Moje rezervacije</h1>
            {bookings.length === 0 ? (
                <Message>
                    Nemate aktivnih rezervacija.{' '}
                    <span
                        style={{ cursor: 'pointer', color: '#2b6cb0' }}
                        onClick={() => navigate('/tours')}
                    >
                        Pregledajte izlete
                    </span>
                </Message>
            ) : (
                <Row>
                    {bookings.map((booking, index) => (
                        <Col key={index} md={12} className='mb-4'>
                            <Card className='booking-card'>
                                <Row className='g-0'>
                                    <Col md={3}>
                                        <img
                                            src={getTourImage(booking.tourId)}
                                            alt={booking.tourName}
                                            className='booking-card-img'
                                        />
                                    </Col>
                                    <Col md={9}>
                                        <Card.Body className='booking-card-body'>
                                            <div className='d-flex justify-content-between align-items-start mb-2'>
                                                <div>
                                                    <h4 className='booking-card-title'>
                                                        {booking.tourName}
                                                    </h4>
                                                    <Badge bg='success' className='mb-2'>
                                                        Potvrđena
                                                    </Badge>
                                                </div>
                                                <h4 className='booking-total-price'>
                                                    {formatPrice(booking.totalPrice)}
                                                </h4>
                                            </div>

                                            <Row className='booking-details'>
                                                <Col sm={6} md={3} className='booking-detail-item'>
                                                    <FaMapMarkerAlt className='booking-detail-icon' />
                                                    <div>
                                                        <small>Lokacija</small>
                                                        <p>{booking.location}</p>
                                                    </div>
                                                </Col>
                                                <Col sm={6} md={3} className='booking-detail-item'>
                                                    <FaCalendarAlt className='booking-detail-icon' />
                                                    <div>
                                                        <small>Datum polaska</small>
                                                        <p>{formatDate(booking.date)}</p>
                                                    </div>
                                                </Col>
                                                <Col sm={6} md={3} className='booking-detail-item'>
                                                    <FaUsers className='booking-detail-icon' />
                                                    <div>
                                                        <small>Broj osoba</small>
                                                        <p>{booking.numberOfPeople} {booking.numberOfPeople === 1 ? 'osoba' : 'osobe'}</p>
                                                    </div>
                                                </Col>
                                                <Col sm={6} md={3} className='booking-detail-item'>
                                                    <FaClock className='booking-detail-icon' />
                                                    <div>
                                                        <small>Trajanje</small>
                                                        <p>{getTourDuration(booking.tourId)} {getTourDuration(booking.tourId) === 1 ? 'dan' : 'dana'}</p>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <div className='d-flex justify-content-between align-items-center mt-3'>
                                                <div className='booking-price-breakdown'>
                                                    {formatPrice(booking.pricePerPerson)} × {booking.numberOfPeople} {booking.numberOfPeople === 1 ? 'osoba' : 'osobe'}
                                                </div>
                                                <Button
                                                    variant='outline-danger'
                                                    size='sm'
                                                    onClick={() => cancelHandler(index)}
                                                    className='booking-cancel-btn'
                                                >
                                                    <FaTrash className='me-2' />
                                                    Otkaži rezervaciju
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default MyBookingsScreen;