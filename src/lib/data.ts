// ============================================================
//  CONTENT — Sam Neghabat (Senior Frontend Engineer)
//  Sourced from CV; one place to edit everything.
// ============================================================

export const PERSON = {
  name: 'Sam Neghabat',
  first: 'Sam',
  last: 'Neghabat',
  role: 'Senior Frontend Engineer',
  tagline:
    'I turn complex UI systems into interfaces that feel inevitable — fueled by coffee, allergic to technical debt.',
  location: 'Tehran, Iran',
  coords: '35.69°N / 51.39°E',
  email: 'amirhesamneghabat@gmail.com',
  phone: '+98 912 716 8322',
  available: 'Open to remote roles & relocation',
  socials: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hesam-n' },
    { label: 'Email', href: 'mailto:amirhesamneghabat@gmail.com' },
  ],
};

// All visuals are self-hosted (network blocks image CDNs here).
export const IMAGES = {
  portrait: '/portrait.png',
  portraitSeed: 'sam-neghabat',
  texture: '/img/setflow.svg',
  textureSeed: 'texture',
};

export type Skill = {
  name: string;
  key: string;
  level: number; // 0-100
  years: number;
  blurb: string;
  snippet: { t: string; c?: 'kw' | 'fn' | 'str' | 'num' | 'cm' | 'op' | 'ty' | 'pl' }[][];
};

