import { Table, Button, Badge } from 'react-bootstrap';
import { FaTrash, FaEye } from 'react-icons/fa';
import Message from '../components/Message';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminBookingsScreen = () => {
    const navigate = useNavigate();
    const { bookingInfo } = useSelector((state) => state.booking);

    const bookings = bookingInfo ? [bookingInfo] : [];

    const deleteHandler = (id) => {
        if (window.confirm('Da li ste sigurni da želite da obrišete ovu rezervaciju?')) {
            toast.success('Rezervacija je obrisana.');
        }
    };

    return (
        <>
            <h1 className='mb-4'>Upravljanje rezervacijama</h1>
            {bookings.length === 0 ? (
                <Message>Nema rezervacija u sistemu.</Message>
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
                        {bookings.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking.tourName}</td>
                                <td>{booking.location}</td>
                                <td>
                                    {new Date(booking.date).toLocaleDateString('sr-RS')}
                                </td>
                                <td>{booking.numberOfPeople}</td>
                                <td>{booking.totalPrice} RSD</td>
                                <td>
                                    <Badge bg='success'>Potvrđena</Badge>
                                </td>
                                <td>
                                    <Button
                                        variant='danger'
                                        size='sm'
                                        onClick={() => deleteHandler(index)}
                                    >
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default AdminBookingsScreen;