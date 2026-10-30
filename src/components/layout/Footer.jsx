import { useState } from 'react';
import { ArrowRight, Bike } from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="brand brand-light" href="#home">
            <Bike size={29} />
            <span>Ride<span className="brand-accent">Now</span></span>
          </a>
          <p>Your next journey starts here. Find bikes and scooters for every kind of ride.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <a href="#featured">All Vehicles</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#about">About Us</a>
        </div>
        <div>
          <h3>Support</h3>
          <a href="#/help/contact">Contact Us</a>
          <a href="#/help/faqs">FAQs</a>
          <a href="#/help/rental-policies">Rental Policies</a>
          <a href="#/help/cancellation-policy">Cancellation Policy</a>
        </div>
        <div className="newsletter">
          <h3>Join the Ride</h3>
          <p>Get riding inspiration and updates.</p>
          {subscribed ? (
            <p role="status">Newsletter sign-up is not connected in this demo. Your email was not sent or saved.</p>
          ) : (
            <form onSubmit={event => { event.preventDefault(); setSubscribed(true); }}>
              <input type="email" placeholder="Your email address" aria-label="Email address" required />
              <button type="submit" aria-label="Subscribe"><ArrowRight size={18} /></button>
            </form>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} RideNow. All rights reserved.</span>
        <div>
          <a href="#/help/privacy-policy">Privacy Policy</a>
          <a href="#/help/terms-conditions">Terms &amp; Conditions</a>
          <a href="#/help/cancellation-policy">Cancellation Policy</a>
        </div>
      </div>
    </footer>
  );
}
