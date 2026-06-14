import { useState } from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { FaTrash, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaClock, FaHistory, FaList } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { formatDate, formatPrice } from '../utils/bookingUtils';
import { useGetMyBookingsQuery, useCancelBookingMutation } from '../slices/bookingsApiSlice';
import ReviewModal from '../components/ReviewModal';
import { FaStar } from 'react-icons/fa';

const MyBookingsScreen = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('current');
    const [reviewBooking, setReviewBooking] = useState(null);

    const { data: bookings, isLoading, error, refetch } = useGetMyBookingsQuery();
    const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();

    const cancelHandler = async (bookingId) => {
        toast(
            <div>
                <p className='mb-2'>Da li ste sigurni da želite da otkažete rezervaciju?</p>
                <div className='d-flex gap-2'>
                    <button
                        className='btn btn-danger btn-sm'
                        onClick={async () => {
                            toast.dismiss();
                            try {
                                await cancelBooking(bookingId).unwrap();
                                toast.success('Rezervacija je otkazana.');
                                refetch();
                            } catch (err) {
                                toast.error(err?.data?.message || 'Greška pri otkazivanju.');
                            }
                        }}
                    >
                        Da, otkaži
                    </button>
                    <button
                        className='btn btn-secondary btn-sm'
                        onClick={() => toast.dismiss()}
                    >
                        Odustani
                    </button>
                </div>
            </div>,
            { autoClose: false, closeButton: false }
        );
    };

    const getStatusBadge = (status) => {
        if (status === 'confirmed') return <Badge bg='success'>Potvrđena</Badge>;
        if (status === 'cancelled') return <Badge bg='danger'>Otkazana</Badge>;
        if (status === 'completed') return <Badge bg='info'>Završena</Badge>;
        return <Badge bg='warning' text='dark'>Na čekanju</Badge>;
    };

    const currentBookings = bookings?.filter(
        (b) => b.status === 'pending' || b.status === 'confirmed'
    ) || [];

    const historyBookings = bookings?.filter(
        (b) => b.status === 'cancelled' || b.status === 'completed'
    ) || [];

    const displayedBookings = activeTab === 'current' ? currentBookings : historyBookings;

    const renderBookings = (list) => {
        if (list.length === 0) {
            return (
                <Message>
                    {activeTab === 'current' ? (
                        <>
                            Nemate aktivnih rezervacija.{' '}
                            <span
                                style={{ cursor: 'pointer', color: '#2b6cb0' }}
                                onClick={() => navigate('/tours')}
                            >
                                Pregledajte izlete
                            </span>
                        </>
                    ) : (
                        'Nemate istoriju rezervacija.'
                    )}
                </Message>
            );
        }

        return (
            <Row>
                {list.map((booking) => (
                    <Col key={booking._id} md={12} className='mb-4'>
                        <Card className='booking-card'>
                            <Row className='g-0'>
                                <Col md={3}>
                                    <img
                                        src={booking.tourImage}
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
                                                {getStatusBadge(booking.status)}
                                            </div>
                                            <h4 className='booking-total-price'>
                                                {formatPrice(booking.totalPrice)}
                                            </h4>
                                        </div>

                                        <Row className='booking-details'>
                                            <Col sm={6} md={3} className='booking-detail-item'>
                                                <FaCalendarAlt className='booking-detail-icon' />
                                                <div>
                                                    <small>Datum polaska</small>
                                                    <p>{formatDate(booking.travelDate)}</p>
                                                </div>
                                            </Col>
                                            <Col sm={6} md={3} className='booking-detail-item'>
                                                <FaUsers className='booking-detail-icon' />
                                                <div>
                                                    <small>Broj osoba</small>
                                                    <p>{booking.numPersons} {booking.numPersons === 1 ? 'osoba' : 'osobe'}</p>
                                                </div>
                                            </Col>
                                            <Col sm={6} md={3} className='booking-detail-item'>
                                                <FaMapMarkerAlt className='booking-detail-icon' />
                                                <div>
                                                    <small>Kontakt</small>
                                                    <p>{booking.contactPhone}</p>
                                                </div>
                                            </Col>
                                            <Col sm={6} md={3} className='booking-detail-item'>
                                                <FaClock className='booking-detail-icon' />
                                                <div>
                                                    <small>Rezervisano</small>
                                                    <p>{formatDate(booking.createdAt)}</p>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className='d-flex justify-content-between align-items-center mt-3'>
                                            <div className='booking-price-breakdown'>
                                                {formatPrice(booking.price)} × {booking.numPersons} {booking.numPersons === 1 ? 'osoba' : 'osobe'}
                                            </div>
                                            {booking.status === 'pending' || booking.status === 'confirmed' ? (
                                                <Button
                                                    variant='outline-danger'
                                                    size='sm'
                                                    onClick={() => cancelHandler(booking._id)}
                                                    disabled={isCancelling}
                                                    className='booking-cancel-btn'
                                                >
                                                    <FaTrash className='me-2' />
                                                    Otkaži rezervaciju
                                                </Button>
                                            ) : booking.status === 'completed' && !booking.rated ? (
                                                <Button
                                                    variant='outline-warning'
                                                    size='sm'
                                                    onClick={() => setReviewBooking(booking)}
                                                    className='booking-cancel-btn'
                                                >
                                                    <FaStar className='me-2' />
                                                    Ocenite izlet
                                                </Button>
                                            ) : booking.status === 'completed' && booking.rated ? (
                                                <span className='text-success small'>
                                                    <FaStar className='me-1' />
                                                    Ocenjeno
                                                </span>
                                            ) : null}
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    };

    return (
        <>
            <h1 className='mb-4'>Moje rezervacije</h1>

            <div className='bookings-tabs mb-4'>
                <button
                    className={`bookings-tab-btn ${activeTab === 'current' ? 'active' : ''}`}
                    onClick={() => setActiveTab('current')}
                >
                    <FaList className='me-2' />
                    Tekuće rezervacije
                    {currentBookings.length > 0 && (
                        <span className='bookings-tab-count'>{currentBookings.length}</span>
                    )}
                </button>
                <button
                    className={`bookings-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                >
                    <FaHistory className='me-2' />
                    Istorija
                    {historyBookings.length > 0 && (
                        <span className='bookings-tab-count'>{historyBookings.length}</span>
                    )}
                </button>
            </div>

           {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : renderBookings(displayedBookings)}

            {reviewBooking && (
                <ReviewModal
                    show={true}
                    onHide={() => setReviewBooking(null)}
                    bookingId={reviewBooking._id}
                    tourName={reviewBooking.tourName}
                    onSuccess={refetch}
                />
            )}
        </>
    );
};

export default MyBookingsScreen;