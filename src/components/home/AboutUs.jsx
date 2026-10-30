const focusAreas = [
  {
    number: '01',
    title: 'Choose with clarity',
    description: 'Show useful vehicle details for petrol and electric bikes and scooters so riders can compare before they book.'
  },
  {
    number: '02',
    title: 'Make rental terms clear',
    description: 'Present pricing, deposits, pickup requirements, and cancellation terms before a real booking is confirmed.'
  },
  {
    number: '03',
    title: 'Build city by city',
    description: 'Prepare for multiple rental locations, with local fleet and branch information added as it is verified.'
  }
];

export default function AboutUs() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-inner">
        <div className="about-intro">
          <p className="about-eyebrow">ABOUT RIDENOW</p>
          <h2 id="about-title">A simpler way to find your next ride.</h2>
          <p>
            RideNow is being designed to help people explore two-wheelers for everyday travel
            and weekend plans. The goal is to make it easier to compare bikes and scooters,
            understand rental details, and prepare for a confident ride.
          </p>
          <span className="about-status">Currently a frontend prototype — live rentals are not available yet.</span>
        </div>

        <div className="about-plan">
          <div className="about-plan-heading">
            <span>OUR APPROACH</span>
            <h3>What we’re working toward</h3>
          </div>
          <ol>
            {focusAreas.map(area => (
              <li key={area.number}>
                <span className="about-plan-number">{area.number}</span>
                <div>
                  <h4>{area.title}</h4>
                  <p>{area.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