export const SKILLS: Skill[] = [
  {
    name: 'React',
    key: 'react',
    level: 97,
    years: 6,
    blurb: 'Six years deep — hooks, suspense, server components, and the instinct for when not to add state.',
    snippet: [
      [{ t: 'function ', c: 'kw' }, { t: 'usePresence', c: 'fn' }, { t: '(room: ' }, { t: 'string', c: 'ty' }, { t: ') {' }],
      [{ t: '  const ', c: 'kw' }, { t: '[peers, set] = ' }, { t: 'useState', c: 'fn' }, { t: '<' }, { t: 'Peer', c: 'ty' }, { t: '[]>([])' }],
      [{ t: '  useEffect', c: 'fn' }, { t: '(() => socket.', c: 'op' }, { t: 'on', c: 'fn' }, { t: '(room, set), [room])' }],
      [{ t: '  return', c: 'kw' }, { t: ' useMemo', c: 'fn' }, { t: '(() => peers.', c: 'op' }, { t: 'sort', c: 'fn' }, { t: '(), [peers])' }],
      [{ t: '}' }],
    ],
  },
  {
    name: 'Next.js',
    key: 'next',
    level: 95,
    years: 5,
    blurb: 'App Router, SSR/ISR, and edge rendering — where most of my product work actually ships.',
    snippet: [
      [{ t: 'export const ', c: 'kw' }, { t: 'revalidate = ' }, { t: '60', c: 'num' }, { t: '  // ISR', c: 'cm' }],
      [{ t: 'export default async function ', c: 'kw' }, { t: 'Page', c: 'fn' }, { t: '({ params }) {' }],
      [{ t: '  const ', c: 'kw' }, { t: 'data = ' }, { t: 'await', c: 'kw' }, { t: ' db.', c: 'op' }, { t: 'query', c: 'fn' }, { t: '(params.slug)' }],
      [{ t: '  return', c: 'kw' }, { t: ' <' }, { t: 'Profile', c: 'ty' }, { t: ' data={data} />' }],
      [{ t: '}' }],
    ],
  },
  {
    name: 'TypeScript',
    key: 'ts',
    level: 96,
    years: 6,
    blurb: 'Types as a thinking tool, not a tax. Strict mode, always.',
    snippet: [
      [{ t: 'type ', c: 'kw' }, { t: 'Result', c: 'ty' }, { t: '<T> = ' }, { t: '{ ok: ', c: 'pl' }, { t: 'true', c: 'kw' }, { t: '; value: T }' }],
      [{ t: '              | ' }, { t: '{ ok: ', c: 'pl' }, { t: 'false', c: 'kw' }, { t: '; error: ', c: 'pl' }, { t: 'string', c: 'ty' }, { t: ' }' }],
      [{ t: 'const ', c: 'kw' }, { t: 'parse', c: 'fn' }, { t: ' = <T>(raw: ' }, { t: 'string', c: 'ty' }, { t: '): ' }, { t: 'Result', c: 'ty' }, { t: '<T> => {' }],
      [{ t: '  try', c: 'kw' }, { t: ' { ' }, { t: 'return', c: 'kw' }, { t: ' { ok: ', c: 'pl' }, { t: 'true', c: 'kw' }, { t: ', value: ', c: 'pl' }, { t: 'JSON', c: 'ty' }, { t: '.', c: 'op' }, { t: 'parse', c: 'fn' }, { t: '(raw) }' }],
      [{ t: '  } ' }, { t: 'catch', c: 'kw' }, { t: ' (e) { ' }, { t: 'return', c: 'kw' }, { t: ' fail(e) }' }],
      [{ t: '}' }],
    ],
  },
  {
    name: 'Tailwind CSS',
    key: 'tw',
    level: 94,
    years: 4,
    blurb: 'Design systems at speed — led a Material UI → Shadcn + Tailwind migration that cut bundle size.',
    snippet: [
      [{ t: '<button', c: 'ty' }, { t: ' className=' }, { t: '"group inline-flex', c: 'str' }],
      [{ t: '  items-center gap-2 rounded-lg bg-lime-400', c: 'str' }],
      [{ t: '  px-4 py-2 text-zinc-950 transition', c: 'str' }],
      [{ t: '  hover:shadow-glow"', c: 'str' }, { t: '>' }],
      [{ t: '  Ship it →' }],
      [{ t: '</button>', c: 'ty' }],
    ],
  },
  {
    name: 'TanStack Query',
    key: 'rq',
    level: 90,
    years: 4,
    blurb: 'Server state without the boilerplate. Caching, mutations, and optimistic updates that just work.',
    snippet: [
      [{ t: 'const ', c: 'kw' }, { t: '{ data, isPending } = ' }, { t: 'useQuery', c: 'fn' }, { t: '({' }],
      [{ t: '  queryKey: ', c: 'pl' }, { t: '[' }, { t: "'assets'", c: 'str' }, { t: ', userId],' }],
      [{ t: '  queryFn: ', c: 'pl' }, { t: '() => api.', c: 'op' }, { t: 'assets', c: 'fn' }, { t: '(userId),' }],
      [{ t: '  staleTime: ', c: 'pl' }, { t: '30_000', c: 'num' }, { t: ',' }],
      [{ t: '})' }],
    ],
  },
  {
    name: 'Node.js',
    key: 'node',
    level: 85,
    years: 6,
    blurb: 'BFFs, route handlers, and the glue between browser and backend. Streams over buffers.',
    snippet: [
      [{ t: 'app', c: 'pl' }, { t: '.', c: 'op' }, { t: 'use', c: 'fn' }, { t: '(' }, { t: 'async', c: 'kw' }, { t: ' (ctx, next) => {' }],
      [{ t: '  const ', c: 'kw' }, { t: 't = ' }, { t: 'performance', c: 'ty' }, { t: '.', c: 'op' }, { t: 'now', c: 'fn' }, { t: '()' }],
      [{ t: '  await', c: 'kw' }, { t: ' next()' }],
      [{ t: '  ctx', c: 'pl' }, { t: '.', c: 'op' }, { t: 'set', c: 'fn' }, { t: '(' }, { t: "'Server-Timing'", c: 'str' }, { t: ', `app;dur=${' }, { t: 'performance', c: 'ty' }, { t: '.', c: 'op' }, { t: 'now', c: 'fn' }, { t: '()-t}`)' }],
      [{ t: '})' }],
    ],
  },
  {
    name: 'GraphQL',
    key: 'graphql',
    level: 83,
    years: 4,
    blurb: 'Schemas as contracts. Typed end-to-end with codegen; dataloaders or N+1 will find you.',
    snippet: [
      [{ t: 'type ', c: 'kw' }, { t: 'Project', c: 'ty' }, { t: ' {' }],
      [{ t: '  id: ' }, { t: 'ID!', c: 'ty' }],
      [{ t: '  name: ' }, { t: 'String!', c: 'ty' }],
      [{ t: '  collaborators: [' }, { t: 'User!', c: 'ty' }, { t: ']! ' }, { t: '@dataloader', c: 'fn' }],
      [{ t: '}' }],
    ],
  },
  {
    name: 'Testing',
    key: 'test',
    level: 88,
    years: 5,
    blurb: 'Vitest, RTL, and Playwright. Established testing patterns that held zero critical regressions across releases.',
    snippet: [
      [{ t: 'test', c: 'fn' }, { t: '(' }, { t: "'renders the swap flow'", c: 'str' }, { t: ', ' }, { t: 'async', c: 'kw' }, { t: ' () => {' }],
      [{ t: '  render', c: 'fn' }, { t: '(<' }, { t: 'Swap', c: 'ty' }, { t: ' />)' }],
      [{ t: '  await', c: 'kw' }, { t: ' user.', c: 'op' }, { t: 'click', c: 'fn' }, { t: '(screen.', c: 'op' }, { t: 'getByRole', c: 'fn' }, { t: '(' }, { t: "'button'", c: 'str' }, { t: '))' }],
      [{ t: '  expect', c: 'fn' }, { t: '(screen.', c: 'op' }, { t: 'getByText', c: 'fn' }, { t: '(/review/i)).', c: 'op' }, { t: 'toBeVisible', c: 'fn' }, { t: '()' }],
      [{ t: '})' }],
    ],
  },
];

