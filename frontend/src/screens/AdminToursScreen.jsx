import { Table, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import tours from '../tours_list';

const AdminToursScreen = () => {
    const navigate = useNavigate();

    const deleteHandler = (id) => {
        if (window.confirm('Da li ste sigurni da želite da obrišete ovaj izlet?')) {
            toast.success('Izlet je obrisan.');
        }
    };

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>Upravljanje izletima</h1>
                </Col>
                <Col className='text-end'>
                    <Button variant='primary' onClick={() => navigate('/admin/tours/create')}>
                        <FaPlus className='me-2' />
                        Dodaj izlet
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Naziv</th>
                        <th>Država</th>
                        <th>Lokacija</th>
                        <th>Kategorija</th>
                        <th>Trajanje</th>
                        <th>Cena</th>
                        <th>Dostupnost</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tours.map((tour) => (
                        <tr key={tour._id}>
                            <td>{tour._id}</td>
                            <td>{tour.name}</td>
                            <td>{tour.country}</td>
                            <td>{tour.location}</td>
                            <td>{tour.category}</td>
                            <td>{tour.duration} {tour.duration === 1 ? 'dan' : 'dana'}</td>
                            <td>{tour.price} RSD</td>
                            <td>
                                {tour.available ? (
                                    <span className='text-success fw-semibold'>Dostupno</span>
                                ) : (
                                    <span className='text-danger fw-semibold'>Nedostupno</span>
                                )}
                            </td>
                            <td>
                                <Button
                                    variant='warning'
                                    size='sm'
                                    className='me-2'
                                    onClick={() => navigate(`/admin/tours/${tour._id}/edit`)}
                                >
                                    <FaEdit />
                                </Button>
                                <Button
                                    variant='danger'
                                    size='sm'
                                    onClick={() => deleteHandler(tour._id)}
                                >
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default AdminToursScreen;