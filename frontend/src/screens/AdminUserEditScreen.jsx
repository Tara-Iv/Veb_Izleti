import { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../slices/usersApiSlice';

const AdminUserEditScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const { data: user, isLoading, error } = useGetUserByIdQuery(id);
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ _id: id, name, email, isAdmin }).unwrap();
            toast.success('Korisnik uspešno ažuriran.');
            navigate('/admin/users');
        } catch (err) {
            toast.error(err?.data?.message || 'Greška pri ažuriranju.');
        }
    };

    return (
        <>
            <Button
                variant='outline-primary'
                className='mb-4'
                onClick={() => navigate('/admin/users')}
            >
                ← Nazad
            </Button>

            <Card className='profile-card mx-auto' style={{ maxWidth: '500px' }}>
                <Card.Body>
                    <h2 className='text-center mb-4'>Izmeni korisnika</h2>

                    {isLoading ? <Loader /> : error ? (
                        <Message variant='danger'>{error?.data?.message}</Message>
                    ) : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' className='mb-3'>
                                <Form.Label>Ime i prezime</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Unesite ime i prezime'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='profile-input'
                                />
                            </Form.Group>

                            <Form.Group controlId='email' className='mb-3'>
                                <Form.Label>Email adresa</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Unesite email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='profile-input'
                                />
                            </Form.Group>

                            <Form.Group controlId='isAdmin' className='mb-4'>
                                <Form.Check
                                    type='checkbox'
                                    label='Administrator'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                />
                            </Form.Group>

                            <Button
                                type='submit'
                                variant='primary'
                                className='w-100 profile-btn'
                                disabled={isUpdating}
                            >
                                {isUpdating ? 'Čuvanje...' : 'Sačuvaj izmene'}
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </>
    );
};

export default AdminUserEditScreen;