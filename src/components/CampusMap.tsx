import type { CampusLocation, CampusPath } from "@/types";

type CampusMapProps = {
  locations: CampusLocation[];
  paths: CampusPath[];
  pathSlugs?: string[];
};

type Point = { x: number; y: number };
type BuildingSpec = {
  slug?: string;
  title: string;
  subtitle?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  roof: string;
};

const mapPoints: Record<string, Point> = {
  "main-gate": { x: 115, y: 450 },
  "administrative-office": { x: 300, y: 450 },
  "cse-block": { x: 510, y: 330 },
  "ai-lab": { x: 700, y: 220 },
  "computer-lab": { x: 700, y: 405 },
  cafeteria: { x: 500, y: 565 },
  library: { x: 780, y: 565 },
  auditorium: { x: 1000, y: 455 },
  "seminar-hall": { x: 980, y: 650 },
  hostel: { x: 780, y: 690 },
};

const buildings: BuildingSpec[] = [
  {
    title: "Main Block",
    subtitle: "CAMPUS CENTRE",
    x: 275,
    y: 180,
    width: 130,
    height: 72,
    color: "#f1dfbd",
    roof: "#c3945c",
  },
  {
    slug: "administrative-office",
    title: "Administrative Office",
    subtitle: "OFFICES",
    x: 235,
    y: 350,
    width: 130,
    height: 72,
    color: "#e9dcc8",
    roof: "#b78d64",
  },
  {
    slug: "cse-block",
    title: "CSE Block",
    subtitle: "COMPUTING",
    x: 450,
    y: 230,
    width: 130,
    height: 76,
    color: "#dce7ef",
    roof: "#839cad",
  },
  {
    slug: "ai-lab",
    title: "AI Lab",
    subtitle: "INNOVATION",
    x: 640,
    y: 120,
    width: 120,
    height: 72,
    color: "#e1e2f4",
    roof: "#8888bd",
  },
  {
    slug: "computer-lab",
    title: "Computer Lab",
    subtitle: "LABORATORY",
    x: 750,
    y: 365,
    width: 126,
    height: 76,
    color: "#dce7ef",
    roof: "#839cad",
  },
  {
    slug: "cafeteria",
    title: "Cafeteria",
    subtitle: "CANTEEN",
    x: 440,
    y: 610,
    width: 122,
    height: 66,
    color: "#f2e2c8",
    roof: "#bc9361",
  },
  {
    slug: "library",
    title: "Library",
    subtitle: "LEARNING COMMONS",
    x: 720,
    y: 610,
    width: 126,
    height: 66,
    color: "#e8e4d4",
    roof: "#a99e78",
  },
  {
    slug: "auditorium",
    title: "Auditorium",
    subtitle: "ASSEMBLY",
    x: 975,
    y: 365,
    width: 132,
    height: 74,
    color: "#efdede",
    roof: "#b88789",
  },
  {
    slug: "seminar-hall",
    title: "Seminar Hall",
    subtitle: "LECTURE HALL",
    x: 1010,
    y: 615,
    width: 124,
    height: 68,
    color: "#e7e1ee",
    roof: "#9885a9",
  },
  {
    slug: "hostel",
    title: "Hostel",
    subtitle: "RESIDENCE",
    x: 830,
    y: 680,
    width: 132,
    height: 60,
    color: "#e6e9d6",
    roof: "#91a075",
  },
];

const roadGeometry: Record<string, string> = {
  "administrative-office:main-gate": "M 115 450 H 300",
  "administrative-office:cafeteria": "M 300 450 H 390 V 565 H 500",
  "administrative-office:cse-block": "M 300 450 H 390 V 330 H 510",
  "cafeteria:hostel": "M 500 565 H 640 V 690 H 780",
  "cafeteria:library": "M 500 565 H 780",
  "cafeteria:cse-block": "M 510 330 H 455 V 565 H 500",
  "cse-block:ai-lab": "M 510 330 H 610 V 220 H 700",
  "computer-lab:cse-block": "M 510 330 H 620 V 405 H 700",
  "auditorium:library": "M 780 565 H 875 V 455 H 1000",
  "library:seminar-hall": "M 780 565 H 875 V 650 H 980",
};

