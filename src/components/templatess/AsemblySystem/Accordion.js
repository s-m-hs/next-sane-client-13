import { ChevronDownIcon } from "./Icons";

export default function Accordion({ items, defaultOpenIndex = 0 }) {
  return (
    <div className="d-flex flex-column gap-3">
      {items.map((item, i) => (
        <details key={item.title} open={i === defaultOpenIndex} className="sane-accordion-item">
          <summary>
            <span>{item.title}</span>
            <span className="sane-accordion-icon d-inline-flex">
              <ChevronDownIcon size={16} />
            </span>
          </summary>
          <div className="sane-accordion-body">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
