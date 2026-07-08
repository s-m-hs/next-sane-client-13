export default function AssembleAnimation() {
  return (
    <div className="sane-assemble-wrap" aria-hidden="true">
      <svg viewBox="0 0 440 320" style={{ width: "100%", height: "100%", overflow: "visible" }}>
        {/* بدنه کیس — همیشه ثابت و قابل مشاهده */}
        <rect x="120" y="14" width="200" height="292" rx="18" fill="#FFFFFF" stroke="#DDD3F5" strokeWidth="2.5" />
        <rect x="136" y="30" width="168" height="260" rx="10" fill="#FAF8FF" stroke="#ECE9F5" strokeWidth="1.5" />
        <circle cx="220" cy="24" r="4" fill="#DDD3F5" />
        <rect x="148" y="272" width="140" height="4" rx="2" fill="#ECE9F5" />
        <rect x="148" y="280" width="140" height="4" rx="2" fill="#ECE9F5" />

        {/* مادربرد */}
        <g className="fp-part anim-mobo">
          <rect x="148" y="44" width="144" height="196" rx="8" fill="#0F8A5F" opacity="0.92" />
          <rect x="160" y="56" width="18" height="18" rx="2" fill="#0B6B48" />
          <rect x="184" y="56" width="18" height="18" rx="2" fill="#0B6B48" />
          <rect x="160" y="200" width="60" height="8" rx="2" fill="#0B6B48" />
          <rect x="160" y="212" width="40" height="8" rx="2" fill="#0B6B48" />
        </g>

        {/* رم — دو استیک */}
        <g className="fp-part anim-ram">
          <rect x="262" y="58" width="12" height="80" rx="2" fill="#2563EB" />
          <rect x="278" y="58" width="12" height="80" rx="2" fill="#2563EB" />
        </g>

        {/* هارد / SSD */}
        <g className="fp-part anim-ssd">
          <rect x="252" y="196" width="46" height="20" rx="3" fill="#DB2777" opacity="0.9" />
        </g>

        {/* پاور (PSU) */}
        <g className="fp-part anim-psu">
          <rect x="160" y="244" width="120" height="42" rx="4" fill="#374151" />
          <circle cx="180" cy="265" r="10" fill="#4B5563" />
        </g>

        {/* پردازنده (CPU) — زیر فن */}
        <g className="fp-part anim-cpu">
          <rect x="196" y="86" width="40" height="40" rx="4" fill="#9CA3AF" />
          <rect x="203" y="93" width="26" height="26" rx="2" fill="#D1D5DB" />
        </g>

        {/* فن خنک‌کننده روی پردازنده */}
        <g className="fp-part anim-fan">
          <circle cx="216" cy="106" r="26" fill="#EDE9FE" stroke="#6D28D9" strokeWidth="2" />
          <g stroke="#6D28D9" strokeWidth="2" strokeLinecap="round">
            <path d="M216 106 L216 86" />
            <path d="M216 106 L233 116" />
            <path d="M216 106 L199 116" />
          </g>
          <circle cx="216" cy="106" r="4" fill="#6D28D9" />
        </g>

        {/* درخشش تکمیل اسمبل */}
        <g className="fp-part anim-spark">
          <circle cx="216" cy="106" r="30" fill="url(#sparkGlow)" />
        </g>

        <defs>
          <radialGradient id="sparkGlow">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
