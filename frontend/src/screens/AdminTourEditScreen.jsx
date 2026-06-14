import { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import {
    useGetTourDetailsQuery,
    useUpdateTourMutation,
    useCreateTourMutation,
} from '../slices/toursApiSlice';

const AdminTourEditScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [country, setCountry] = useState('');
    const [isCustomCountry, setIsCustomCountry] = useState(false);
    const [customCountry, setCustomCountry] = useState('');
    const predefinedCountries = ['Italija', 'Španija', 'Francuska', 'Grčka'];
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [duration, setDuration] = useState(1);
    const [price, setPrice] = useState(0);
    const [maxGroupSize, setMaxGroupSize] = useState(10);
    const [available, setAvailable] = useState(true);

    const { data: tour, isLoading, error } = useGetTourDetailsQuery(id, {
        skip: !isEditing,
    });

    const [updateTour, { isLoading: isUpdating }] = useUpdateTourMutation();
    const [createTour, { isLoading: isCreating }] = useCreateTourMutation();

    useEffect(() => {
        if (tour) {
            setName(tour.name);
            setImage(tour.image);
            setDescription(tour.description);
            if (predefinedCountries.includes(tour.country)) {
                setCountry(tour.country);
                setIsCustomCountry(false);
            } else {
                setCountry('__other__');
                setCustomCountry(tour.country);
                setIsCustomCountry(true);
            }
            setLocation(tour.location);
            setCategory(tour.category);
            setDuration(tour.duration);
            setPrice(tour.price);
            setMaxGroupSize(tour.maxGroupSize);
            setAvailable(tour.available);
        }
    }, [tour]);

    const submitHandler = async (e) => {
    e.preventDefault();

    const finalCountry = isCustomCountry ? customCountry.trim() : country;

    if (!finalCountry) {
        toast.error('Molimo unesite ili izaberite državu.');
        return;
    }

    if (!name || !image || !description || !location || !category) {
        toast.error('Popunite sva polja.');
        return;
    }

        try {
            if (isEditing) {
                await updateTour({
                    _id: id,
                    name, image, description, country: finalCountry, location,
                    category, duration, price, maxGroupSize,
                    available,
                }).unwrap();
                toast.success('Izlet uspešno ažuriran.');
            } else {
                await createTour({
                    name, image, description, country: finalCountry, location,
                    category, duration, price, maxGroupSize,
                    available,
                }).unwrap();
                toast.success('Izlet uspešno dodat.');
            }
            navigate('/admin/tours');
        } catch (err) {
            toast.error(err?.data?.message || 'Greška pri čuvanju.');
        }
    };

    return (
        <>
            <Button
                variant='outline-primary'
                className='mb-4'
                onClick={() => navigate('/admin/tours')}
            >
                ← Nazad
            </Button>

            <Card className='profile-card mx-auto' style={{ maxWidth: '700px' }}>
                <Card.Body>
                    <h2 className='text-center mb-4'>
                        {isEditing ? 'Izmeni izlet' : 'Dodaj novi izlet'}
                    </h2>

                    {isLoading ? <Loader /> : error ? (
                        <Message variant='danger'>{error?.data?.message}</Message>
                    ) : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name' className='mb-3'>
                                <Form.Label>Naziv izleta</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Unesite naziv'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='profile-input'
                                />
                            </Form.Group>

                            <Form.Group controlId='image' className='mb-3'>
                                <Form.Label>URL slike</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Unesite URL slike'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className='profile-input'
                                />
                            </Form.Group>

                            <Form.Group controlId='description' className='mb-3'>
                                <Form.Label>Opis</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows={4}
                                    placeholder='Unesite opis izleta'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className='profile-input'
                                />
                            </Form.Group>

                            <Form.Group controlId='country' className='mb-3'>
                                <Form.Label>Država</Form.Label>
                                <Form.Select
                                    value={country}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setCountry(value);
                                        setIsCustomCountry(value === '__other__');
                                    }}
                                    className='profile-input'
                                >
                                    <option value=''>Izaberite državu</option>
                                    <option value='Italija'>Italija</option>
                                    <option value='Španija'>Španija</option>
                                    <option value='Francuska'>Francuska</option>
                                    <option value='Grčka'>Grčka</option>
                                    <option value='__other__'>+ Dodaj novu državu</option>
                                </Form.Select>
                                {isCustomCountry && (
                                    <Form.Control
                                        type='text'
                                        placeholder='Unesite naziv nove države'
                                        value={customCountry}
                                        onChange={(e) => setCustomCountry(e.target.value)}
                                        className='profile-input mt-2'
                                    />
                                )}
                            </Form.Group>

                            <Form.Group controlId='location' className='mb-3'>
                                <Form.Label>Lokacija</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='npr. Rim, Italija'
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className='profile-input'
                                />
                            </Form.Group>

                            <Form.Group controlId='category' className='mb-3'>
                                <Form.Label>Kategorija</Form.Label>
                                <Form.Select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className='profile-input'
                                >
                                    <option value=''>Izaberite kategoriju</option>
                                    <option value='Kultura'>Kultura</option>
                                    <option value='Priroda'>Priroda</option>
                                    <option value='Istorija'>Istorija</option>
                                    <option value='Avantura'>Avantura</option>
                                    <option value='Romantika'>Romantika</option>
                                    <option value='Sport'>Sport</option>
                                    <option value='Luksuz'>Luksuz</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId='duration' className='mb-3'>
                                <Form.Label>Trajanje (dani)</Form.Label>
                                <Form.Control
                                    type='number'
                                    min={1}
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    className='profile-input'
                                />
                            </Form.Group>

                            <Form.Group controlId='price' className='mb-3'>
                                <Form.Label>Cena po osobi (RSD)</Form.Label>
                                <Form.Control
                                    type='number'
                                    min={0}
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className='profile-input'
                                />
                            </Form.Group>

                            <Form.Group controlId='maxGroupSize' className='mb-3'>
                                <Form.Label>Maksimalna veličina grupe</Form.Label>
                                <Form.Control
                                    type='number'
                                    min={1}
                                    value={maxGroupSize}
                                    onChange={(e) => setMaxGroupSize(Number(e.target.value))}
                                    className='profile-input'
                                />
                            </Form.Group>

                            <Form.Group controlId='available' className='mb-4'>
                                <Form.Check
                                    type='checkbox'
                                    label='Izlet je dostupan'
                                    checked={available}
                                    onChange={(e) => setAvailable(e.target.checked)}
                                />
                            </Form.Group>

                            <Button
                                type='submit'
                                variant='primary'
                                className='w-100 profile-btn'
                                disabled={isUpdating || isCreating}
                            >
                                {isUpdating || isCreating
                                    ? 'Čuvanje...'
                                    : isEditing
                                        ? 'Sačuvaj izmene'
                                        : 'Dodaj izlet'}
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </>
    );
};

export default AdminTourEditScreen;