import { useState } from 'react';
import { ArrowLeft, Bike, Check, ShieldCheck } from 'lucide-react';
import { vehicles } from '../data/vehicles.js';

function DetailRow({ label, value }) {
  return (
    <div className="vehicle-detail-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default function VehicleDetails({ vehicleId, location, onBack, onBookNow }) {
  const [bookingError, setBookingError] = useState('');
  const vehicle = vehicles.find(item => String(item.id) === vehicleId);

  if (!vehicle) {
    return (
      <section className="not-found-page">
        <button className="page-back-arrow" type="button" onClick={onBack} aria-label="Go back">
          <ArrowLeft size={18} />
        </button>
        <p className="auth-eyebrow">RIDENOW VEHICLES</p>
        <h1>We couldn’t find that vehicle.</h1>
      </section>
    );
  }

  const selectedLocation = location || vehicle.sampleLocation;

  return (
    <section className="vehicle-detail-page">
      <div className="vehicle-detail-shell">
        <button className="page-back-arrow" type="button" onClick={onBack} aria-label="Go back">
          <ArrowLeft size={18} />
        </button>
        <div className="vehicle-detail-grid">
          <div className="vehicle-detail-media">
            <img src={vehicle.image} alt={vehicle.imageAlt} />
            <span className="sample-image-label">Sample image</span>
          </div>

          <div className="vehicle-detail-summary">
            <span className="vehicle-model-kicker">SAMPLE VEHICLE</span>
            <h1>{vehicle.name}</h1>
            <p className="vehicle-detail-type">{vehicle.type}</p>
            <p className="vehicle-detail-copy">{vehicle.sampleDescription} All vehicle information below is example content.</p>

            <div className="availability-panel">
              <div>
                <strong>Sample availability: {vehicle.sampleAvailability}</strong>
                <span>Example location: {vehicle.sampleLocation}</span>
              </div>
            </div>

            <p className="sample-price">Sample price <strong>{vehicle.samplePrice}</strong></p>
            <p className="detail-disclaimer">Demo only. This sample status and price do not represent live availability or a confirmed rental.</p>
            <button className="button button-primary vehicle-book-now" type="button" onClick={() => {
              setBookingError('');
              try {
                onBookNow(vehicle);
              } catch {
                setBookingError('The booking draft could not be saved in this browser. Check storage settings and try again.');
              }
            }}>
              Book Now
            </button>
            {bookingError && <p className="booking-error" role="alert">{bookingError}</p>}
          </div>
        </div>

        <div className="vehicle-detail-panels">
          <section className="detail-panel">
            <h2><Bike size={19} /> Sample vehicle information</h2>
            <dl>
              {vehicle.sampleSpecs.map(spec => <DetailRow key={spec.label} label={spec.label} value={spec.value} />)}
            </dl>
          </section>

          <section className="detail-panel">
            <h2><ShieldCheck size={19} /> Sample rental information</h2>
            <dl>
              <DetailRow label="Requested location" value={selectedLocation} />
              <DetailRow label="Sample status" value={`${vehicle.sampleAvailability} in ${vehicle.sampleLocation}`} />
              <DetailRow label="Sample rate" value={vehicle.samplePrice} />
              <DetailRow label="Sample pickup time" value="10:00 AM" />
              <DetailRow label="Sample rental duration" value="1 day" />
              <DetailRow label="Sample deposit" value="₹2,000 (example only)" />
            </dl>
          </section>
        </div>

        <div className="detail-reminder">
          <Check size={18} />
          <p>All details on this page, including the image, specifications, price, location, and availability, are dummy sample data for demonstration only.</p>
        </div>
      </div>
    </section>
  );
}
