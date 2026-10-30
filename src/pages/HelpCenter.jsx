import { useState } from 'react';
import { ArrowLeft, Bike, Mail, MapPin, Send, ShieldCheck } from 'lucide-react';

const faqs = [
  {
    question: 'Is vehicle availability live?',
    answer: 'No. We cannot check live inventory or confirm a vehicle for your dates online. Contact RideNow to ask about a model and location.'
  },
  {
    question: 'Can I pick up and return at different branches?',
    answer: 'The initial release is planned to use the same branch for pickup and return. Branches and one-way rentals are not configured yet.'
  },
  {
    question: 'How is rental duration calculated?',
    answer: 'The planned rule is to round partial rental hours up to the next hour, with a configurable daily price cap. Final rates and calculations will be confirmed before bookings go live.'
  },
  {
    question: 'What happens if I return a vehicle late?',
    answer: 'A 15-minute return grace period is planned before late fees may apply. The actual late-fee amount and process are not configured.'
  },
  {
    question: 'What documents should I bring?',
    answer: 'A valid driving licence suitable for the vehicle class is expected. Exact document, eligibility, and verification requirements will be displayed before any real booking is accepted.'
  },
  {
    question: 'Is the security deposit included in the rental price?',
    answer: 'No. The deposit is planned to be tracked separately from the rental charge. Deposit amounts and release timing have not been finalized.'
  },
  {
    question: 'Can I cancel a booking?',
    answer: 'The planned policy is free cancellation at least 12 hours before pickup. The policy and any applicable charges for later cancellations are not finalized; they must be disclosed before a booking is made.'
  },
  {
    question: 'Can I pay or book on this website now?',
    answer: 'No. Online booking, account, and payment services are not available. Manufacturer model details are for reference and do not represent confirmed RideNow fleet inventory.'
  }
];

const helpPages = {
  'contact-form': { title: 'Contact us', description: 'Get in touch with the RideNow team.' },
  faqs: { title: 'Frequently asked questions', description: 'Quick answers about the RideNow prototype and planned rental experience.' },
  'rental-policies': { title: 'Rental policies', description: 'Review the planned rules for renting with RideNow.' },
  'cancellation-policy': { title: 'Cancellation policy', description: 'Understand the planned cancellation window and what is not yet finalized.' },
  'privacy-policy': { title: 'Privacy policy', description: 'Learn what this frontend demo does and does not do with your information.' },
  'terms-conditions': { title: 'Terms & conditions', description: 'Read the terms summary for using this RideNow prototype.' }
};

