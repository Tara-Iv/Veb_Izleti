import { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useUpdateProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
        if (password !== confirmPassword) {
            toast.error('Lozinke se ne poklapaju.');
            return;
        }
        try {
            const res = await updateProfile({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success('Profil uspešno ažuriran.');
        } catch (err) {
            toast.error(err?.data?.message || 'Greška pri ažuriranju profila.');
        }
    };

    return (
        <div className='profile-wrapper'>
            <Card className='profile-card'>
                <Card.Body>
                    <div className='profile-header'>
                        <div className='profile-avatar'>
                            <FaUser />
                        </div>
                        <h2>Moj profil</h2>
                        <p>Ažurirajte vaše podatke</p>
                    </div>

                    {isLoading && <Loader />}

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name' className='mb-3'>
                            <Form.Label className='profile-label'>
                                <FaUser className='me-2' />
                                Ime i prezime
                            </Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Unesite ime i prezime'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='profile-input'
                            />
                        </Form.Group>

                        <Form.Group controlId='email' className='mb-3'>
                            <Form.Label className='profile-label'>
                                <FaEnvelope className='me-2' />
                                Email adresa
                            </Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Unesite email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='profile-input'
                            />
                        </Form.Group>

                        <Form.Group controlId='password' className='mb-3'>
                            <Form.Label className='profile-label'>
                                <FaLock className='me-2' />
                                Nova lozinka
                            </Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Unesite novu lozinku'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='profile-input'
                            />
                        </Form.Group>

                        <Form.Group controlId='confirmPassword' className='mb-4'>
                            <Form.Label className='profile-label'>
                                <FaLock className='me-2' />
                                Potvrdite lozinku
                            </Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Ponovite lozinku'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='profile-input'
                            />
                        </Form.Group>

                        <Button
                            type='submit'
                            variant='primary'
                            className='w-100 profile-btn'
                            disabled={isLoading}
                        >
                            {isLoading ? 'Čuvanje...' : 'Sačuvaj izmene'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProfileScreen;