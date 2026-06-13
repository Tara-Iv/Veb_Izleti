import { Badge, Row, Col, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaUser } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../slices/usersApiSlice';

const AdminUsersScreen = () => {
    const navigate = useNavigate();

    const { data: users, isLoading, error, refetch } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();

    const deleteHandler = async (userId) => {
    toast(
        <div>
            <p className='mb-2'>Da li ste sigurni da želite da obrišete ovog korisnika?</p>
            <div className='d-flex gap-2'>
                <button
                    className='btn btn-danger btn-sm'
                    onClick={async () => {
                        toast.dismiss();
                        try {
                            await deleteUser(userId).unwrap();
                            toast.success('Korisnik je obrisan.');
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

    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1>Upravljanje korisnicima</h1>
                </Col>
                <Col className='text-end text-muted'>
                    Ukupno: <strong>{users?.length || 0}</strong> korisnika
                </Col>
            </Row>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
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
                                        <Badge bg='success'>Aktivan</Badge>
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