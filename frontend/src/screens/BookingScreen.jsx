//Korisnik bira datum polaska i broj osoba, a cena se automatski računa u realnom vremenu
//min={new Date().toISOString().split('T')[0]} sprečava izbor datuma u prošlosti
//max={tour.maxGroupSize} ograničava broj osoba na maksimum grupe
//Podaci o rezervaciji se čuvaju u Redux store kroz bookingSlice
//Ova stranica je zaštićena PrivateRoute — dostupna samo ulogovanim korisnicima

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';
import Message from '../components/Message';
import { useDispatch } from 'react-redux';
import { setBookingInfo } from '../slices/bookingSlice';
import { toast } from 'react-toastify';
import tours from '../tours_list';

const BookingScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const tour = tours.find((t) => t._id === id);

    const [date, setDate] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState(1);

    if (!tour) {
        return <Message variant='danger'>Izlet nije pronađen.</Message>;
    }

    const totalPrice = tour.price * numberOfPeople;

    const submitHandler = (e) => {
        e.preventDefault();
        if (!date) {
            toast.error('Molimo izaberite datum.');
            return;
        }
        dispatch(setBookingInfo({
            tourId: tour._id,
            tourName: tour.name,
            location: tour.location,
            date,
            numberOfPeople,
            pricePerPerson: tour.price,
            totalPrice,
        }));
        navigate('/mybookings');
        toast.success('Rezervacija uspešno kreirana!');
    };

    return (
        <>
            <h1 className='mb-4'>Rezervacija izleta</h1>
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
                                    Maksimalno {tour.maxGroupSize} osoba
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
                                        value={date}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId='numberOfPeople' className='mb-3'>
                                    <Form.Label>Broj osoba</Form.Label>
                                    <Form.Control
                                        type='number'
                                        value={numberOfPeople}
                                        min={1}
                                        max={tour.maxGroupSize}
                                        onChange={(e) => setNumberOfPeople(Number(e.target.value))}
                                    />
                                </Form.Group>
                                <Button
                                    type='submit'
                                    variant='primary'
                                    className='w-100 mt-2'
                                >
                                    Potvrdi rezervaciju
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
                                        <Col className='text-end'>{tour.price} RSD</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Broj osoba:</Col>
                                        <Col className='text-end'>{numberOfPeople}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Ukupno:</strong></Col>
                                        <Col className='text-end'>
                                            <strong className='text-primary'>
                                                {totalPrice} RSD
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default BookingScreen;