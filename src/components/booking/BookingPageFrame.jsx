import { ArrowLeft } from 'lucide-react';

export default function BookingPageFrame({ eyebrow = 'RIDENOW BOOKING', title, onBack, children }) {
  return (
    <section className="booking-page">
      <div className="booking-shell">
        <button className="page-back-arrow" type="button" onClick={onBack} aria-label="Go back">
          <ArrowLeft size={18} />
        </button>
        <p className="auth-eyebrow">{eyebrow}</p>
        <h1 className="booking-title">{title}</h1>
        {children}
      </div>
    </section>
  );
}
