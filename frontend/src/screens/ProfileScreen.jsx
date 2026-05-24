import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useUpdateProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError('Lozinke se ne poklapaju.');
            toast.error('Lozinke se ne poklapaju.');
            return;
        }
        try {
            const res = await updateProfile({
                name,
                email,
                password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success('Profil uspešno ažuriran.');
        } catch (err) {
            setError(err?.data?.message || 'Greška pri ažuriranju profila.');
            toast.error(err?.data?.message || 'Greška pri ažuriranju profila.');
        }
    };

    return (
        <Row>
            <Col md={4}>
                <h1 className='mb-4'>Moj profil</h1>
                {error && <Message variant='danger'>{error}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='mb-3'>
                        <Form.Label>Ime i prezime</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Unesite ime i prezime'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='email' className='mb-3'>
                        <Form.Label>Email adresa</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Unesite email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password' className='mb-3'>
                        <Form.Label>Nova lozinka</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Unesite novu lozinku'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='confirmPassword' className='mb-3'>
                        <Form.Label>Potvrdite lozinku</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Ponovite lozinku'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button
                        type='submit'
                        variant='primary'
                        className='w-100 mt-2'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Čuvanje...' : 'Sačuvaj izmene'}
                    </Button>
                    {isLoading && <Loader />}
                </Form>
            </Col>
        </Row>
    );
};

export default ProfileScreen;