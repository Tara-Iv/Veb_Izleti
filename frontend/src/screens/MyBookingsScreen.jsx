import { Table, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import { clearBookingInfo } from '../slices/bookingSlice';
import { FaTrash, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MyBookingsScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { bookingInfo } = useSelector((state) => state.booking);

    const cancelHandler = () => {
        dispatch(clearBookingInfo());
        toast.success('Rezervacija je otkazana.');
    };

    return (
        <>
            <h1 className='mb-4'>Moje rezervacije</h1>
            {!bookingInfo ? (
                <Message>
                    Nemate aktivnih rezervacija.{' '}
                    <span
                        style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => navigate('/tours')}
                    >
                        Pregledajte izlete
                    </span>
                </Message>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Izlet</th>
                            <th>Lokacija</th>
                            <th>Datum</th>
                            <th>Broj osoba</th>
                            <th>Ukupna cena</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{bookingInfo.tourName}</td>
                            <td>
                                <FaMapMarkerAlt className='text-primary me-1' />
                                {bookingInfo.location}
                            </td>
                            <td>{new Date(bookingInfo.date).toLocaleDateString('sr-RS')}</td>
                            <td>{bookingInfo.numberOfPeople}</td>
                            <td>{bookingInfo.totalPrice} RSD</td>
                            <td>
                                <Badge bg='success'>Potvrđena</Badge>
                            </td>
                            <td>
                                <Button
                                    variant='danger'
                                    size='sm'
                                    onClick={cancelHandler}
                                >
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default MyBookingsScreen;