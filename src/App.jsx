import { useCallback, useEffect, useRef, useState } from 'react';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/home/Hero.jsx';
import Benefits from './components/home/Benefits.jsx';
import Categories from './components/home/Categories.jsx';
import FeaturedVehicles from './components/home/FeaturedVehicles.jsx';
import HowItWorks from './components/home/HowItWorks.jsx';
import AboutUs from './components/home/AboutUs.jsx';
import AuthPage from './pages/AuthPage.jsx';
import VehicleDetails from './pages/VehicleDetails.jsx';
import HelpCenter from './pages/HelpCenter.jsx';
import BookingDetails from './pages/BookingDetails.jsx';
import BookingReview from './pages/BookingReview.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import BookingConfirmation from './pages/BookingConfirmation.jsx';
import MyBookings from './pages/MyBookings.jsx';
import {
  createBookingDraft,
  getBookingDraft,
  getSearchRentalDates,
  hasDemoSession,
  saveBookingDraft,
  setDemoSession
} from './services/mockBookingService.js';

const helpSections = {
  contact: 'contact-form',
  faqs: 'faqs',
  'rental-policies': 'rental-policies',
  'cancellation-policy': 'cancellation-policy',
  'privacy-policy': 'privacy-policy',
  'terms-conditions': 'terms-conditions'
};

