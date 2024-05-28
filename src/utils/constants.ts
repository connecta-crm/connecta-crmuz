export const DEFAULT_LIMIT = 10; // should be 10 or 50

export const CONDITION_TYPES = [
  {
    label: 'Run and drives',
    value: 'run',
  },
  {
    label: 'Inop, it rolls',
    value: 'rols',
  },
  // {
  //   label: 'Inop, need forklift',
  //   value: 'forklift',
  // },
];

export const TRAILER_TYPES = [
  {
    label: 'Open',
    value: 'open',
  },
  {
    label: 'Enclosed',
    value: 'enclosed',
  },
];

export const LOCATION_TYPES = [
  { value: 'r2r', label: 'Residential to residential' },
  { value: 'r2b', label: 'Residential to business' },
  { value: 'b2r', label: 'Business to residential' },
  { value: 'b2b', label: 'Business to business' },
];
