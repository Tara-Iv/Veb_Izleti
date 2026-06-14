//glavni layout aplikacije koji sadrzi header, footer i glavni sadrzaj
//const App - funkcija koja vraca JSX layout aplikacije
//useLocation - daje informacije o trenutnom URL-u
//useEffect - dodaje ili uklanja css klase na osnovu toga da li smo na stranici za prijavu/registraciju ili ne
//Outlet je mesto gde se ubacuju child komponente (npr. HomeScreen, LoginScreen, itd.)
//ToastContainer - komponenta koja prikazuje obavestenja 

import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import { useEffect } from 'react';

const App = () => {
    const { pathname } = useLocation();
    const isAuthPage = pathname === '/login' || pathname === '/register';

    useEffect(() => {
        if (isAuthPage) {
            document.body.classList.add('auth-bg');
        } else {
            document.body.classList.remove('auth-bg');
        }
    }, [isAuthPage]);

    return (
        <>
            <ScrollToTop />
            <Header />
            <main>
                {isAuthPage ? (
                    <Outlet />
                ) : (
                    <Container className='py-3'>
                        <Outlet />
                    </Container>
                )}
            </main>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default App;