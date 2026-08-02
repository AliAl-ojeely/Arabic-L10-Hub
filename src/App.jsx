import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Translations from './pages/Translations/Translations';
import GameDetails from './pages/GameDetails/GameDetails';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import './App.css';

function App() {
    const location = useLocation();

    const [isAppLoading, setIsAppLoading] = useState(() => {
        const hasVisited = sessionStorage.getItem('hasVisitedThisSession');
        return !hasVisited;
    });

    // 1. التأثير الخاص بشاشة التحميل
    useEffect(() => {
        if (isAppLoading) {
            const timer = setTimeout(() => {
                setIsAppLoading(false);
                sessionStorage.setItem('hasVisitedThisSession', 'true');
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isAppLoading]);

    // 2. التأثير الجديد الخاص بالتمرير للأعلى (Scroll to Top)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]); // يعمل هذا التأثير في كل مرة يتغير فيها رابط الصفحة

    if (isAppLoading) {
        return (
            <div className="global-loading-screen">
                <div className="custom-spinner"></div>
                <h2 className="loading-text">جاري تجهيز المنصة...</h2>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: '1', display: 'flex' }}>
                <div key={location.pathname} className="page-transition">
                    <Routes location={location}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/translations" element={<Translations />} />
                        <Route path="/translations/:folderName" element={<GameDetails />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;