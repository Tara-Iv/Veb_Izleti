import { Table, Button, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
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

            <div className='admin-table-wrapper'>
                <Table hover responsive className='admin-table'>
                    <thead>
                        <tr>
                            <th>Slika</th>
                            <th>Naziv</th>
                            <th>Država</th>
                            <th>Kategorija</th>
                            <th>Trajanje</th>
                            <th>Cena</th>
                            <th>Status</th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map((tour) => (
                            <tr key={tour._id}>
                                <td>
                                    <img
                                        src={tour.image}
                                        alt={tour.name}
                                        className='admin-tour-img'
                                    />
                                </td>
                                <td>
                                    <strong>{tour.name}</strong>
                                    <div className='text-muted small'>{tour.location}</div>
                                </td>
                                <td>{tour.country}</td>
                                <td>
                                    <Badge bg='primary'>{tour.category}</Badge>
                                </td>
                                <td>{tour.duration} {tour.duration === 1 ? 'dan' : 'dana'}</td>
                                <td><strong>{tour.price.toLocaleString('sr-RS')} RSD</strong></td>
                                <td>
                                    {tour.available ? (
                                        <Badge bg='success'>Dostupno</Badge>
                                    ) : (
                                        <Badge bg='danger'>Nedostupno</Badge>
                                    )}
                                </td>
                                <td>
                                    <Button
                                        variant='outline-warning'
                                        size='sm'
                                        className='me-2'
                                        onClick={() => navigate(`/admin/tours/${tour._id}/edit`)}
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant='outline-danger'
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
            </div>
        </>
    );
};

export default AdminToursScreen;