function edgeKey(from: string, to: string) {
  return [from, to].sort().join(":");
}

function edgePath(from: string, to: string) {
  const key = edgeKey(from, to);
  if (roadGeometry[key]) return roadGeometry[key];

  const a = mapPoints[from];
  const b = mapPoints[to];
  if (!a || !b) return "";

  const bend = Math.round((a.x + b.x) / 2);
  return `M ${a.x} ${a.y} H ${bend} V ${b.y} H ${b.x}`;
}

function Building({ building }: { building: BuildingSpec }) {
  const windowCount = building.width > 124 ? 4 : 3;
  const windowGap = (building.width - 40) / windowCount;

  return (
    <g>
      <rect
        x={building.x + 4}
        y={building.y + 6}
        width={building.width}
        height={building.height}
        rx="5"
        fill="#53634c"
        opacity=".12"
      />
      <rect
        x={building.x}
        y={building.y + 5}
        width={building.width}
        height={building.height}
        rx="4"
        fill={building.color}
        stroke="#8f9986"
        strokeWidth="1.5"
      />
      <path
        d={`M ${building.x - 3} ${building.y + 10} L ${building.x + building.width / 2} ${building.y} L ${building.x + building.width + 3} ${building.y + 10} Z`}
        fill={building.roof}
        stroke="#8f9986"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line
        x1={building.x + 8}
        y1={building.y + 16}
        x2={building.x + building.width - 8}
        y2={building.y + 16}
        stroke="#ffffff"
        strokeOpacity=".55"
        strokeWidth="2"
      />
      {Array.from({ length: windowCount }, (_, index) => (
        <g key={index}>
          <rect
            x={building.x + 13 + index * windowGap}
            y={building.y + 24}
            width="13"
            height="16"
            rx="1.5"
            fill="#93b3b8"
            stroke="#718d91"
            strokeWidth="1"
          />
          <line
            x1={building.x + 19.5 + index * windowGap}
            y1={building.y + 24}
            x2={building.x + 19.5 + index * windowGap}
            y2={building.y + 40}
            stroke="#f5f4ea"
            strokeWidth="1"
          />
        </g>
      ))}
      <rect
        x={building.x + building.width / 2 - 8}
        y={building.y + building.height - 19}
        width="16"
        height="24"
        rx="2"
        fill="#8e765a"
        stroke="#756349"
        strokeWidth="1"
      />
      <text
        x={building.x + building.width / 2}
        y={building.y + building.height + 20}
        textAnchor="middle"
        fill="#344438"
        fontSize="15"
        fontWeight="700"
        paintOrder="stroke"
        stroke="#f8f7e9"
        strokeWidth="5"
        strokeLinejoin="round"
      >
        {building.title}
      </text>
      {building.subtitle && (
        <text
          x={building.x + building.width / 2}
          y={building.y + building.height + 35}
          textAnchor="middle"
          fill="#758174"
          fontSize="9"
          fontWeight="600"
          letterSpacing="1.4"
          paintOrder="stroke"
          stroke="#f8f7e9"
          strokeWidth="3"
          strokeLinejoin="round"
        >
          {building.subtitle}
        </text>
      )}
    </g>
  );
}

function Tree({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="1" cy="8" rx="13" ry="5" fill="#667e58" opacity=".14" />
      <path d="M 0 2 V 13" stroke="#887454" strokeWidth="3" strokeLinecap="round" />
      <circle cx="-5" cy="-4" r="8" fill="#8ba979" />
      <circle cx="5" cy="-5" r="8" fill="#6f9465" />
      <circle cx="0" cy="-11" r="8" fill="#9ab886" />
      <circle cx="-2" cy="-8" r="2" fill="#b7cc9d" opacity=".75" />
    </g>
  );
}

