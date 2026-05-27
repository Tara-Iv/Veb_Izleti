import { Badge, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import Message from '../components/Message';
import { useSelector } from 'react-redux';
import { formatDate, formatPrice } from '../utils/bookingUtils';
import tours from '../tours_list';

const AdminBookingsScreen = () => {
    const { bookings } = useSelector((state) => state.booking);
    
    const getTourImage = (tourId) => {
        const tour = tours.find((t) => t._id === tourId);
        return tour ? tour.image : '';
    };

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>Upravljanje rezervacijama</h1>
                </Col>
                <Col className='text-end text-muted'>
                    Ukupno: <strong>{bookings.length}</strong> rezervacija
                </Col>
            </Row>

            {bookings.length === 0 ? (
                <Message>Nema rezervacija u sistemu.</Message>
            ) : (
                <div className='admin-table-wrapper'>
                    <table className='table admin-table'>
                        <thead>
                            <tr>
                                <th>Izlet</th>
                                <th>Lokacija</th>
                                <th>Datum</th>
                                <th>Br. osoba</th>
                                <th>Cena po osobi</th>
                                <th>Ukupno</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className='d-flex align-items-center gap-3'>
                                            <img
                                                src={getTourImage(booking.tourId)}
                                                alt={booking.tourName}
                                                className='admin-tour-img'
                                            />
                                            <strong>{booking.tourName}</strong>
                                        </div>
                                    </td>
                                    <td>
                                        <FaMapMarkerAlt className='text-primary me-1' />
                                        {booking.location}
                                    </td>
                                    <td>
                                        <FaCalendarAlt className='text-secondary me-1' />
                                        {formatDate(booking.date)}
                                    </td>
                                    <td>
                                        <FaUsers className='text-secondary me-1' />
                                        {booking.numberOfPeople}
                                    </td>
                                    <td>{formatPrice(booking.pricePerPerson)}</td>
                                    <td>
                                        <strong className='text-primary'>
                                            {formatPrice(booking.totalPrice)}
                                        </strong>
                                    </td>
                                    <td>
                                        <Badge bg='success'>Potvrđena</Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default AdminBookingsScreen;