function getRoute(hash) {
  const vehicleMatch = hash.match(/^#\/vehicle\/([^/]+)$/);
  if (vehicleMatch) return { page: 'vehicle', vehicleId: vehicleMatch[1] };
  const confirmationMatch = hash.match(/^#\/booking\/confirmation\/([^/]+)$/);
  if (confirmationMatch) return { page: 'booking-confirmation', bookingId: decodeURIComponent(confirmationMatch[1]) };
  const bookingMatch = hash.match(/^#\/booking\/(details|review|payment)$/);
  if (bookingMatch) return { page: `booking-${bookingMatch[1]}` };
  if (hash === '#/my-bookings') return { page: 'my-bookings' };
  const helpMatch = hash.match(/^#\/help\/([^/]+)$/);
  if (helpMatch && helpSections[helpMatch[1]]) {
    return { page: 'help', section: helpSections[helpMatch[1]] };
  }
  if (hash === '#/sign-in' || hash === '#/sign-up') {
    return { page: hash.slice(2) };
  }
  return { page: 'home' };
}

export default function App() {
  const [location, setLocation] = useState('');
  const [showDefaultHero, setShowDefaultHero] = useState(false);
  const [route, setRoute] = useState(() => getRoute(window.location.hash));
  const navigationHistory = useRef([window.location.hash || '#home']);
  const navigationIndex = useRef(0);
  const gestureStart = useRef(null);

  function handleLocationChange(nextLocation) {
    setLocation(nextLocation);
    setShowDefaultHero(false);
  }

  function showHomepage() {
    setLocation('');
    setShowDefaultHero(true);
  }

  function startBooking(vehicle) {
    saveBookingDraft(createBookingDraft(vehicle, location, getSearchRentalDates()));
    window.location.hash = hasDemoSession() ? '#/booking/details' : '#/sign-in';
  }

  function continueBookingWithDemo(customer) {
    const draft = getBookingDraft();
    if (!draft) throw new Error('Your selected vehicle and rental dates are no longer available. Start the booking again.');
    saveBookingDraft({
      ...draft,
      customer: {
        ...draft.customer,
        name: customer.name || draft.customer?.name || '',
        email: customer.email || draft.customer?.email || '',
        phone: customer.phone || draft.customer?.phone || ''
      }
    });
    setDemoSession();
    window.location.hash = '#/booking/details';
  }

  const goBack = useCallback(() => {
    if (navigationIndex.current > 0) {
      window.history.back();
      return;
    }

    const fallbackHash = route.page === 'vehicle' ? '#featured' : '#home';
    if (window.location.hash !== fallbackHash) window.location.hash = fallbackHash;
  }, [route.page]);

  useEffect(() => {
    function syncRoute() {
      const currentHash = window.location.hash || '#home';
      const history = navigationHistory.current;
      const previousHash = history[navigationIndex.current - 1];
      const nextHash = history[navigationIndex.current + 1];

      if (currentHash === previousHash) {
        navigationIndex.current -= 1;
      } else if (currentHash === nextHash) {
        navigationIndex.current += 1;
      } else if (history[navigationIndex.current] !== currentHash) {
        history.splice(navigationIndex.current + 1);
        history.push(currentHash);
        navigationIndex.current = history.length - 1;
      }

      setRoute(getRoute(currentHash));
    }

    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    function handleTouchStart(event) {
      if (route.page === 'home' || event.touches.length !== 1) {
        gestureStart.current = null;
        return;
      }

      const target = event.target;
      if (
        target instanceof Element &&
        target.closest('a, button, form, input, select, textarea, label, [contenteditable="true"], [data-no-back-gesture], [data-swipeable], [aria-roledescription="carousel"], .vehicle-grid, .vehicle-detail-media, .hero')
      ) {
        gestureStart.current = null;
        return;
      }

      const touch = event.touches[0];
      if (touch.clientX > 28) {
        gestureStart.current = null;
        return;
      }
      gestureStart.current = {
        identifier: touch.identifier,
        x: touch.clientX,
        y: touch.clientY
      };
    }

    function handleTouchMove(event) {
      const start = gestureStart.current;
      if (!start) return;
      if (event.touches.length !== 1) {
        gestureStart.current = null;
        return;
      }

      const touch = Array.from(event.touches).find(({ identifier }) => identifier === start.identifier);
      if (!touch) {
        gestureStart.current = null;
        return;
      }

      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 12) return;

      if (Math.abs(deltaY) > Math.abs(deltaX) * 1.2) {
        gestureStart.current = null;
        return;
      }
      if (Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        if (deltaX < 0) {
          gestureStart.current = null;
        }
      }
    }

    function handleTouchEnd(event) {
      const start = gestureStart.current;
      gestureStart.current = null;
      if (!start || event.changedTouches.length !== 1) return;

      const touch = Array.from(event.changedTouches).find(({ identifier }) => identifier === start.identifier);
      if (!touch) return;

      const deltaX = touch.clientX - start.x;
      const deltaY = touch.clientY - start.y;

      if (deltaX >= 90 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) goBack();
    }

    function clearTouchStart() {
      gestureStart.current = null;
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', clearTouchStart);
    return () => {
      gestureStart.current = null;
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', clearTouchStart);
    };
  }, [goBack, route.page]);

  useEffect(() => {
    if (route.page !== 'home') {
      if (['booking-details', 'booking-review', 'booking-payment'].includes(route.page)) {
        const draft = getBookingDraft();
        if (!draft) {
          window.location.hash = '#featured';
          return;
        }
        if (!hasDemoSession()) {
          window.location.hash = '#/sign-in';
          return;
        }
      }
      if (route.page === 'help') {
        requestAnimationFrame(() => document.getElementById(route.section)?.scrollIntoView());
        return;
      }
      window.scrollTo({ top: 0 });
      return;
    }

    const targetId = window.location.hash.slice(1);
    if (!targetId || targetId.startsWith('/')) return;
    requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView());
  }, [route]);

  const bookingIntent = route.page === 'sign-in' || route.page === 'sign-up'
    ? Boolean(getBookingDraft())
    : false;

  return (
    <>
      <Header
        location={location}
        onLocationChange={handleLocationChange}
        onHomeClick={showHomepage}
      />
      {route.page === 'home' ? (
        <>
          <main>
            <Hero
              location={location}
              onLocationChange={handleLocationChange}
              showDefaultBackground={showDefaultHero}
            />
            <Benefits />
            <Categories />
            <FeaturedVehicles />
            <HowItWorks />
            <AboutUs />
          </main>
        </>
      ) : (
        <main className="routed-main">
          {route.page === 'vehicle' ? (
            <VehicleDetails vehicleId={route.vehicleId} location={location} onBack={goBack} onBookNow={startBooking} />
          ) : route.page === 'help' ? (
            <HelpCenter section={route.section} onBack={goBack} />
          ) : route.page === 'booking-details' ? (
            <BookingDetails onBack={goBack} />
          ) : route.page === 'booking-review' ? (
            <BookingReview onBack={goBack} />
          ) : route.page === 'booking-payment' ? (
            <PaymentPage onBack={goBack} />
          ) : route.page === 'booking-confirmation' ? (
            <BookingConfirmation bookingId={route.bookingId} onBack={goBack} />
          ) : route.page === 'my-bookings' ? (
            <MyBookings onBack={goBack} />
          ) : (
            <AuthPage
              mode={route.page}
              onBack={goBack}
              bookingIntent={bookingIntent}
              onDemoAuthenticated={continueBookingWithDemo}
            />
          )}
        </main>
      )}
      <Footer />
    </>
  );
}
