const DRAFT_KEY = 'ridenow.booking-draft';
const BOOKINGS_KEY = 'ridenow.demo-bookings';
const DEMO_SESSION_KEY = 'ridenow.demo-session';
const SEARCH_DATES_KEY = 'ridenow.search-dates';

function readJson(storage, key, fallback) {
  const value = storage.getItem(key);
  return value === null ? fallback : JSON.parse(value);
}

function toLocalDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getSearchRentalDates() {
  return readJson(sessionStorage, SEARCH_DATES_KEY, {
    pickupDate: '',
    pickupTime: '10:00',
    returnDate: '',
    returnTime: '10:00'
  });
}

export function saveSearchRentalDates(dates) {
  sessionStorage.setItem(SEARCH_DATES_KEY, JSON.stringify(dates));
}

export function createBookingDraft(vehicle, location, dates) {
  const pickupDate = new Date();
  pickupDate.setDate(pickupDate.getDate() + 1);
  const returnDate = new Date(pickupDate);
  returnDate.setDate(returnDate.getDate() + 1);
  const pickupTime = dates?.pickupTime || '10:00';
  const returnTime = dates?.returnTime || '10:00';
  const selectedPickup = dates?.pickupDate ? new Date(`${dates.pickupDate}T${pickupTime}:00`) : null;
  const selectedReturn = dates?.returnDate ? new Date(`${dates.returnDate}T${returnTime}:00`) : null;
  const datesAreValid = selectedPickup && selectedReturn
    && selectedPickup.getTime() >= Date.now()
    && selectedReturn.getTime() > selectedPickup.getTime();

  return {
    draftId: `RD-DRAFT-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`,
    vehicleId: vehicle.id,
    location: location || vehicle.sampleLocation,
    pickupDate: datesAreValid ? dates.pickupDate : toLocalDateInput(pickupDate),
    pickupTime: datesAreValid ? pickupTime : '10:00',
    returnDate: datesAreValid ? dates.returnDate : toLocalDateInput(returnDate),
    returnTime: datesAreValid ? returnTime : '10:00',
    customer: { name: '', email: '', phone: '' }
  };
}

export function getBookingDraft() {
  return readJson(sessionStorage, DRAFT_KEY, null);
}

export function saveBookingDraft(draft) {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function hasDemoSession() {
  return sessionStorage.getItem(DEMO_SESSION_KEY) === 'true';
}

export function setDemoSession() {
  sessionStorage.setItem(DEMO_SESSION_KEY, 'true');
}

export function getRentalDays(draft) {
  const pickup = new Date(`${draft.pickupDate}T${draft.pickupTime}:00`);
  const returned = new Date(`${draft.returnDate}T${draft.returnTime}:00`);
  const duration = returned.getTime() - pickup.getTime();
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  return Math.max(1, Math.ceil(duration / 86_400_000));
}

export function isValidRentalPeriod(draft) {
  const pickup = new Date(`${draft.pickupDate}T${draft.pickupTime}:00`);
  const returned = new Date(`${draft.returnDate}T${draft.returnTime}:00`);
  return Number.isFinite(pickup.getTime())
    && Number.isFinite(returned.getTime())
    && pickup.getTime() >= Date.now()
    && returned.getTime() > pickup.getTime();
}

export function getPriceBreakdown(vehicle, draft) {
  const dailyRate = Number.parseInt(vehicle.samplePrice.replace(/[^\d]/g, ''), 10);
  const rentalDays = getRentalDays(draft);
  const rentalSubtotal = dailyRate * rentalDays;
  const serviceFee = 49;
  const estimatedTax = Math.round(rentalSubtotal * 0.18);
  const sampleDeposit = 2000;

  return {
    dailyRate,
    rentalDays,
    rentalSubtotal,
    serviceFee,
    estimatedTax,
    sampleDeposit,
    total: rentalSubtotal + serviceFee + estimatedTax + sampleDeposit
  };
}

export function getDemoBookings() {
  const bookings = readJson(localStorage, BOOKINGS_KEY, []);
  if (!Array.isArray(bookings)) {
    throw new Error('Saved demo bookings are in an unreadable format.');
  }
  return bookings;
}

export function saveDemoBooking(booking) {
  const bookings = getDemoBookings();
  const existingBooking = bookings.find(item => item.draft?.draftId === booking.draft.draftId);
  if (existingBooking) return existingBooking;

  const bookingDraft = { ...booking.draft };
  delete bookingDraft.customer;
  const savedBooking = {
    ...booking,
    draft: bookingDraft,
    id: `RN-DEMO-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    status: 'Demo payment successful — not a real booking'
  };
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify([savedBooking, ...bookings]));
  return savedBooking;
}

export function getDemoBooking(bookingId) {
  return getDemoBookings().find(booking => booking.id === bookingId) ?? null;
}