function Garden({ x, y, width, height, label }: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="20"
        fill="#e3edcf"
        stroke="#b7c99d"
        strokeDasharray="5 5"
      />
      <text
        x={x + width / 2}
        y={y + height - 9}
        textAnchor="middle"
        fill="#64805a"
        fontSize="11"
        fontWeight="700"
        letterSpacing="1"
      >
        {label}
      </text>
    </g>
  );
}

export default function CampusMap({
  locations,
  paths,
  pathSlugs = [],
}: CampusMapProps) {
  const activeEdges = new Set(
    pathSlugs.slice(0, -1).map((slug, index) => edgeKey(slug, pathSlugs[index + 1])),
  );
  const locationBySlug = new Map(locations.map((location) => [location.slug, location]));
  const trees = [
    [72, 144], [145, 152], [208, 136], [437, 130], [535, 150], [815, 142],
    [925, 136], [1094, 146], [1090, 238], [1122, 295], [1110, 550], [920, 730],
    [678, 730], [564, 714], [350, 710], [185, 720], [74, 640], [80, 548],
    [420, 540], [682, 485], [920, 292], [934, 270], [322, 520], [342, 540],
  ];

  return (
    <div className="relative flex h-full min-h-[320px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[#d7dfd0] bg-[#f7f6e9] shadow-sm">
      <div className="absolute left-3 top-3 z-10 rounded-lg border border-[#e2e6da] bg-[#fffef8]/95 px-3 py-2 shadow-sm backdrop-blur sm:left-4 sm:top-4">
        <p className="text-xs font-semibold text-slate-800">Campus map</p>
        <p className="mt-0.5 text-[10px] text-slate-500">
          {pathSlugs.length > 0 ? "Route highlighted" : "Select a place to begin"}
        </p>
      </div>
      <div className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-lg border border-[#e2e6da] bg-[#fffef8]/95 px-2.5 py-2 text-[10px] font-medium text-slate-600 shadow-sm sm:right-4 sm:top-4">
        <span className="size-2 rounded-full bg-indigo-600" />
        Walking route
      </div>

      <svg
        role="img"
        aria-label="Illustrated campus master plan with buildings, roads, gardens, and a highlighted walking route"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full min-h-[320px] w-full object-contain"
      >
        <defs>
          <pattern id="campus-paper" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#d9dfcd" opacity=".4" />
          </pattern>
          <filter id="campus-shadow" x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#58674e" floodOpacity=".16" />
          </filter>
        </defs>
        <style>{`
          @keyframes campus-route-dash {
            to { stroke-dashoffset: -30; }
          }
          .campus-route-flow {
            animation: campus-route-dash 2.8s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .campus-route-flow { animation: none; }
          }
        `}</style>

        <rect width="1200" height="800" fill="#f7f6e9" />
        <rect width="1200" height="800" fill="url(#campus-paper)" />
        <rect
          x="36"
          y="58"
          width="1128"
          height="700"
          rx="8"
          fill="#edf1dc"
          stroke="#9cae88"
          strokeWidth="3"
        />
        <rect
          x="47"
          y="69"
          width="1106"
          height="678"
          rx="5"
          fill="none"
          stroke="#b8c5a7"
          strokeWidth="1.5"
          strokeDasharray="7 5"
        />

        <text x="66" y="94" fill="#52684e" fontSize="11" fontWeight="700" letterSpacing="2">
          CAMPUS MASTER PLAN
        </text>
        <text x="66" y="111" fill="#819078" fontSize="9" letterSpacing="1.5">
          PEDESTRIAN ACCESS · ALL DISTANCES APPROXIMATE
        </text>
        <g transform="translate(1114 104)">
          <path d="M 0 20 L 9 0 L 18 20 L 9 15 Z" fill="#82966f" />
          <text x="9" y="33" textAnchor="middle" fill="#64765d" fontSize="9" fontWeight="700">
            N
          </text>
        </g>

        <Garden x={66} y={132} width={154} height={145} label="NORTH GARDEN" />
        <Garden x={840} y={245} width={112} height={91} label="GARDEN" />
        <Garden x={68} y={566} width={172} height={157} label="GREEN LAWN" />
        <Garden x={930} y={690} width={182} height={48} label="CAMPUS GREEN" />

        <g>
          <rect x="555" y="474" width="198" height="94" rx="12" fill="#cfe0c1" stroke="#a5bf91" strokeWidth="2" />
          <rect x="568" y="486" width="172" height="68" rx="7" fill="#b7d19f" />
          <path d="M 578 538 H 730 M 578 520 H 730 M 578 502 H 730" stroke="#edf3df" strokeWidth="3" strokeDasharray="10 7" />
          <text x="654" y="570" textAnchor="middle" fill="#5f7952" fontSize="12" fontWeight="700" letterSpacing="1">
            PLAYGROUND
          </text>
        </g>

        <g>
          <rect x="117" y="331" width="112" height="59" rx="6" fill="#e4e6d5" stroke="#abb49b" strokeWidth="1.5" />
          <text x="173" y="348" textAnchor="middle" fill="#657360" fontSize="10" fontWeight="700" letterSpacing="1">
            PARKING
          </text>
          <g fill="#f5f2df" stroke="#9da58e" strokeWidth="1">
            <rect x="130" y="358" width="26" height="13" rx="4" />
            <rect x="161" y="358" width="26" height="13" rx="4" />
            <rect x="192" y="358" width="26" height="13" rx="4" />
          </g>
          <g fill="#8795a0">
            <rect x="136" y="355" width="13" height="4" rx="2" />
            <rect x="167" y="355" width="13" height="4" rx="2" />
            <rect x="198" y="355" width="13" height="4" rx="2" />
          </g>
        </g>

        {paths.map((path) => {
          const d = edgePath(path.from, path.to);
          if (!d) return null;
          return (
            <g key={edgeKey(path.from, path.to)}>
              <path d={d} fill="none" stroke="#c9cdc1" strokeWidth="38" strokeLinecap="round" strokeLinejoin="round" />
              <path d={d} fill="none" stroke="#e4e5dd" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
              <path d={d} fill="none" stroke="#fffdf4" strokeWidth="2" strokeDasharray="12 11" strokeLinecap="round" />
            </g>
          );
        })}

        <path d="M 48 450 H 115" fill="none" stroke="#c9cdc1" strokeWidth="42" />
        <path d="M 48 450 H 115" fill="none" stroke="#e4e5dd" strokeWidth="32" />
        <path d="M 48 450 H 115" fill="none" stroke="#fffdf4" strokeWidth="2" strokeDasharray="12 11" />

        <g fill="none" stroke="#b9c6a7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 365 422 V 450" />
          <path d="M 510 306 V 330" />
          <path d="M 700 192 V 220" />
          <path d="M 700 405 H 750" />
          <path d="M 500 565 V 610" />
          <path d="M 780 565 V 610" />
          <path d="M 1000 439 V 455" />
          <path d="M 980 650 H 1010" />
          <path d="M 780 690 H 830" />
        </g>

        <g>
          <path d="M 75 418 V 482 M 88 418 V 482" stroke="#8a7657" strokeWidth="7" strokeLinecap="round" />
          <path d="M 66 426 H 98 M 66 474 H 98" stroke="#b2976e" strokeWidth="4" />
          <text x="91" y="502" fill="#53674d" fontSize="13" fontWeight="700" paintOrder="stroke" stroke="#edf1dc" strokeWidth="4">
            MAIN GATE
          </text>
        </g>

        <g fill="none" stroke="#a6bb91" strokeWidth="3" strokeDasharray="7 7" strokeLinecap="round">
          <path d="M 250 294 C 308 300 350 284 418 274" />
          <path d="M 254 545 C 310 528 344 534 388 550" />
          <path d="M 810 264 C 823 302 816 334 800 350" />
          <path d="M 884 686 C 930 687 959 672 986 651" />
        </g>

        <g filter="url(#campus-shadow)">
          {buildings.map((building) => (
            <Building key={building.slug ?? building.title} building={building} />
          ))}
        </g>

        {trees.map(([x, y], index) => (
          <Tree key={`${x}-${y}`} x={x} y={y} scale={index % 3 === 0 ? 1 : 0.82} />
        ))}

        <g transform="translate(840 285)">
          <circle r="18" fill="#f2e9bf" stroke="#c6b875" strokeWidth="2" />
          <path d="M -10 0 H 10 M 0 -10 V 10 M -7 -7 L 7 7 M 7 -7 L -7 7" stroke="#aa9853" strokeWidth="2" />
          <text y="30" textAnchor="middle" fill="#70805b" fontSize="10" fontWeight="700" paintOrder="stroke" stroke="#edf1dc" strokeWidth="4">
            GARDEN
          </text>
        </g>

        {locations.map((location) => {
          const point = mapPoints[location.slug];
          if (!point) return null;
          return (
            <g key={`access-${location.slug}`}>
              <circle cx={point.x} cy={point.y} r="5" fill="#fffef8" stroke="#93a18b" strokeWidth="2" />
            </g>
          );
        })}

        {paths.map((path) => {
          if (!activeEdges.has(edgeKey(path.from, path.to))) return null;
          const d = edgePath(path.from, path.to);
          return (
            <g key={`route-${edgeKey(path.from, path.to)}`}>
              <path d={d} fill="none" stroke="#fffdf8" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
              <path d={d} fill="none" stroke="#5c4bd8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d={d}
                fill="none"
                stroke="#b9b1ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="2 14"
                className="campus-route-flow"
              />
            </g>
          );
        })}

        {pathSlugs.map((slug, index) => {
          const point = mapPoints[slug];
          const location = locationBySlug.get(slug);
          if (!point || !location) return null;
          const isStart = index === 0;
          const isDestination = index === pathSlugs.length - 1;
          const fill = isStart ? "#2f9a6d" : isDestination ? "#c85264" : "#6556d9";
          const radius = isStart || isDestination ? 14 : 10;
          return (
            <g key={`marker-${slug}`} filter="url(#campus-shadow)">
              <circle cx={point.x} cy={point.y} r={radius + 5} fill="#fffdf8" opacity=".96" />
              <circle cx={point.x} cy={point.y} r={radius} fill={fill} stroke="#fff" strokeWidth="2.5" />
              {isStart || isDestination ? (
                <circle cx={point.x} cy={point.y} r="3.5" fill="#fff" />
              ) : (
                <text
                  x={point.x}
                  y={point.y + 3.5}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="9"
                  fontWeight="700"
                >
                  {index}
                </text>
              )}
              <text
                x={point.x}
                y={point.y - radius - 11}
                textAnchor="middle"
                fill={fill}
                fontSize="11"
                fontWeight="700"
                paintOrder="stroke"
                stroke="#fffdf8"
                strokeWidth="4"
                strokeLinejoin="round"
              >
                {isStart ? "START" : isDestination ? "DESTINATION" : location.name}
              </text>
            </g>
          );
        })}

        <g transform="translate(1073 716)">
          <rect x="-66" y="-17" width="82" height="30" rx="5" fill="#fffdf5" stroke="#c7cebb" />
          <path d="M -53 -2 H -35" stroke="#879681" strokeWidth="3" strokeDasharray="4 3" />
          <text x="-29" y="2" fill="#687763" fontSize="9" fontWeight="700">WALKWAY</text>
        </g>
      </svg>

      <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-[#e2e6da] bg-[#fffef8]/95 px-3 py-2 text-[10px] text-slate-600 shadow-sm sm:bottom-4 sm:left-4 sm:gap-x-4">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-600" />
          Start
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-600" />
          Destination
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1 w-4 rounded bg-indigo-600" />
          Route
        </span>
      </div>
    </div>
  );
}
