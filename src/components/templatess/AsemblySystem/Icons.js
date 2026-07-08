export function CategoryIcon({ name, size = 22, className = "" }) {
  const common = {
    width: size,
    height: size,
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "Gaming":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M6 9h12a4 4 0 0 1 4 4l-1.2 5a2 2 0 0 1-3.6.8L15 16H9l-2.2 2.8a2 2 0 0 1-3.6-.8L2 13a4 4 0 0 1 4-4Z" />
          <path d="M8 12h-2M9 10v4" />
          <circle cx="16" cy="11" r="0.8" fill="currentColor" />
          <circle cx="18" cy="13" r="0.8" fill="currentColor" />
        </svg>
      );
    case "Official":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="4" width="18" height="12" rx="1.5" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      );
    case "Programming":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="4" y="3" width="10" height="16" rx="1.5" />
          <path d="M17 8h3v9h-3M8 7h2M8 10h2M8 13h2" />
        </svg>
      );
    case "Home":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="5" y="8" width="14" height="9" rx="1.5" />
          <path d="M9 17v2h6v-2M9 12h.01" />
        </svg>
      );
    case "Design":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="4" y="4" width="16" height="11" rx="1.5" />
          <path d="M9 19h6M12 15v4" />
        </svg>
      );
    default:
      return null;
  }
}

export function SpecIcon({ name, size = 16, className = "" }) {
  const common = {
    width: size,
    height: size,
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "cpu":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="7" y="7" width="10" height="10" rx="1" />
          <path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" />
        </svg>
      );
    case "gpu":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="7" width="18" height="9" rx="1.5" />
          <circle cx="8" cy="11.5" r="1.6" />
          <circle cx="13" cy="11.5" r="1.6" />
          <path d="M3 18v1M7 18v1" />
        </svg>
      );
    case "ram":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="4" y="5" width="16" height="6" rx="1" />
          <path d="M7 11v2M10 11v2M13 11v2M16 11v2" />
        </svg>
      );
    case "storage":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <ellipse cx="12" cy="6" rx="8" ry="3" />
          <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
        </svg>
      );
    default:
      return null;
  }
}

export function StarIcon({ size = 16, className = "", filled = true }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path strokeLinejoin="round" d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.2L12 17l-5.4 3 1-6.2-4.4-4.3 6.1-.9L12 3Z" />
    </svg>
  );
}

export function ChevronIcon({ size = 16, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 6 9 12l6 6" />
    </svg>
  );
}

export function ChevronDownIcon({ size = 16, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CheckBadgeIcon({ size = 16, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 12 2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
