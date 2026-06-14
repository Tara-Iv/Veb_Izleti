import { useState } from 'react';
import { Badge, Row, Col, Button } from 'react-bootstrap';
import { FaCheck, FaTimes, FaTrash, FaCalendarAlt, FaUsers, FaSyncAlt, FaList, FaHistory } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { formatDate, formatPrice } from '../utils/bookingUtils';
import {
    useGetBookingsQuery,
    useConfirmBookingMutation,
    useCancelBookingMutation,
    useDeleteBookingMutation,
    useCompleteExpiredBookingsMutation,
} from '../slices/bookingsApiSlice';

const AdminBookingsScreen = () => {
    const [activeTab, setActiveTab] = useState('current');

    const { data: bookings, isLoading, error, refetch } = useGetBookingsQuery();
    const [confirmBooking] = useConfirmBookingMutation();
    const [cancelBooking] = useCancelBookingMutation();
    const [deleteBooking] = useDeleteBookingMutation();
    const [completeExpired] = useCompleteExpiredBookingsMutation();

    const confirmHandler = async (bookingId) => {
        try {
            await confirmBooking(bookingId).unwrap();
            toast.success('Rezervacija potvrđena.');
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || 'Greška pri potvrđivanju.');
        }
    };

    const cancelHandler = async (bookingId) => {
        toast(
            <div>
                <p className='mb-2'>Da li ste sigurni da želite da otkažete ovu rezervaciju?</p>
                <div className='d-flex gap-2'>
                    <button
                        className='btn btn-danger btn-sm'
                        onClick={async () => {
                            toast.dismiss();
                            try {
                                await cancelBooking(bookingId).unwrap();
                                toast.success('Rezervacija otkazana.');
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

    const deleteHandler = async (bookingId) => {
        toast(
            <div>
                <p className='mb-2'>Obrisati ovu rezervaciju trajno? Biće obrisana i iz istorije korisnika.</p>
                <div className='d-flex gap-2'>
                    <button
                        className='btn btn-danger btn-sm'
                        onClick={async () => {
                            toast.dismiss();
                            try {
                                await deleteBooking(bookingId).unwrap();
                                toast.success('Rezervacija obrisana.');
                                refetch();
                            } catch (err) {
                                toast.error(err?.data?.message || 'Greška pri brisanju.');
                            }
                        }}
                    >
                        Da, obriši
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

    const completeExpiredHandler = async () => {
        try {
            const res = await completeExpired().unwrap();
            toast.success(res.message);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || 'Greška.');
        }
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

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>Upravljanje rezervacijama</h1>
                </Col>
                <Col className='text-end'>
                    <Button
                        variant='outline-info'
                        size='sm'
                        onClick={completeExpiredHandler}
                    >
                        <FaSyncAlt className='me-2' />
                        Završi istekle
                    </Button>
                </Col>
            </Row>

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
            ) : displayedBookings.length === 0 ? (
                <Message>
                    {activeTab === 'current'
                        ? 'Nema tekućih rezervacija.'
                        : 'Istorija je prazna.'}
                </Message>
            ) : (
                <div className='admin-table-wrapper'>
                    <table className='table admin-table'>
                        <thead>
                            <tr>
                                <th>Izlet</th>
                                <th>Korisnik</th>
                                <th>Datum</th>
                                <th>Br. osoba</th>
                                <th>Ukupno</th>
                                <th>Status</th>
                                <th>Akcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedBookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>
                                        <div className='d-flex align-items-center gap-2'>
                                            <img
                                                src={booking.tourImage}
                                                alt={booking.tourName}
                                                className='admin-tour-img'
                                            />
                                            <strong>{booking.tourName}</strong>
                                        </div>
                                    </td>
                                    <td>
                                        <div>{booking.user?.name}</div>
                                        <small className='text-muted'>{booking.user?.email}</small>
                                    </td>
                                    <td>
                                        <FaCalendarAlt className='text-secondary me-1' />
                                        {formatDate(booking.travelDate)}
                                    </td>
                                    <td>
                                        <FaUsers className='text-secondary me-1' />
                                        {booking.numPersons}
                                    </td>
                                    <td>
                                        <strong className='text-primary'>
                                            {formatPrice(booking.totalPrice)}
                                        </strong>
                                    </td>
                                    <td>{getStatusBadge(booking.status)}</td>
                                    <td>
                                        {booking.status === 'pending' && (
                                            <>
                                                <Button
                                                    variant='outline-success'
                                                    size='sm'
                                                    className='me-2'
                                                    onClick={() => confirmHandler(booking._id)}
                                                >
                                                    <FaCheck />
                                                </Button>
                                                <Button
                                                    variant='outline-danger'
                                                    size='sm'
                                                    onClick={() => cancelHandler(booking._id)}
                                                >
                                                    <FaTimes />
                                                </Button>
                                            </>
                                        )}
                                        {booking.status === 'confirmed' && (
                                            <Button
                                                variant='outline-danger'
                                                size='sm'
                                                onClick={() => cancelHandler(booking._id)}
                                            >
                                                <FaTimes />
                                            </Button>
                                        )}
                                        {(booking.status === 'cancelled' || booking.status === 'completed') && (
                                            <Button
                                                variant='outline-danger'
                                                size='sm'
                                                onClick={() => deleteHandler(booking._id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        )}
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