export type Project = {
  index: string;
  name: string;
  kind: string;
  year: string;
  description: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  href: string;
  image: string;
  imageSeed: string;
  accent: string;
  code: string[];
};

export const PROJECTS: Project[] = [
  {
    index: '01',
    name: 'PageFolios',
    kind: 'AI Resume & Portfolio Builder',
    year: '2025',
    description:
      'A full-stack SaaS that turns structured resume data into multiple publishable landing pages. A schema-driven engine renders pages from JSON with instant preview, OpenAI pipelines rewrite and summarize content, and every site ships to its own custom subdomain with server-side PDF export.',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'NextAuth', 'OpenAI'],
    metrics: [
      { label: 'Schema → page', value: 'instant' },
      { label: 'Subdomains', value: '1-click' },
      { label: 'PDF export', value: 'server-side' },
    ],
    href: '#contact',
    image: '/img/pagefolios.svg',
    imageSeed: 'pagefolios',
    accent: '#c6f24e',
    code: [
      'export default async function Page({ params }) {',
      '  const resume = await getResume(params.slug)',
      '  const page = render(resume.schema) // JSON → JSX',
      '  return <Landing page={page} editable />',
      '}',
    ],
  },
  {
    index: '02',
    name: 'Zovix',
    kind: 'Crypto Wallet & Fintech Platform',
    year: '2021',
    description:
      'The frontend architecture for a high-security crypto wallet — swap, deposit, and withdrawal flows over a hardened API layer with token-refresh, 401 handling, and strict validation. A reusable multi-step KYC flow (email + OTP + ID upload) made identity verification feel effortless.',
    tech: ['React', 'TypeScript', 'REST', 'WebSockets', 'Zustand'],
    metrics: [
      { label: 'KYC steps', value: '3' },
      { label: 'Auth', value: 'token-refresh' },
      { label: 'Realtime', value: '~200ms' },
    ],
    href: '#contact',
    image: '/img/zovix.svg',
    imageSeed: 'zovix',
    accent: '#6cb6ff',
    code: [
      'const { mutate: swap } = useSwap()',
      'async function onConfirm(order) {',
      '  await ensureFreshToken()   // 401-safe',
      '  swap(order, { onError: retryWithBackoff })',
      '}',
    ],
  },
  {
    index: '03',
    name: 'Setflow',
    kind: 'Media Annotation SaaS',
    year: '2024',
    description:
      'Core product surfaces for a media SaaS serving 1,000+ customers across Europe and the US. I built an advanced annotation engine for commenting directly on assets — which lifted engagement 40% — plus a design system of 30+ components and the Material UI → Shadcn + Tailwind migration that sped delivery ~45%.',
    tech: ['React', 'TypeScript', 'Shadcn UI', 'Tailwind', 'TanStack Query'],
    metrics: [
      { label: 'Active customers', value: '1,000+' },
      { label: 'Engagement', value: '+40%' },
      { label: 'Faster delivery', value: '+45%' },
    ],
    href: '#contact',
    image: '/img/setflow.svg',
    imageSeed: 'setflow',
    accent: '#e0a3ff',
    code: [
      'asset.on("comment", (c) => {',
      '  pins.add({ x: c.x, y: c.y, thread: c.id })',
      '  broadcast(c) // realtime, optimistic',
      '})',
    ],
  },
];

