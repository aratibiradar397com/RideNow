import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import BookingPageFrame from '../components/booking/BookingPageFrame.jsx';
import BookingSummary from '../components/booking/BookingSummary.jsx';
import { getDemoBooking } from '../services/mockBookingService.js';

export default function BookingConfirmation({ bookingId, onBack }) {
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setBooking(bookingId ? getDemoBooking(bookingId) : null);
    } catch {
      setError('The demo booking could not be read from this browser.');
    }
  }, [bookingId]);

  if (!booking) {
    return (
      <BookingPageFrame title="Confirmation unavailable" onBack={onBack}>
        <p className={error ? 'booking-error' : 'booking-notice'} role={error ? 'alert' : undefined}>
          {error || 'No matching demo booking was found in this browser.'}
        </p>
        <a className="button button-primary" href="#/my-bookings">View my bookings</a>
      </BookingPageFrame>
    );
  }

  return (
    <BookingPageFrame eyebrow="DEMO CONFIRMATION" title="Sample booking saved" onBack={onBack}>
      <div className="booking-confirmation">
        <CheckCircle2 size={38} />
        <div>
          <h2>Demo booking reference: {booking.id}</h2>
          <p>{booking.status}. This is a local frontend sample, not a confirmed rental.</p>
        </div>
      </div>
      <div className="booking-columns booking-review-columns">
        <BookingSummary vehicle={booking.vehicle} draft={booking.draft} showPrice />
        <section className="booking-next-panel">
          <h2>What this means</h2>
          <p>Your demo booking was saved only in this browser so it can appear on My Bookings. No account, vehicle reservation, payment, or notification was created.</p>
          <p className="booking-demo-note">Reference: {booking.id}<br />Payment method: {booking.paymentMethod}</p>
          <a className="button button-primary" href="#/my-bookings">View My Bookings</a>
          <a className="button button-outline" href="#featured">Explore more vehicles</a>
        </section>
      </div>
    </BookingPageFrame>
  );
}
