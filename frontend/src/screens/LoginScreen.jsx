//useEffect proverava da li je korisnik već ulogovan — ako jeste, automatski ga prebacuje dalje
//redirect parametar u URL-u pamti gde je korisnik hteo da ode pre prijave — npr. ako je kliknuo rezerviši, nakon prijave vraća ga na tu stranicu
//toast.error prikazuje notifikaciju u uglu ekrana ako dođe do greške

import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) navigate(redirect);
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || 'Greška pri prijavi.');
        }
    };

    return (
        <div className='auth-wrapper'>
            <div className='auth-card'>
                <div className='auth-header'>
                    <h2>Dobrodošli</h2>
                    <p>Prijavite se na vaš nalog</p>
                </div>

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email' className='auth-input-group mb-3'>
                        <div className='auth-input-wrapper'>
                            <FaEnvelope className='auth-input-icon' />
                            <Form.Control
                                type='email'
                                placeholder='Email adresa'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='auth-input'
                            />
                        </div>
                    </Form.Group>

                    <Form.Group controlId='password' className='auth-input-group mb-4'>
                        <div className='auth-input-wrapper'>
                            <FaLock className='auth-input-icon' />
                            <Form.Control
                                type='password'
                                placeholder='Lozinka'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='auth-input'
                            />
                        </div>
                    </Form.Group>

                    <Button
                        type='submit'
                        className='auth-btn w-100 mb-3'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Učitavanje...' : 'Prijavi se'}
                    </Button>
                </Form>

                <div className='auth-footer'>
                    Nemate nalog?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Registrujte se
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;