import { useState } from 'react';
import BookingPageFrame from '../components/booking/BookingPageFrame.jsx';
import BookingSummary from '../components/booking/BookingSummary.jsx';
import { vehicles } from '../data/vehicles.js';
import { getBookingDraft, getPriceBreakdown, isValidRentalPeriod, saveBookingDraft } from '../services/mockBookingService.js';

export default function BookingDetails({ onBack }) {
  const [draft, setDraft] = useState(() => getBookingDraft());
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const vehicle = draft && vehicles.find(item => String(item.id) === String(draft.vehicleId));

  if (!draft || !vehicle) {
    return (
      <BookingPageFrame title="Booking details unavailable" onBack={onBack}>
        <p className="booking-notice">Start from a sample vehicle to create a booking estimate.</p>
        <a className="button button-primary" href="#featured">Explore vehicles</a>
      </BookingPageFrame>
    );
  }

  function updateField(event) {
    const { name, value } = event.target;
    const updatedDraft = name.startsWith('customer.')
      ? { ...draft, customer: { ...draft.customer, [name.slice(9)]: value } }
      : { ...draft, [name]: value };
    setDraft(updatedDraft);
    try {
      saveBookingDraft(updatedDraft);
    } catch {
      setError('Your draft could not be saved in this browser. Check storage settings and try again.');
    }
  }

  function continueToReview(event) {
    event.preventDefault();
    if (submitting) return;
    setError('');
    if (!isValidRentalPeriod(draft)) {
      setError('Choose a pickup time in the future and a return time after pickup.');
      return;
    }
    if (getPriceBreakdown(vehicle, draft).dailyRate <= 0) {
      setError('This sample vehicle does not have a valid estimated daily rate.');
      return;
    }

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    setSubmitting(true);
    try {
      saveBookingDraft(draft);
      window.location.hash = '#/booking/review';
    } catch {
      setError('Your draft could not be saved in this browser. Check storage settings and try again.');
      setSubmitting(false);
    }
  }

  return (
    <BookingPageFrame title="Booking details" onBack={onBack}>
      <p className="booking-intro">Provide rider details and review your sample rental dates. Nothing is reserved or sent to a service.</p>
      <div className="booking-columns">
        <form className="booking-form" onSubmit={continueToReview}>
          <h2>Rider details</h2>
          <label htmlFor="booking-name">Full name</label>
          <input id="booking-name" name="customer.name" value={draft.customer?.name ?? ''} onChange={updateField} autoComplete="name" minLength={2} required />
          <label htmlFor="booking-email">Email address</label>
          <input id="booking-email" name="customer.email" type="email" value={draft.customer?.email ?? ''} onChange={updateField} autoComplete="email" required />
          <label htmlFor="booking-phone">Mobile number</label>
          <input id="booking-phone" name="customer.phone" type="tel" value={draft.customer?.phone ?? ''} onChange={updateField} autoComplete="tel-national" pattern="[0-9]{10}" title="Enter a 10-digit mobile number" required />

          <h2>Rental details</h2>
          <label htmlFor="booking-location">Pickup location</label>
          <select id="booking-location" name="location" value={draft.location} onChange={updateField} required>
            <option value="">Select location</option>
            <option value="Vijayapura">Vijayapura</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mysuru">Mysuru</option>
            <option value="Hubballi">Hubballi</option>
          </select>
          <div className="booking-datetime-grid">
            <div>
              <label htmlFor="booking-pickup-date">Pickup date</label>
              <input id="booking-pickup-date" name="pickupDate" type="date" min={new Date().toLocaleDateString('en-CA')} value={draft.pickupDate} onChange={updateField} required />
            </div>
            <div>
              <label htmlFor="booking-pickup-time">Pickup time</label>
              <input id="booking-pickup-time" name="pickupTime" type="time" value={draft.pickupTime} onChange={updateField} required />
            </div>
            <div>
              <label htmlFor="booking-return-date">Return date</label>
              <input id="booking-return-date" name="returnDate" type="date" min={draft.pickupDate} value={draft.returnDate} onChange={updateField} required />
            </div>
            <div>
              <label htmlFor="booking-return-time">Return time</label>
              <input id="booking-return-time" name="returnTime" type="time" value={draft.returnTime} onChange={updateField} required />
            </div>
          </div>
          {error && <p className="booking-error" role="alert">{error}</p>}
          <p className="booking-demo-note">Demo only: contact details remain in this browser tab. Do not enter real payment details.</p>
          <button className="button button-primary booking-submit" type="submit" disabled={submitting}>
            {submitting ? 'Saving draft…' : 'Review booking'}
          </button>
        </form>
        <BookingSummary vehicle={vehicle} draft={draft} />
      </div>
    </BookingPageFrame>
  );
}
