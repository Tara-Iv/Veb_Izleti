import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetTourDetailsQuery } from '../slices/toursApiSlice';
import { useCreateBookingMutation } from '../slices/bookingsApiSlice';
import { formatPrice } from '../utils/bookingUtils';
import { toast } from 'react-toastify';

const BookingScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [travelDate, setTravelDate] = useState('');
    const [numPersons, setNumPersons] = useState(1);
    const [contactPhone, setContactPhone] = useState('');

    const { data: tour, isLoading, error } = useGetTourDetailsQuery(id);
    const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

    const totalPrice = tour ? tour.price * numPersons : 0;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!travelDate) {
            toast.error('Molimo izaberite datum.');
            return;
        }
        if (!contactPhone) {
            toast.error('Molimo unesite kontakt telefon.');
            return;
        }
        try {
            await createBooking({
                tourId: tour._id,
                numPersons,
                travelDate,
                contactPhone,
            }).unwrap();
            toast.success('Rezervacija uspešno kreirana!');
            navigate('/mybookings');
        } catch (err) {
            toast.error(err?.data?.message || 'Greška pri rezervaciji.');
        }
    };

    return (
        <>
            <h1 className='mb-4'>Rezervacija izleta</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Row>
                    <Col md={7}>
                        <Card className='mb-4 shadow-sm'>
                            <Card.Body>
                                <h4 className='mb-3'>Detalji izleta</h4>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <strong>{tour.name}</strong>
                                        <Badge bg='primary' className='ms-2'>
                                            {tour.category}
                                        </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <FaMapMarkerAlt className='text-primary me-2' />
                                        {tour.location}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <FaClock className='text-secondary me-2' />
                                        Trajanje: {tour.duration} {tour.duration === 1 ? 'dan' : 'dana'}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <FaUsers className='text-secondary me-2' />
                                        Slobodna mesta: {tour.availableSpots}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>

                        <Card className='shadow-sm'>
                            <Card.Body>
                                <h4 className='mb-3'>Podaci o rezervaciji</h4>
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='date' className='mb-3'>
                                        <Form.Label>Datum polaska</Form.Label>
                                        <Form.Control
                                            type='date'
                                            value={travelDate}
                                            min={new Date().toISOString().split('T')[0]}
                                            onChange={(e) => setTravelDate(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='numPersons' className='mb-3'>
                                        <Form.Label>Broj osoba</Form.Label>
                                        <Form.Control
                                            type='number'
                                            value={numPersons}
                                            min={1}
                                            max={tour.availableSpots}
                                            onChange={(e) => setNumPersons(Number(e.target.value))}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='contactPhone' className='mb-3'>
                                        <Form.Label>Kontakt telefon</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Unesite broj telefona'
                                            value={contactPhone}
                                            onChange={(e) => setContactPhone(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button
                                        type='submit'
                                        variant='primary'
                                        className='w-100 mt-2'
                                        disabled={isBooking}
                                    >
                                        {isBooking ? 'Slanje...' : 'Potvrdi rezervaciju'}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={5}>
                        <Card className='shadow-sm'>
                            <Card.Body>
                                <h4 className='mb-3'>Pregled cene</h4>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Cena po osobi:</Col>
                                            <Col className='text-end'>
                                                {formatPrice(tour.price)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Broj osoba:</Col>
                                            <Col className='text-end'>{numPersons}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col><strong>Ukupno:</strong></Col>
                                            <Col className='text-end'>
                                                <strong className='text-primary'>
                                                    {formatPrice(totalPrice)}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default BookingScreen;