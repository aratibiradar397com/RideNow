import { useEffect, useState } from 'react';
import BookingPageFrame from '../components/booking/BookingPageFrame.jsx';
import { getDemoBookings } from '../services/mockBookingService.js';

export default function MyBookings({ onBack }) {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setBookings(getDemoBookings());
    } catch {
      setError('Saved demo bookings could not be read from this browser.');
    }
  }, []);

  function clearDemoBookings() {
    try {
      localStorage.removeItem('ridenow.demo-bookings');
      setBookings([]);
      setError('');
    } catch {
      setError('Saved demo bookings could not be cleared from this browser.');
    }
  }

  return (
    <BookingPageFrame eyebrow="LOCAL DEMO HISTORY" title="My Bookings" onBack={onBack}>
      <p className="booking-intro">These entries are sample records stored in this browser only. They are not real reservations.</p>
      {error && <p className="booking-error" role="alert">{error}</p>}
      {!error && bookings.length === 0 ? (
        <div className="booking-empty">
          <h2>No demo bookings yet</h2>
          <p>When you complete the simulated flow, its sample booking will appear here.</p>
          <a className="button button-primary" href="#featured">Explore vehicles</a>
        </div>
      ) : !error && (
        <>
          <div className="my-bookings-list">
            {bookings.map(booking => (
              <article className="my-booking-card" key={booking.id}>
                <div>
                  <span className="vehicle-model-kicker">{booking.id}</span>
                  <h2>{booking.vehicle.name}</h2>
                  <p>{booking.draft.location} · {booking.draft.pickupDate} to {booking.draft.returnDate}</p>
                  <span className="booking-demo-status">{booking.status}</span>
                </div>
                <div className="my-booking-actions">
                  <strong>Estimate ₹{booking.price.total.toLocaleString('en-IN')}</strong>
                  <a className="button button-outline" href={`#/booking/confirmation/${encodeURIComponent(booking.id)}`}>View demo details</a>
                </div>
              </article>
            ))}
          </div>
          <button className="payment-cancel" type="button" onClick={clearDemoBookings}>Clear local demo history</button>
        </>
      )}
    </BookingPageFrame>
  );
}
