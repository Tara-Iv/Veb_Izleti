import { Row, Col } from 'react-bootstrap';
import Tour from '../components/Tour';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetToursQuery } from '../slices/toursApiSlice';

const HomeScreen = () => {
    const { data: tours, isLoading, error } = useGetToursQuery();

    const countries = tours ? [...new Set(tours.map((tour) => tour.country))] : [];

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    <div className='hero-section'>
                        <h1>Otkrijte Evropu</h1>
                        <p>
                            Izaberite svoju sledeću avanturu iz naše ponude izleta
                            po najlepšim evropskim destinacijama.
                        </p>
                    </div>
                    {countries.map((country) => (
                        <div key={country} className='mb-5'>
                            <h2 className='country-title mb-4'>{country}</h2>
                            <Row>
                                {tours
                                    .filter((tour) => tour.country === country)
                                    .map((tour) => (
                                        <Col key={tour._id} sm={12} md={6} lg={3}>
                                            <Tour tour={tour} />
                                        </Col>
                                    ))}
                            </Row>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default HomeScreen;