export type Role = {
  when: string;
  start: string;
  role: string;
  company: string;
  place: string;
  blurb: string;
  mood: string;
  stats: { label: string; value: number; suffix?: string; decimals?: number }[];
  stack: string[];
  log: string[];
};

export const EXPERIENCE: Role[] = [
  {
    when: '2023 — Now',
    start: 'Present',
    role: 'Senior Frontend Engineer',
    company: 'Setflow',
    place: 'Remote · Milan, IT',
    blurb:
      'Architect and ship core product for a SaaS serving 1,000+ customers across Europe and the US. Built the design system (30+ components) and an advanced media annotation engine (+40% engagement), and led the Material UI → Shadcn + Tailwind migration — improving Time-to-Interactive and cutting delivery time ~45%.',
    mood: '#c6f24e',
    stats: [
      { label: 'Active customers', value: 1000, suffix: '+' },
      { label: 'Components', value: 30, suffix: '+' },
      { label: 'Faster delivery', value: 45, suffix: '%' },
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Shadcn UI', 'Tailwind'],
    log: ['[migrate] MUI → Shadcn + Tailwind ✓', 'design-system: 30+ components shipped', 'annotation engagement: +40%'],
  },
  {
    when: '2021 — 2023',
    start: '2021',
    role: 'Frontend Developer',
    company: 'Wesual',
    place: 'Remote · Milan, IT',
    blurb:
      'Cut core transaction-flow latency from 15s to under 5s and improved First Contentful Paint by 40% with code-splitting and dynamic imports. Integrated WebSockets for real-time updates — dropping message delivery from 3s to ~200ms — and standardized React patterns for fast product rollout.',
    mood: '#6cb6ff',
    stats: [
      { label: 'FCP boost', value: 40, suffix: '%' },
      { label: 'Faster flow', value: 3, suffix: '×' },
      { label: 'Msg delivery', value: 200, suffix: 'ms' },
    ],
    stack: ['React', 'TypeScript', 'WebSockets', 'Redux', 'Webpack'],
    log: ['[perf] FCP -40% via code-splitting', 'tx flow: 15s → <5s', 'ws latency: 3s → ~200ms'],
  },
  {
    when: '2020 — 2021',
    start: '2020',
    role: 'Frontend Developer',
    company: 'Exonyx',
    place: 'Tehran, IR',
    blurb:
      'Led the migration of a high-traffic crypto trading platform from Vue to React, improving maintainability and scalability. Re-architected the responsive layout system with Grid/Flexbox — cutting CSS complexity ~40% and fixing mobile usability — in sync with time-sensitive market trading cycles.',
    mood: '#e0a3ff',
    stats: [
      { label: 'CSS complexity', value: 40, suffix: '%↓' },
      { label: 'Migration', value: 100, suffix: '%' },
      { label: 'Trading pairs', value: 120, suffix: '+' },
    ],
    stack: ['React', 'Vue', 'JavaScript', 'CSS Grid', 'REST'],
    log: ['[migrate] Vue → React ✓', 'css complexity: -40%', 'mobile usability: fixed'],
  },
  {
    when: '2019 — 2020',
    start: '2019',
    role: 'Product Operations Manager',
    company: 'Digikala',
    place: 'Tehran, IR',
    blurb:
      'Before pivoting to engineering: the technical liaison between business and engineering on one of the region’s largest e-commerce platforms. Translated commercial requirements into product specs, ran commercial QA on edge cases, and coordinated cross-functional teams on platform-integrity and fraud-detection initiatives.',
    mood: '#ffc34d',
    stats: [
      { label: 'Cross-fn teams', value: 6 },
      { label: 'Edge cases QA’d', value: 300, suffix: '+' },
      { label: 'Pivot to code', value: 2020 },
    ],
    stack: ['Product', 'QA', 'Fraud-detection', 'Stakeholders'],
    log: ['[role] product operations · Digikala', 'validated edge cases at scale', 'pivoted to engineering →'],
  },
];

export const STACK_MARQUEE = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Tailwind CSS',
  'Shadcn UI',
  'TanStack Query',
  'Zustand',
  'GraphQL',
  'WebSockets',
  'Vitest',
  'Playwright',
];
