// isključivo pregledu svih dostupnih izleta svim korisnicima

import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Tour from '../components/Tour';
import tours from '../tours_list';

const ToursScreen = () => {
    const [selectedCountry, setSelectedCountry] = useState('Svi');
    const countries = ['Svi', ...new Set(tours.map((tour) => tour.country))];

    const filteredTours = selectedCountry === 'Svi'
        ? tours
        : tours.filter((tour) => tour.country === selectedCountry);

    const groupedByCountry = [...new Set(filteredTours.map((t) => t.country))];

    return (
        <>
            <h1 className='text-center my-4'>Izleti</h1>

            <div className='tours-filter-wrapper mb-5'>
                {countries.map((country) => (
                    <Button
                        key={country}
                        className={`tours-filter-btn ${selectedCountry === country ? 'active' : ''}`}
                        onClick={() => setSelectedCountry(country)}
                    >
                        {country}
                    </Button>
                ))}
            </div>

            {groupedByCountry.map((country) => (
                <div key={country} className='mb-5'>
                    <h2 className='country-title mb-4'>{country}</h2>
                    <Row>
                        {filteredTours
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