import BookingPageFrame from '../components/booking/BookingPageFrame.jsx';
import BookingSummary from '../components/booking/BookingSummary.jsx';
import { vehicles } from '../data/vehicles.js';
import { getBookingDraft } from '../services/mockBookingService.js';

export default function BookingReview({ onBack }) {
  const draft = getBookingDraft();
  const vehicle = draft && vehicles.find(item => String(item.id) === String(draft.vehicleId));

  if (!draft || !vehicle) {
    return (
      <BookingPageFrame title="Review unavailable" onBack={onBack}>
        <p className="booking-notice">Your booking draft is missing. Start again from a sample vehicle.</p>
        <a className="button button-primary" href="#featured">Explore vehicles</a>
      </BookingPageFrame>
    );
  }

  return (
    <BookingPageFrame title="Review your booking" onBack={onBack}>
      <p className="booking-intro">Check your selected vehicle, rental details, and estimated costs before continuing.</p>
      <div className="booking-columns booking-review-columns">
        <BookingSummary vehicle={vehicle} draft={draft} showPrice />
        <section className="booking-next-panel">
          <h2>Before you continue</h2>
          <p>This is a sample estimate only. Vehicle availability, rental terms, charges, and deposits have not been verified by a live service.</p>
          <a className="button button-outline" href="#/booking/details">Edit details</a>
          <a className="button button-primary" href="#/booking/payment">Continue to demo payment</a>
        </section>
      </div>
    </BookingPageFrame>
  );
}
