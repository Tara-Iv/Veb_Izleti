//useEffect proverava da li je korisnik već ulogovan — ako jeste, automatski ga prebacuje dalje
//redirect parametar u URL-u pamti gde je korisnik hteo da ode pre prijave — npr. ako je kliknuo rezerviši, nakon prijave vraća ga na tu stranicu
//toast.error prikazuje notifikaciju u uglu ekrana ako dođe do greške

import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

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
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            setError(err?.data?.message || 'Greška pri prijavi.');
            toast.error(err?.data?.message || 'Greška pri prijavi.');
        }
    };

    return (
        <FormContainer>
            <h1 className='mb-4'>Prijava</h1>
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
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
                <Button
                    type='submit'
                    variant='primary'
                    className='w-100 mt-2'
                    disabled={isLoading}
                >
                    {isLoading ? 'Učitavanje...' : 'Prijavi se'}
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className='mt-3'>
                <Col>
                    Nemate nalog?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Registrujte se
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;