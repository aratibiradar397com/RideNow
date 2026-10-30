import { useEffect, useState } from 'react';
import { Bike, MapPin, Search, Menu, X } from 'lucide-react';

function getActiveLink(hash) {
  if (hash.startsWith('#/vehicle/')) return '#featured';
  if (hash === '#/help/contact') return '#/help/contact';
  return hash || '#home';
}

export default function Header({ location, onLocationChange, onHomeClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(() => getActiveLink(window.location.hash));

  useEffect(() => {
    function syncActiveLink() {
      setActiveLink(getActiveLink(window.location.hash));
    }

    window.addEventListener('hashchange', syncActiveLink);
    return () => window.removeEventListener('hashchange', syncActiveLink);
  }, []);

  function handleNavigationClick(event) {
    setActiveLink(event.currentTarget.getAttribute('href'));
    setMenuOpen(false);
  }

  function goToBooking() {
    const bookingForm = document.querySelector('#booking');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.location.hash = '#booking';
  }

  function goHome(event) {
    setMenuOpen(false);
    onHomeClick();
    if (window.location.hash === '#home') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={goHome} aria-label="RideNow home">
        <Bike size={29} strokeWidth={2.5} />
        <span>Ride<span className="brand-accent">Now</span></span>
      </a>

      <button
        className="mobile-menu-toggle"
        type="button"
        onClick={() => setMenuOpen(open => !open)}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      <nav
        id="primary-navigation"
        className={menuOpen ? 'main-nav open' : 'main-nav'}
      >
        <a className={activeLink === '#home' ? 'active' : ''} href="#home" onClick={event => {
          goHome(event);
          setActiveLink('#home');
        }}>Home</a>
        <a className={activeLink === '#featured' ? 'active' : ''} href="#featured" onClick={handleNavigationClick}>
          Explore Vehicles
        </a>
        <a className={activeLink === '#how-it-works' ? 'active' : ''} href="#how-it-works" onClick={handleNavigationClick}>How It Works</a>
        <a className={activeLink === '#about' ? 'active' : ''} href="#about" onClick={handleNavigationClick}>About Us</a>
        <a className={activeLink === '#/help/contact' ? 'active' : ''} href="#/help/contact" onClick={handleNavigationClick}>Contact</a>
        <a className="mobile-account-link" href="#booking" onClick={handleNavigationClick}>Search Vehicles</a>
        <a className="mobile-account-link" href="#/sign-in" onClick={handleNavigationClick}>Sign In</a>
        <a className="mobile-account-link" href="#/sign-up" onClick={handleNavigationClick}>Sign Up</a>
        <label className="mobile-location-pill">
          <MapPin size={14} />
          <select
            value={location}
            onChange={event => {
              onLocationChange(event.target.value);
              setMenuOpen(false);
            }}
            aria-label="Choose location"
          >
            <option value="">Select Location</option>
            <option>Vijayapura</option>
            <option>Bengaluru</option>
            <option>Mysuru</option>
            <option>Hubballi</option>
          </select>
        </label>
      </nav>

      <div className="header-actions">
        <label className="location-pill">
          <MapPin size={14} />
          <select
            value={location}
            onChange={event => onLocationChange(event.target.value)}
            aria-label="Choose location"
          >
            <option value="">Select Location</option>
            <option>Vijayapura</option>
            <option>Bengaluru</option>
            <option>Mysuru</option>
            <option>Hubballi</option>
          </select>
        </label>
        <button className="icon-button" type="button" onClick={goToBooking} aria-label="Go to search">
          <Search size={17} />
        </button>
        <a className="button button-outline button-small" href="#/sign-in">Sign In</a>
        <a className="button button-primary button-small" href="#/sign-up">Sign Up</a>
      </div>
    </header>
  );
}
