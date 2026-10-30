import { Bike, Zap, WalletCards, ClipboardCheck, ShieldCheck } from 'lucide-react';

const benefits = [
  { icon: <Bike />, title: 'Wide Range', subtitle: 'Bikes & Scooters' },
  { icon: <Zap />, title: 'Petrol & Electric', subtitle: 'For Every Journey' },
  { icon: <WalletCards />, title: 'Transparent Pricing', subtitle: 'No Hidden Charges' },
  { icon: <ClipboardCheck />, title: 'Easy Booking', subtitle: 'In Just a Few Steps' },
  { icon: <ShieldCheck />, title: 'Reliable & Safe', subtitle: 'Verified Vehicles' }
];

export default function Benefits() {
  return (
    <section className="benefits" aria-label="RideNow benefits">
      {benefits.map(item => (
        <div className="benefit" key={item.title}>
          <span className="benefit-icon">{item.icon}</span>
          <span>
            <strong>{item.title}</strong>
            <small>{item.subtitle}</small>
          </span>
        </div>
      ))}
    </section>
  );
}
