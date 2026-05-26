//useParams dohvata id iz URL-a i pronalazi odgovarajući izlet iz liste
//Dugme za rezervaciju se menja zavisno od toga da li je korisnik ulogovan — gost vidi "Prijavite se za rezervaciju" i odvodi se na login, ulogovani korisnik vidi "Rezerviši mesto"
//navigate(-1) dugme "Nazad" vraća korisnika na prethodnu stranicu
//Ako izlet nije pronađen prikazuje se poruka greške

import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Badge } from 'react-bootstrap';
import { FaMapMarkerAlt, FaClock, FaUsers, FaArrowLeft } from 'react-icons/fa';
import Message from '../components/Message';
import Rating from '../components/Rating';
import tours from '../tours_list';
import { useSelector } from 'react-redux';

const TourScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const tour = tours.find((t) => t._id === id);

    if (!tour) {
        return <Message variant='danger'>Izlet nije pronađen.</Message>;
    }

    const handleBooking = () => {
        if (userInfo) {
            navigate(`/booking/${tour._id}`);
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <Button
                className='mb-4'
                variant='outline-primary'
                onClick={() => navigate(-1)}
            >
                <FaArrowLeft className='me-2' />
                Nazad
            </Button>
            <Row>
                <Col md={7}>
                    <Image src={tour.image} alt={tour.name} fluid rounded />
                </Col>
                <Col md={5}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{tour.name}</h2>
                            <Badge bg='primary'>{tour.category}</Badge>
                        </ListGroup.Item>
                        <ListGroup.Item>
                             <Rating value={tour.rating} text={`${tour.numReviews} recenzija`} />
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
                            Maksimalno {tour.maxGroupSize} osoba u grupi
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{tour.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                    <Card className='mt-3'>
                        <Card.Body>
                            <Row className='align-items-center mb-3'>
                                <Col>
                                    <strong>Cena po osobi:</strong>
                                </Col>
                                <Col>
                                    <h4 className='text-primary mb-0'>{tour.price} RSD</h4>
                                </Col>
                            </Row>
                            <Button
                                className='w-100'
                                variant='primary'
                                onClick={handleBooking}
                                disabled={!tour.available}
                            >
                                {tour.available
                                    ? userInfo
                                        ? 'Rezerviši mesto'
                                        : 'Prijavite se za rezervaciju'
                                    : 'Nije dostupno'}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default TourScreen;