export default function Accordion({ title, children }) {
  return (
    <article className="accordion" tabIndex="0">
      <div className="accordion__trigger" aria-label={`${title} details`}>
        <span>
          <strong>{title}</strong>
        </span>
        <i aria-hidden="true">+</i>
      </div>

      <div className="accordion__panel">
        <div className="accordion__inner">{children}</div>
      </div>
    </article>
  );
}
