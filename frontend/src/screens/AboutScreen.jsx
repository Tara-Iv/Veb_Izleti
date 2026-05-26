import { Row, Col, Card } from 'react-bootstrap';
import { FaGlobe, FaUsers, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const AboutScreen = () => {
    return (
        <>
            <div className='text-center my-5'>
                <h1>Upoznajte nas</h1>
                <p className='lead mt-3'>
                    EasyTrip je platforma za pregled i rezervaciju turističkih izleta
                    po najlepšim evropskim destinacijama. Naš cilj je da svako putovanje
                    bude jednostavno, bezbedno i nezaboravno.
                </p>
            </div>

            <Row className='mb-5'>
                <Col md={3} sm={6} className='mb-4'>
                    <Card className='about-card text-center h-100'>
                        <Card.Body className='p-4'>
                            <div className='about-card-icon'>
                                <FaGlobe />
                            </div>
                            <Card.Title className='about-card-title'>Široka ponuda</Card.Title>
                            <Card.Text className='text-muted'>
                                Izleti u Italiji, Španiji, Francuskoj i Grčkoj — sve na jednom mestu.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className='mb-4'>
                    <Card className='about-card text-center h-100'>
                        <Card.Body className='p-4'>
                            <div className='about-card-icon'>
                                <FaUsers />
                            </div>
                            <Card.Title className='about-card-title'>Iskusni vodiči</Card.Title>
                            <Card.Text className='text-muted'>
                                Svaki izlet vodi sertifikovani turistički vodič sa višegodišnjim iskustvom.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className='mb-4'>
                    <Card className='about-card text-center h-100'>
                        <Card.Body className='p-4'>
                            <div className='about-card-icon'>
                                <FaShieldAlt />
                            </div>
                            <Card.Title className='about-card-title'>Sigurnost</Card.Title>
                            <Card.Text className='text-muted'>
                                Bezbednost naših putnika je na prvom mestu. Svi izleti su osigurani i provereni.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} sm={6} className='mb-4'>
                    <Card className='about-card text-center h-100'>
                        <Card.Body className='p-4'>
                            <div className='about-card-icon'>
                                <FaHeadset />
                            </div>
                            <Card.Title className='about-card-title'>Podrška 24/7</Card.Title>
                            <Card.Text className='text-muted'>
                                Naš tim je dostupan 24/7 za sva vaša pitanja i nedoumice pre i tokom putovanja.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className='mb-5'>
                <Col md={6} className='mb-4'>
                    <div className='about-info-card'>
                        <h2>Naša misija</h2>
                        <div className='about-info-divider' />
                        <p>
                            Verujemo da putovanje menja ljude. EasyTrip je osnovan
                            sa ciljem da svima omogući pristup kvalitetnim turističkim
                            izletima po pristupačnim cenama. Svaki izlet pažljivo biramo
                            i organizujemo kako bi vaše iskustvo bilo što bogatije.
                        </p>
                        <p className='text-muted'>
                            Od veličanstvenih gradova Italije do rajskih plaža Grčke —
                            mi smo tu da vaše putovanje bude savršeno.
                        </p>
                    </div>
                </Col>
                <Col md={6} className='mb-4'>
                    <div className='about-info-card'>
                        <h2>Kako funkcioniše?</h2>
                        <div className='about-info-divider' />
                        <div className='about-steps'>
                            <div className='about-step'>
                                <div className='about-step-number'>1</div>
                                <div>
                                    <strong>Pregledajte ponudu</strong>
                                    <p className='text-muted mb-0'>Izaberite destinaciju koja vas zanima.</p>
                                </div>
                            </div>
                            <div className='about-step'>
                                <div className='about-step-number'>2</div>
                                <div>
                                    <strong>Registrujte se</strong>
                                    <p className='text-muted mb-0'>Kreirajte nalog za samo par sekundi.</p>
                                </div>
                            </div>
                            <div className='about-step'>
                                <div className='about-step-number'>3</div>
                                <div>
                                    <strong>Rezervišite</strong>
                                    <p className='text-muted mb-0'>Izaberite datum i broj osoba.</p>
                                </div>
                            </div>
                            <div className='about-step'>
                                <div className='about-step-number'>4</div>
                                <div>
                                    <strong>Uživajte!</strong>
                                    <p className='text-muted mb-0'>Potvrdite rezervaciju i krenite na put.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default AboutScreen;