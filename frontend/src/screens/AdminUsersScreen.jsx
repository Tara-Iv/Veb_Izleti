import { Badge, Row, Col, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaUser } from 'react-icons/fa';
import Message from '../components/Message';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminUsersScreen = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const users = userInfo ? [userInfo] : [];

    const deleteHandler = (id) => {
        if (window.confirm('Da li ste sigurni da želite da obrišete ovog korisnika?')) {
            toast.success('Korisnik je obrisan.');
        }
    };

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>Upravljanje korisnicima</h1>
                </Col>
                <Col className='text-end text-muted'>
                    Ukupno: <strong>{users.length}</strong> korisnika
                </Col>
            </Row>

            {users.length === 0 ? (
                <Message>Nema korisnika u sistemu.</Message>
            ) : (
                <div className='admin-table-wrapper'>
                    <table className='table admin-table'>
                        <thead>
                            <tr>
                                <th>Korisnik</th>
                                <th>Email</th>
                                <th>Tip naloga</th>
                                <th>Status</th>
                                <th>Akcije</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <div className='d-flex align-items-center gap-3'>
                                            <div className='admin-user-avatar'>
                                                <FaUser />
                                            </div>
                                            <strong>{user.name}</strong>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.isAdmin ? (
                                            <Badge bg='danger'>Administrator</Badge>
                                        ) : (
                                            <Badge bg='secondary'>Korisnik</Badge>
                                        )}
                                    </td>
                                    <td>
                                        <Badge bg='success'>
                                            <FaCheck className='me-1' />
                                            Aktivan
                                        </Badge>
                                    </td>
                                    <td>
                                        <Button
                                            variant='outline-warning'
                                            size='sm'
                                            className='me-2'
                                            onClick={() => navigate(`/admin/users/${user._id}/edit`)}
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant='outline-danger'
                                            size='sm'
                                            onClick={() => deleteHandler(user._id)}
                                            disabled={user.isAdmin}
                                        >
                                            <FaTrash />
                                        </Button>
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

export default AdminUsersScreen;