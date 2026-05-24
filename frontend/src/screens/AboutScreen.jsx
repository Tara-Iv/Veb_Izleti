import { Row, Col, Card } from 'react-bootstrap';
import { FaGlobe, FaUsers, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const AboutScreen = () => {
    return (
        <>
            <div className='text-center my-5'>
                <h1>O nama</h1>
                <p className='lead mt-3'>
                    EasyTrip je platforma za pregled i rezervaciju turističkih izleta
                    po najlepšim evropskim destinacijama. Naš cilj je da svako putovanje
                    bude jednostavno, bezbedno i nezaboravno.
                </p>
            </div>

            <Row className='mb-5'>
                <Col md={3} sm={6} className='mb-4'>
                    <Card className='text-center h-100 shadow-sm'>
                        <Card.Body>
                            <FaGlobe size={40} className='text-primary mb-3' />
                            <Card.Title>Široka ponuda</Card.Title>
                            <Card.Text>
                                Izleti u Italiji, Španiji, Francuskoj i Grčkoj —
                                sve na jednom mestu.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className='mb-4'>
                    <Card className='text-center h-100 shadow-sm'>
                        <Card.Body>
                            <FaUsers size={40} className='text-primary mb-3' />
                            <Card.Title>Iskusni vodiči</Card.Title>
                            <Card.Text>
                                Svaki izlet vodi sertifikovani turistički vodič
                                sa višegodišnjim iskustvom.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className='mb-4'>
                    <Card className='text-center h-100 shadow-sm'>
                        <Card.Body>
                            <FaShieldAlt size={40} className='text-primary mb-3' />
                            <Card.Title>Sigurnost</Card.Title>
                            <Card.Text>
                                Bezbednost naših putnika je na prvom mestu.
                                Svi izleti su osigurani i provereni.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className='mb-4'>
                    <Card className='text-center h-100 shadow-sm'>
                        <Card.Body>
                            <FaHeadset size={40} className='text-primary mb-3' />
                            <Card.Title>Podrška</Card.Title>
                            <Card.Text>
                                Naš tim je dostupan 24/7 za sva vaša pitanja
                                i nedoumice pre i tokom putovanja.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className='mb-5'>
                <Col md={6}>
                    <h2>Naša misija</h2>
                    <p>
                        Verujemo da putovanje menja ljude. EasyTrip je osnovan
                        sa ciljem da svima omogući pristup kvalitetnim turističkim
                        izletima po pristupačnim cenama. Svaki izlet pažljivo biramo
                        i organizujemo kako bi vaše iskustvo bilo što bogatije.
                    </p>
                </Col>
                <Col md={6}>
                    <h2>Kako funkcioniše?</h2>
                    <p>
                        Pregledajte našu ponudu izleta, izaberite destinaciju koja
                        vas zanima i rezervišite mesto u nekoliko klikova. Nakon
                        registracije i prijave, rezervacija traje manje od minut.
                        Potvrdu rezervacije dobijate na email.
                    </p>
                </Col>
            </Row>
        </>
    );
};

export default AboutScreen;