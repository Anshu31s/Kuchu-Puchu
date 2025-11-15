export default function HeartStamp() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Heart Stamp"
    >
      <defs>
        <filter id="grain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1"
            numOctaves="2"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" in="noise" result="mono" />
          <feComponentTransfer in="mono" result="grain">
            <feFuncA type="table" tableValues="0 0 0.15 0.45" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>
      </defs>

      <g fill="#c83d52" opacity="0.9" filter="url(#grain)">
        <circle cx="188" cy="100" r="3" />
        <circle cx="185.001" cy="122.776" r="3" />
        <circle cx="176.210" cy="144" r="3" />
        <circle cx="162.225" cy="162.225" r="3" />
        <circle cx="144" cy="176.210" r="3" />
        <circle cx="122.776" cy="185.001" r="3" />
        <circle cx="100" cy="188" r="3" />
        <circle cx="77.223" cy="185.001" r="3" />
        <circle cx="56" cy="176.210" r="3" />
        <circle cx="37.774" cy="162.225" r="3" />
        <circle cx="23.789" cy="144" r="3" />
        <circle cx="14.998" cy="122.776" r="3" />
        <circle cx="12" cy="100" r="3" />
        <circle cx="14.998" cy="77.223" r="3" />
        <circle cx="23.789" cy="56" r="3" />
        <circle cx="37.774" cy="37.774" r="3" />
        <circle cx="56" cy="23.789" r="3" />
        <circle cx="77.223" cy="14.998" r="3" />
        <circle cx="100" cy="12" r="3" />
        <circle cx="122.776" cy="14.998" r="3" />
        <circle cx="144" cy="23.789" r="3" />
        <circle cx="162.225" cy="37.774" r="3" />
        <circle cx="176.210" cy="56" r="3" />
        <circle cx="185.001" cy="77.223" r="3" />
      </g>

      <circle
        cx="100"
        cy="100"
        r="72"
        stroke="#c83d52"
        strokeWidth="5"
        fill="none"
        opacity="0.95"
      />

      <circle
        cx="100"
        cy="100"
        r="55"
        stroke="#c83d52"
        strokeWidth="2.5"
        fill="none"
        opacity="0.8"
      />

      <path
        d="M100 82 C100 68 82 68 82 82 C82 96 100 108 100 108 C100 108 118 96 118 82 C118 68 100 68 100 82 Z"
        fill="#c83d52"
        stroke="#9e2b3d"
        strokeWidth="1"
        opacity="0.95"
        filter="url(#grain)"
      />

      <path id="topArc" d="M50 90 A45 45 0 0 1 150 95" fill="none" />

      <text
        fontSize="14"
        textAnchor="middle"
        fill="#c83d52"
        style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.2em", fontWeight: 600 }}
      >
        <textPath href="#topArc" startOffset="50%">
          LOVE
        </textPath>
      </text>

      <path id="bottomArc" d="M155 110 A55 50 0 0 1 45 110" fill="none" />

      <text
        fontSize="12"
        textAnchor="middle"
        fill="#b23a4b"
        style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "0.15em", fontWeight: 500 }}
      >
        <textPath href="#bottomArc" startOffset="50%">
          STAMPED
        </textPath>
      </text>
    </svg>
  );
}
