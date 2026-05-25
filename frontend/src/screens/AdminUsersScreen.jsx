import { Table, Button, Badge } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
            <h1 className='mb-4'>Upravljanje korisnicima</h1>
            {users.length === 0 ? (
                <Message>Nema korisnika u sistemu.</Message>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ime i prezime</th>
                            <th>Email</th>
                            <th>Administrator</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? (
                                        <FaCheck className='text-success' />
                                    ) : (
                                        <FaTimes className='text-danger' />
                                    )}
                                </td>
                                <td>
                                    <Button
                                        variant='warning'
                                        size='sm'
                                        className='me-2'
                                        onClick={() => navigate(`/admin/users/${user._id}/edit`)}
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant='danger'
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
                </Table>
            )}
        </>
    );
};

export default AdminUsersScreen;