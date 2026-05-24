// isključivo pregledu svih dostupnih izleta svim korisnicima

import { Row, Col } from 'react-bootstrap';
import Tour from '../components/Tour';
import tours from '../tours_list';

const ToursScreen = () => {
    const countries = [...new Set(tours.map((tour) => tour.country))];

    return (
        <>
            <h1 className='text-center my-4'>Svi izleti</h1>
            {countries.map((country) => (
                <div key={country} className='mb-5'>
                    <h2 className='mb-3'>{country}</h2>
                    <hr />
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
    );
};

export default ToursScreen;