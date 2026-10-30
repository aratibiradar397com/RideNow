import { ArrowRight } from 'lucide-react';

export default function SectionHeading({
  title,
  accent,
  subtitle,
  action = 'View All',
  href = '#featured'
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title} <span>{accent}</span></h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <a className="text-link" href={href}>{action} <ArrowRight size={15} /></a>
    </div>
  );
}
