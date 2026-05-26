import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) navigate(redirect);
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Lozinke se ne poklapaju.');
            return;
        }
        try {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || 'Greška pri registraciji.');
        }
    };

    return (
        <div className='auth-wrapper'>
            <div className='auth-card'>
                <div className='auth-header'>
                    <h2>Registracija</h2>
                    <p>Kreirajte vaš novi nalog</p>
                </div>

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='auth-input-group mb-3'>
                        <div className='auth-input-wrapper'>
                            <FaUser className='auth-input-icon' />
                            <Form.Control
                                type='text'
                                placeholder='Ime i prezime'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='auth-input'
                            />
                        </div>
                    </Form.Group>

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

                    <Form.Group controlId='password' className='auth-input-group mb-3'>
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

                    <Form.Group controlId='confirmPassword' className='auth-input-group mb-4'>
                        <div className='auth-input-wrapper'>
                            <FaLock className='auth-input-icon' />
                            <Form.Control
                                type='password'
                                placeholder='Potvrdite lozinku'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='auth-input'
                            />
                        </div>
                    </Form.Group>

                    <Button
                        type='submit'
                        className='auth-btn w-100 mb-3'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Učitavanje...' : 'Registruj se'}
                    </Button>
                </Form>

                <div className='auth-footer'>
                    Već imate nalog?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Prijavite se
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;