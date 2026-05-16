export default function SectionHeading({ kicker, title, align = 'left' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <span>{kicker}</span>
      <h2>{title}</h2>
    </div>
  );
}
