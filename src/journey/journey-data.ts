// ============================================================================
//  MY JOURNEY — editable story data
//  ----------------------------------------------------------------------------
//  This is the ONLY file you need to edit to change the story.
//  • Stations render left → right in the order of this array.
//  • worldX (the position along the path) is computed automatically as
//      order * CONFIG.segment   — so you normally don't touch positions.
//  • Swap any `building`, `date`, `age`, `subtitle` text freely.
//  • `mood` drives the weather: 0 = bright & sunny, 1 = dark & rainy.
//    The sky blends smoothly between each station's mood as you scroll.
//  • `character` controls how old the figure looks at that point.
//
//  ⚠️  PLACEHOLDERS: school/kindergarten names and the birth year are guesses —
//      search for "EDIT" and replace with your real details.
// ============================================================================

export const CONFIG = {
  // Birth year — used only in the comments below to sanity-check ages. EDIT.
  birthYear: 1996,
  // Horizontal distance (in scene units) between two stations. Bigger = longer walk.
  segment: 1700,
  // Where the character stands on screen (scene units, viewBox is 1280 wide).
  characterScreenX: 430,
};

// How old the character looks. Order matters (newborn → adult).
export type CharacterStage =
  | 'newborn' // tiny baby in a stroller, pushed by mother
  | 'toddler' // first wobbly steps
  | 'child' // small kid with a backpack
  | 'teen' // taller, headphones
  | 'student' // young adult with a satchel
  | 'adult'; // grown, hoodie + coffee (today)

export type StationType =
  | 'hospital'
  | 'kindergarten'
  | 'school'
  | 'university'
  | 'workplace'
  | 'today';

export interface Station {
  /** stable id (used for React keys) */
  id: string;
  /** which illustration to draw for the building */
  type: StationType;
  /** big label shown on the building */
  building: string;
  /** optional second line on the building / sign (role, level, etc.) */
  subtitle?: string;
  /** date text shown on the roadside sign (تابلو) */
  date: string;
  /** age text shown under the date */
  age: string;
  /** how old the character looks here */
  character: CharacterStage;
  /** weather: 0 = bright sunny, 1 = dark & rainy. Sky blends between stations. */
  mood: number;
  /** soft accent colour for this building (hex) */
  color: string;
  /** free-form notes for you — not rendered */
  note?: string;
}

// ────────────────────────────────────────────────────────────────────────────
//  THE STATIONS  (chronological — birth on the left, today on the right)
// ────────────────────────────────────────────────────────────────────────────
export const STATIONS: Station[] = [
  {
    id: 'birth',
    type: 'hospital',
    building: 'Aban Hospital', // EDIT: real hospital name
    subtitle: 'Hello, world',
    date: '1994', // EDIT: birth year
    age: 'Day one',
    character: 'newborn',
    mood: 0,
    color: '#f3a9a2',
    note: 'Opening frame: mother (مادر) pushing the baby stroller (کالسکه).',
  },
  {
    id: 'kindergarten',
    type: 'kindergarten',
    building: 'Sadaf Kindergarten', // EDIT: real kindergarten name
    subtitle: 'Kindergarten',
    date: '1999',
    age: 'Age 5',
    character: 'toddler',
    mood: 0,
    color: '#f6c66a',
    note: 'A little kid plays in the yard.',
  },
  {
    id: 'elementary',
    type: 'school',
    building: 'Shahid Alipour', // EDIT: real elementary school
    subtitle: 'Elementary school',
    date: '2001',
    age: 'Age 7',
    character: 'child',
    mood: 0,
    color: '#8ec9a6',
  },
 
  {
    id: 'middle',
    type: 'school',
    building: 'Yaser', // EDIT: real middle school
    subtitle: 'Middle school',
    date: '2006',
    age: 'Age 12',
    character: 'child',
    mood: 0.06,
    color: '#7fb4d8',
  },
  {
    id: 'high',
    type: 'school',
    building: 'Madani High School', // EDIT: real high school
    subtitle: 'High school',
    date: '2009',
    age: 'Age 15',
    character: 'teen',
    mood: 0.12,
    color: '#a99ce0',
  },
  {
    id: 'university',
    type: 'university',
    building: 'Islamic Azad University', // from your CV — Central Tehran Branch
    subtitle: 'B.Sc. Computer Engineering',
    date: '2012',
    age: 'Age 18',
    character: 'student',
    mood: 0.18,
    color: '#c2a8e6',
  },

  // ── WORK HISTORY (from your résumé, earliest → latest) ────────────────────
  {
    id: 'digikala',
    type: 'workplace',
    building: 'Digikala',
    subtitle: 'Product Operations Manager',
    date: '2019',
    age: 'Age 25',
    character: 'adult',
    mood: 0.42, // clouds begin to gather — the working years
    color: '#e57a6b',
    note: 'First job. Pivoted to engineering after this role.',
  },

   {
    id: 'ali-alaei',
    type: 'workplace',
    building: 'Meet Ali Alaei', // EDIT: real elementary school
    subtitle: 'Meet the mentor',
    date: '2023',
    age: 'Age 26',
    character: 'adult',
    mood: 1,
    color: '#8ec9a6',
  },
  {
    id: 'exonyx',
    type: 'workplace',
    building: 'Exonyx',
    subtitle: 'Frontend Developer',
    date: '2020',
    age: 'Age 24',
    character: 'adult',
    mood: 0.68, // overcast
    color: '#6f93b0',
  },
  {
    id: 'wesual',
    type: 'workplace',
    building: 'Wesual',
    subtitle: 'Frontend Developer · Remote, Milan',
    date: '2021',
    age: 'Age 25',
    character: 'adult',
    mood: 0.96, // the heaviest rain — the hardest stretch
    color: '#5d7488',
  },
  {
    id: 'setflow',
    type: 'workplace',
    building: 'Setflow',
    subtitle: 'Senior Frontend Engineer · Remote, Milan',
    date: '2023',
    age: 'Age 27',
    character: 'adult',
    mood: 0.4, // skies begin to clear
    color: '#7fb27d',
  },

  // ── TODAY ─────────────────────────────────────────────────────────────────
  {
    id: 'today',
    type: 'today',
    building: 'Today',
    subtitle: 'Today · still building',
    date: '2026',
    age: 'Age 30',
    character: 'adult',
    mood: 0, // the sun comes back out
    color: '#f6b958',
    note: 'Final frame: bright and warm again. Things got better.',
  },
];

// Convenience: the camera/world position of a station (auto-derived from order).
export const worldXOf = (index: number) => index * CONFIG.segment;
export const MAX_X = worldXOf(STATIONS.length - 1);
