import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError('Lozinke se ne poklapaju.');
            toast.error('Lozinke se ne poklapaju.');
            return;
        }
        try {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            setError(err?.data?.message || 'Greška pri registraciji.');
            toast.error(err?.data?.message || 'Greška pri registraciji.');
        }
    };

    return (
        <FormContainer>
            <h1 className='mb-4'>Registracija</h1>
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
                    <Form.Label>Lozinka</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Unesite lozinku'
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
                    {isLoading ? 'Učitavanje...' : 'Registruj se'}
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className='mt-3'>
                <Col>
                    Već imate nalog?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Prijavite se
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;