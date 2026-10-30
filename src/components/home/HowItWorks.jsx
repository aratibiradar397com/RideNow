import SectionHeading from '../common/SectionHeading.jsx';

const steps = [
  { number: '01', title: 'Find your vehicle', text: 'Choose a location, rental dates and the ride that fits your plans.' },
  { number: '02', title: 'Review the details', text: 'Check the vehicle, rental terms, and full price before you request a booking.' },
  { number: '03', title: 'Pick up and go', text: 'After booking is enabled, complete the pickup check and start your ride.' }
];

export default function HowItWorks() {
  return (
    <section className="how-section" id="how-it-works">
      <div className="content-section">
        <SectionHeading title="Your Ride in" accent="3 Simple Steps"
          subtitle="The customer journey is shown here as a frontend preview."
          action="Get Started" href="#booking" />
        <div className="steps-grid">
          {steps.map(step => (
            <div className="step-card" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
