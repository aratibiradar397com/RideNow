import { useMemo, useState } from 'react';
import { Heart, SlidersHorizontal } from 'lucide-react';
import { vehicles } from '../../data/vehicles.js';
import SectionHeading from '../common/SectionHeading.jsx';

const filters = ['All', 'Petrol Bikes', 'Electric Bikes', 'Petrol Scooters', 'Electric Scooters'];

export default function FeaturedVehicles() {
  const [filter, setFilter] = useState('All');
  const [saved, setSaved] = useState([]);

  const visibleVehicles = useMemo(
    () => filter === 'All' ? vehicles : vehicles.filter(vehicle => vehicle.category === filter),
    [filter]
  );

  function toggleSaved(id) {
    setSaved(previous => previous.includes(id)
      ? previous.filter(item => item !== id)
      : [...previous, id]);
  }

  return (
    <section className="content-section featured-section" id="featured">
      <SectionHeading title="Featured" accent="Models"
        subtitle="Browse sample bike and scooter listings with example prices and availability."
        action="View All Vehicles" />
      <div className="filter-row">
        <SlidersHorizontal size={16} />
        {filters.map(item => (
          <button key={item}
            className={filter === item ? 'filter-chip selected' : 'filter-chip'}
            onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>

      <div className="vehicle-grid">
        {visibleVehicles.map(vehicle => (
          <article className="vehicle-card" key={vehicle.id}>
            <span className={vehicle.energy === 'Electric' ? 'vehicle-tag electric-tag' : 'vehicle-tag'}>{vehicle.energy}</span>
            <button className={saved.includes(vehicle.id) ? 'save-button saved' : 'save-button'}
              aria-label={`Save ${vehicle.name}`} onClick={() => toggleSaved(vehicle.id)}>
              <Heart size={16} fill={saved.includes(vehicle.id) ? 'currentColor' : 'none'} />
            </button>
            <a className="vehicle-card-main" href={`#/vehicle/${vehicle.id}`} aria-label={`View details for ${vehicle.name}`}>
              <img src={vehicle.image} alt={vehicle.imageAlt} loading="lazy" />
              <span className="vehicle-image-label">Sample image</span>
              <div className="vehicle-info">
                <h3>{vehicle.name}</h3>
                <p>{vehicle.type}</p>
                <div className="vehicle-highlights">
                  {vehicle.highlights.map(highlight => <span key={highlight}>{highlight}</span>)}
                </div>
                <p className="vehicle-card-description">{vehicle.sampleDescription}</p>
              </div>
            </a>
            <div className="vehicle-bottom">
              <span className="vehicle-availability">
                Sample: {vehicle.sampleAvailability} in {vehicle.sampleLocation}
                <strong>{vehicle.samplePrice}</strong>
              </span>
              <a className="button button-primary book-button" href={`#/vehicle/${vehicle.id}`}>View details</a>
            </div>
          </article>
        ))}
      </div>

      <p className="vehicle-reference-note">Demo content only: vehicle images, specifications, prices, locations, and availability are illustrative and do not represent actual RideNow inventory.</p>
      {visibleVehicles.length === 0 && <p className="empty-state">No vehicles are listed in this category yet.</p>}
    </section>
  );
}
