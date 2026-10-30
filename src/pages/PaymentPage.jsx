import { useRef, useState } from 'react';
import { CreditCard, Smartphone } from 'lucide-react';
import BookingPageFrame from '../components/booking/BookingPageFrame.jsx';
import BookingSummary from '../components/booking/BookingSummary.jsx';
import { vehicles } from '../data/vehicles.js';
import { getBookingDraft, getPriceBreakdown, saveDemoBooking } from '../services/mockBookingService.js';

const paymentOptions = [
  { value: 'upi-demo', label: 'UPI (demo)', Icon: Smartphone },
  { value: 'card-demo', label: 'Card (demo)', Icon: CreditCard }
];

export default function PaymentPage({ onBack }) {
  const draft = getBookingDraft();
  const vehicle = draft && vehicles.find(item => String(item.id) === String(draft.vehicleId));
  const [method, setMethod] = useState('upi-demo');
  const [status, setStatus] = useState('ready');
  const [error, setError] = useState('');
  const [bookingId, setBookingId] = useState('');
  const attempt = useRef(0);

  if (!draft || !vehicle) {
    return (
      <BookingPageFrame title="Payment unavailable" onBack={onBack}>
        <p className="booking-notice">Your booking draft is missing. Start again from a sample vehicle.</p>
        <a className="button button-primary" href="#featured">Explore vehicles</a>
      </BookingPageFrame>
    );
  }

  async function simulatePayment(succeeds) {
    if (status === 'processing' || status === 'success') return;
    const currentAttempt = ++attempt.current;
    setError('');
    setStatus('processing');
    await new Promise(resolve => window.setTimeout(resolve, 600));
    if (currentAttempt !== attempt.current) return;

    if (!succeeds) {
      setStatus('failure');
      setError('The mock payment was declined. No payment was attempted or collected.');
      return;
    }

    try {
      const saved = saveDemoBooking({
        vehicle,
        draft,
        price: getPriceBreakdown(vehicle, draft),
        paymentMethod: method
      });
      setBookingId(saved.id);
      setStatus('success');
    } catch {
      setStatus('failure');
      setError('The demo result could not be saved in this browser. No payment was attempted or collected.');
    }
  }

  function cancelPayment() {
    attempt.current += 1;
    setStatus('cancelled');
    setError('');
  }

  return (
    <BookingPageFrame title="Demo payment" onBack={onBack}>
      <p className="booking-intro">Choose a display-only payment method. No gateway is connected and no payment details are requested.</p>
      <div className="booking-columns booking-review-columns">
        <div className="payment-panel">
          <h2>Payment method</h2>
          <div className="payment-options">
            {paymentOptions.map(({ value, label, Icon }) => (
              <label className={method === value ? 'payment-option selected' : 'payment-option'} key={value}>
                <input type="radio" name="payment-method" value={value} checked={method === value} onChange={() => setMethod(value)} disabled={status === 'processing'} />
                <Icon size={20} />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <p className="payment-demo-warning">Demo only — do not enter card numbers, UPI IDs, or other payment credentials. No actual booking or charge will be made.</p>

          {status === 'processing' && <p className="payment-status" role="status">Processing mock payment…</p>}
          {status === 'failure' && <p className="booking-error" role="alert">{error}</p>}
          {status === 'cancelled' && <p className="booking-notice" role="status">Demo payment cancelled. No payment was attempted or collected.</p>}
          {status === 'success' && (
            <div className="booking-success" role="status">
              <h3>Mock payment successful</h3>
              <p>No money was collected. Your sample booking is ready to view.</p>
              <a className="button button-primary" href={`#/booking/confirmation/${encodeURIComponent(bookingId)}`}>View demo confirmation</a>
            </div>
          )}

          {(status === 'ready' || status === 'failure' || status === 'cancelled') && (
            <div className="payment-actions">
              <button className="button button-primary" type="button" onClick={() => simulatePayment(true)}>Simulate successful payment</button>
              <button className="button button-outline" type="button" onClick={() => simulatePayment(false)}>Simulate payment failure</button>
              {status !== 'cancelled' && <button className="payment-cancel" type="button" onClick={cancelPayment}>Cancel demo payment</button>}
              <a className="payment-cancel" href="#/booking/review">Return to booking review</a>
            </div>
          )}
          {status === 'processing' && <button className="payment-cancel" type="button" onClick={cancelPayment}>Cancel processing</button>}
        </div>
        <BookingSummary vehicle={vehicle} draft={draft} showPrice />
      </div>
    </BookingPageFrame>
  );
}
