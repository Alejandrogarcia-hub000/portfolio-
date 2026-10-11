import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import { useInteractions } from './hooks/useInteractions';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { LoadingScreen } from './components/LoadingScreen';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

export default function App() {
  useLenis();
  useInteractions();

  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.classList.toggle('nav-active', menuOpen);
    const hamburger = document.querySelector('.btn-hamburger');
    if (hamburger) hamburger.classList.toggle('active', menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isContactPage = location.pathname.includes('contact');

  return (
    <>
      <div className="no-scroll-overlay" />
      <LoadingScreen />
      <main className="main no-touch">
        <Navbar onToggleMenu={toggleMenu} />
        <MobileNav onClose={closeMenu} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work.html" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/about.html" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact.html" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        {!isContactPage && <Footer />}
      </main>
    </>
  );
}