export default function HelpCenter({ section, onBack }) {
  const [formMessage, setFormMessage] = useState('');
  const currentPage = helpPages[section] ?? helpPages['contact-form'];

  function handleContactSubmit(event) {
    event.preventDefault();
    setFormMessage('This demo does not send or save messages. Please email ridenowsupport@gmail.com directly for support.');
    event.currentTarget.reset();
  }

  return (
    <div className="help-page">
      <div className="help-shell">
        <button className="page-back-arrow" type="button" onClick={onBack} aria-label="Go back">
          <ArrowLeft size={18} />
        </button>
        <header className="help-hero">
          <div className="help-hero-copy">
            <p className="help-eyebrow"><ShieldCheck size={15} /> RIDENOW SUPPORT</p>
            <h1>{currentPage.title}</h1>
            <p>{currentPage.description}</p>
          </div>
        </header>

        {section === 'contact-form' && <section className="help-panel contact-panel" id="contact-form" aria-labelledby="contact-title">
          <div className="help-section-heading">
            <p className="help-eyebrow">WE’RE HERE TO HELP</p>
            <h2 id="contact-title">Contact us</h2>
            <p>Send us a note about your question. This form is a frontend demo and does not transmit or store your message.</p>
          </div>
          <div className="contact-grid">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-fields">
                <label>
                  Full name
                  <input name="name" type="text" autoComplete="name" placeholder="Your name" minLength={2} required />
                </label>
                <label>
                  Email address
                  <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                </label>
              </div>
              <label>
                What can we help with?
                <select name="topic" defaultValue="" required>
                  <option value="" disabled>Select a topic</option>
                  <option value="vehicles">Vehicles and features</option>
                  <option value="rental-policy">Rental policies</option>
                  <option value="account">Account help</option>
                  <option value="feedback">Website feedback</option>
                  <option value="other">Other question</option>
                </select>
              </label>
              <label>
                Your message
                <textarea name="message" rows="5" minLength={10} placeholder="Tell us how we can help..." required />
              </label>
              <button className="button button-primary contact-submit" type="submit">
                <Send size={16} /> Submit message
              </button>
              {formMessage && <p className="contact-demo-message" role="status">{formMessage}</p>}
            </form>

            <aside className="contact-aside">
              <span className="contact-aside-icon"><Bike size={21} /></span>
              <h3>Talk to RideNow</h3>
              <p>For assistance, email our support address. We don’t have live phone or branch support in this prototype.</p>
              <a className="contact-detail" href="mailto:ridenowsupport@gmail.com">
                <Mail size={17} /> ridenowsupport@gmail.com
              </a>
              <div className="contact-aside-note">
                <MapPin size={16} />
                <span>Serving multiple locations. Branch addresses and operating hours will be added when confirmed.</span>
              </div>
            </aside>
          </div>
        </section>}

        {section === 'faqs' && <section className="help-panel faq-panel" id="faqs" aria-labelledby="faq-title">
          <div className="help-section-heading">
            <p className="help-eyebrow">QUICK ANSWERS</p>
            <h2 id="faq-title">Frequently asked questions</h2>
            <p>These answers describe the current prototype and planned initial rental rules.</p>
          </div>
          <div className="faq-list">
            {faqs.map(item => (
              <details key={item.question} className="faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>}

        {section === 'rental-policies' && <section className="help-panel policy-panel" id="rental-policies" aria-labelledby="rental-policy-title">
          <div className="help-section-heading">
            <p className="help-eyebrow">BEFORE YOUR RIDE</p>
            <h2 id="rental-policy-title">Rental policies</h2>
            <p>Planned operating rules for the initial release. Any item marked as not configured must be finalized and shown before live bookings begin.</p>
          </div>
          <div className="policy-grid">
            <article className="policy-card">
              <h3>Pickup and return</h3>
              <p>Choose a pickup branch and return the vehicle to that same branch. Branch-level availability and opening hours are not live yet.</p>
            </article>
            <article className="policy-card">
              <h3>Rental duration and price</h3>
              <p>Planned billing rounds partial rental hours up to a full hour and applies a configured daily price cap. Final rates, taxes, and charges are not published or live.</p>
            </article>
            <article className="policy-card">
              <h3>Late returns</h3>
              <p>A 15-minute grace period after the scheduled return time is planned before late fees may apply. Fee amounts and extensions are not configured.</p>
            </article>
            <article className="policy-card">
              <h3>Vehicle availability</h3>
              <p>Live availability must account for confirmed bookings, temporary booking holds, and maintenance. This prototype does not reserve vehicles.</p>
            </article>
            <article className="policy-card">
              <h3>Licence and vehicle checks</h3>
              <p>Riders will need a valid licence suitable for the selected vehicle. Exact eligibility, verification, inspection, and helmet requirements must be confirmed for each vehicle.</p>
            </article>
            <article className="policy-card">
              <h3>Security deposit and payment</h3>
              <p>The refundable deposit is planned to be separate from the rental charge. Amounts and release timing are not set. Payments must be verified securely; card details will not be stored by RideNow.</p>
            </article>
          </div>
          <p className="policy-disclaimer">No booking, payment, vehicle reservation, or live rental service is available through this demo.</p>
        </section>}

        {section === 'cancellation-policy' && <section className="help-panel policy-panel" id="cancellation-policy" aria-labelledby="cancellation-title">
          <div className="help-section-heading">
            <p className="help-eyebrow">CHANGES TO YOUR PLANS</p>
            <h2 id="cancellation-title">Cancellation policy</h2>
          </div>
          <div className="policy-callout">
            <h3>Planned free-cancellation window</h3>
            <p>Cancellation is planned to be free when made at least 12 hours before the scheduled pickup time.</p>
            <p>For cancellations made less than 12 hours before pickup, any fee or refund treatment is not finalized. The applicable terms must be clearly disclosed before a customer confirms a real booking. No cancellation or refund can be processed in this frontend demo.</p>
          </div>
        </section>}

        {section === 'privacy-policy' && <section className="help-panel legal-panel" id="privacy-policy" aria-labelledby="privacy-title">
          <div className="help-section-heading">
            <p className="help-eyebrow">YOUR INFORMATION</p>
            <h2 id="privacy-title">Privacy policy</h2>
            <p>Prototype privacy notice · 29 October 2026</p>
          </div>
          <div className="legal-copy">
            <h3>What this demo collects</h3>
            <p>This frontend prototype does not send or save contact-form submissions, sign-in details, or sign-up details. Form confirmation messages are for demonstration only. No account, booking, or payment backend is connected.</p>
            <h3>External services</h3>
            <p>Links to external images and other third-party services may connect your browser to those providers.</p>
            <h3>Future live service</h3>
            <p>Before RideNow accepts real customers, this notice must be updated to identify the responsible business, the data actually collected, purposes, retention periods, processors, user choices, and a working privacy contact.</p>
          </div>
        </section>}

        {section === 'terms-conditions' && <section className="help-panel legal-panel" id="terms-conditions" aria-labelledby="terms-title">
          <div className="help-section-heading">
            <p className="help-eyebrow">USING RIDENOW</p>
            <h2 id="terms-title">Terms &amp; conditions</h2>
            <p>Prototype terms summary · 29 October 2026</p>
          </div>
          <div className="legal-copy">
            <h3>Prototype only</h3>
            <p>Vehicle names and specifications are manufacturer references only. They do not confirm RideNow fleet inventory, availability, rental rates, or a reservation.</p>
            <h3>Before a real booking</h3>
            <p>Final eligibility rules, vehicle condition, pickup and return steps, rental charges, taxes, deposits, late fees, cancellation and refund terms must be displayed and accepted before a live booking can be made.</p>
            <h3>Payment and account services</h3>
            <p>Account registration, booking, and payment are not enabled. RideNow does not process a payment through this prototype. The final terms must be reviewed and approved for the operating business and locations before launch.</p>
          </div>
          <p className="policy-disclaimer">This draft is practical product guidance, not legal advice or a finalized customer contract.</p>
        </section>}
      </div>
    </div>
  );
}
