import { useEffect, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin, Pause, Play, Search } from 'lucide-react';
import { locations } from '../../data/locations.js';
import { getSearchRentalDates, saveSearchRentalDates } from '../../services/mockBookingService.js';

const SLIDE_DURATION = 2000;
const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=2200&q=90';

export default function Hero({ location, onLocationChange, showDefaultBackground }) {
  const [savedDates] = useState(() => getSearchRentalDates());
  const [startDate, setStartDate] = useState(savedDates.pickupDate);
  const [startTime, setStartTime] = useState(savedDates.pickupTime || '10:00');
  const [endDate, setEndDate] = useState(savedDates.returnDate);
  const [endTime, setEndTime] = useState(savedDates.returnTime || '10:00');
  const [message, setMessage] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const places = locations[location] ?? locations.Vijayapura;
  const place = places[activeIndex];
  const showLocationSlider = Boolean(location) && !showDefaultBackground;
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    setActiveIndex(0);
  }, [location]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!showLocationSlider || !isPlaying || reducedMotion.matches || places.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex(index => (index + 1) % places.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(timer);
  }, [isPlaying, location, places.length, showLocationSlider]);

  function showPrevious() {
    setActiveIndex(index => (index - 1 + places.length) % places.length);
  }

  function showNext() {
    setActiveIndex(index => (index + 1) % places.length);
  }

  function updateRentalDates(pickupDate, pickupTime, returnDate, returnTime) {
    try {
      saveSearchRentalDates({ pickupDate, pickupTime, returnDate, returnTime });
      setMessage('');
    } catch {
      setMessage('Your selected dates could not be saved in this browser. Please try again.');
    }
  }

  function handleSearch(event) {
    event.preventDefault();

    if (!location || !startDate || !startTime || !endDate || !endTime) {
      setMessage('Please select a location, pickup date and time, and return date and time.');
      return;
    }

    const pickup = new Date(`${startDate}T${startTime}:00`);
    const returned = new Date(`${endDate}T${endTime}:00`);
    if (pickup.getTime() < Date.now() || returned.getTime() <= pickup.getTime()) {
      setMessage('Choose a pickup time in the future and a return time after pickup.');
      return;
    }

    setMessage(`We can’t confirm live availability in ${location} online. Review the models below and contact RideNow with your dates.`);
    document.querySelector('#featured')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="hero" id="home">
      <div className="hero-background" key={showLocationSlider ? place.image : DEFAULT_HERO_IMAGE}>
        <img src={showLocationSlider ? place.image : DEFAULT_HERO_IMAGE} alt="" aria-hidden="true" loading="eager" />
      </div>
      <div className="hero-background-overlay" aria-hidden="true" />
      <div className="hero-content">
        <p className="hero-eyebrow">FIND YOUR PERFECT MOTORCYCLE RENTAL</p>
        <h1>BOOK A BIKE.<br />RIDE THE WORLD.</h1>
      </div>

      <form className="hero-search" id="booking" onSubmit={handleSearch}>
        <label className="hero-search-field location-field">
          <MapPin className="location-symbol" size={23} />
          <span className="search-field-content">
            <strong>Location</strong>
            <select value={location} onChange={event => onLocationChange(event.target.value)} required>
              <option value="">Select Location</option>
              <option value="Vijayapura">Vijayapura</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mysuru">Mysuru</option>
              <option value="Hubballi">Hubballi</option>
            </select>
          </span>
        </label>

        <div className="hero-search-field rental-date-field">
          <span className="search-field-content">
            <strong>Pickup</strong>
            <span className="search-field-date-time">
              <span className="search-date-time-control">
                <CalendarDays size={15} aria-hidden="true" />
                <input aria-label="Pickup date" type="date" value={startDate} min={today}
                  onChange={event => {
                    const nextPickupDate = event.target.value;
                    const nextReturnDate = endDate && nextPickupDate > endDate ? '' : endDate;
                    setStartDate(nextPickupDate);
                    setEndDate(nextReturnDate);
                    updateRentalDates(nextPickupDate, startTime, nextReturnDate, endTime);
                  }} required />
              </span>
              <span className="search-date-time-control">
                <Clock3 size={15} aria-hidden="true" />
                <input aria-label="Pickup time" type="time" value={startTime}
                  onChange={event => {
                    setStartTime(event.target.value);
                    updateRentalDates(startDate, event.target.value, endDate, endTime);
                  }} required />
              </span>
            </span>
          </span>
        </div>

        <div className="hero-search-field rental-date-field">
          <span className="search-field-content">
            <strong>Drop-off</strong>
            <span className="search-field-date-time">
              <span className="search-date-time-control">
                <CalendarDays size={15} aria-hidden="true" />
                <input aria-label="Return date" type="date" value={endDate} min={startDate || today}
                  onChange={event => {
                    setEndDate(event.target.value);
                    updateRentalDates(startDate, startTime, event.target.value, endTime);
                  }} required />
              </span>
              <span className="search-date-time-control">
                <Clock3 size={15} aria-hidden="true" />
                <input aria-label="Return time" type="time" value={endTime}
                  onChange={event => {
                    setEndTime(event.target.value);
                    updateRentalDates(startDate, startTime, endDate, event.target.value);
                  }} required />
              </span>
            </span>
          </span>
        </div>

        <button className="hero-search-button" type="submit" aria-label="Search available vehicles">
          <Search size={27} strokeWidth={2.5} />
        </button>

        {message && <p className="hero-search-message" role="status">{message}</p>}
      </form>

      {showLocationSlider && (
        <>
          <div className="hero-slide-caption">
            <div className="hero-slide-place" aria-live={isPlaying ? 'off' : 'polite'}>
              <strong>{place.name}</strong>
              <span>{location}, Karnataka</span>
            </div>
            <div className="hero-slide-controls" aria-label="Location photo controls">
              <button type="button" aria-label="Previous attraction" onClick={showPrevious}>
                <ChevronLeft size={17} />
              </button>
              <button
                type="button"
                aria-label={isPlaying ? 'Pause photo slider' : 'Play photo slider'}
                aria-pressed={!isPlaying}
                onClick={() => setIsPlaying(playing => !playing)}
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              </button>
              <button type="button" aria-label="Next attraction" onClick={showNext}>
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          <div className="hero-slide-pagination" aria-label="Choose a location photo">
            {places.map((item, index) => (
              <button
                type="button"
                key={item.name}
                className={index === activeIndex ? 'active' : ''}
                aria-label={`Show ${item.name}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
