import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/categories.js';
import SectionHeading from '../common/SectionHeading.jsx';

export default function Categories() {
  return (
    <section className="content-section categories-section" id="vehicles">
      <SectionHeading title="Choose Your" accent="Ride"
        subtitle="Find the perfect two-wheeler for your next adventure."
        action="View All Categories" />
      <div className="category-grid">
        {categories.map(item => (
          <a href="#featured" className={`category-card ${item.className}`} key={item.title}>
            <div className="category-copy">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <span className="round-arrow"><ArrowRight size={16} /></span>
            </div>
            <img src={item.image} alt={item.imageAlt} loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
}
