import { getPriceBreakdown } from '../../services/mockBookingService.js';

function formatRentalDate(date, time) {
  if (!date || !time) return 'Not selected';
  return new Date(`${date}T${time}:00`).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

export default function BookingSummary({ vehicle, draft, showPrice = false }) {
  const price = showPrice ? getPriceBreakdown(vehicle, draft) : null;

  return (
    <aside className="booking-summary">
      <div className="booking-vehicle">
        <img src={vehicle.image} alt={vehicle.imageAlt} />
        <div>
          <span className="vehicle-model-kicker">SAMPLE VEHICLE</span>
          <h2>{vehicle.name}</h2>
          <p>{vehicle.type}</p>
        </div>
      </div>
      <dl className="booking-summary-details">
        <div><dt>Pickup location</dt><dd>{draft.location}</dd></div>
        <div><dt>Pickup</dt><dd>{formatRentalDate(draft.pickupDate, draft.pickupTime)}</dd></div>
        <div><dt>Return</dt><dd>{formatRentalDate(draft.returnDate, draft.returnTime)}</dd></div>
        {draft.customer?.name && <div><dt>Rider</dt><dd>{draft.customer.name}</dd></div>}
      </dl>
      {price && (
        <div className="booking-price-list">
          <h3>Estimated price breakdown</h3>
          <div><span>Sample rental ({price.rentalDays} {price.rentalDays === 1 ? 'day' : 'days'})</span><strong>₹{price.rentalSubtotal.toLocaleString('en-IN')}</strong></div>
          <div><span>Sample service fee</span><strong>₹{price.serviceFee.toLocaleString('en-IN')}</strong></div>
          <div><span>Estimated tax</span><strong>₹{price.estimatedTax.toLocaleString('en-IN')}</strong></div>
          <div><span>Sample refundable deposit</span><strong>₹{price.sampleDeposit.toLocaleString('en-IN')}</strong></div>
          <div className="booking-price-total"><span>Estimated total</span><strong>₹{price.total.toLocaleString('en-IN')}</strong></div>
          <p>Illustrative estimate only. Rates, taxes, deposit, and availability are not live or confirmed.</p>
        </div>
      )}
    </aside>
  );
}
