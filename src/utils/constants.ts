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

// * ORDER'S DISPATCH VARIABLES

export const DISPATCH_PAID_BY = [
  { value: 'carrier', label: 'COD to Carrier' },
  { value: 'delivery', label: 'COD to Delivery Terminal' },
  { value: 'pickup', label: 'COD to Pickup Terminal' },
  { value: 'onpickup', label: 'COP to Carrier (On Pickup)' },
  { value: 'invoice', label: 'Shipper Invoice' },
  { value: 'prepayment', label: 'Additional Shipper Pre-payment' },
];

export const DISPATCH_PAYMENT_TERM = [
  { value: 'immediately', label: 'Immediately' },
  { value: '2days', label: '2 business days' },
  { value: '5days', label: '5 business days' },
  { value: '10days', label: '10 business days' },
  { value: '15days', label: '15 business days' },
  { value: '30days', label: '30 business days' },
];

export const DISPATCH_TERM_BEGINS = [
  { value: 'pickup', label: 'Pickup' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'signed', label: 'Receiving a signed Bill of Lading' },
];

export const DISPATCH_CODE_METHOD = [
  { value: 'cash', label: 'Cash/Certified Funds' },
  { value: 'check', label: 'Check' },
];

export const DISPATCH_PAYMENT_TYPE = [
  { value: 'cash', label: 'Cash' },
  { value: 'fund', label: 'Certified fund' },
  { value: 'check', label: 'Company check' },
  { value: 'ach', label: 'ACH' },
  { value: 'zelle', label: 'Zelle' },
  { value: 'venmo', label: 'Venmo' },
  { value: 'cashapp', label: 'CashApp' },
];

export const QUOTE_ARCHIVE_REASONS = [
  {
    label: 'Already shipped',
    value: 'already_shipped',
  },
  {
    label: 'Change of mind',
    value: 'change_mind',
  },
  {
    label: 'Another company',
    value: 'another_company',
  },
  {
    label: 'Shipping is canceled',
    value: 'shipping_cancelled',
  },
  {
    label: 'Other',
    value: 'other',
  },
];
export const ORDER_ARCHIVE_REASONS = [
  {
    label: 'No driver',
    value: 'no_driver',
  },
  {
    label: 'Customer canceled',
    value: 'customer_cancelled',
  },
  {
    label: "Couldn't complete",
    value: 'couldnot_complete',
  },
  {
    label: 'Delayed',
    value: 'delayed',
  },
  {
    label: 'Customer disappeared ',
    value: 'customer_disappeared',
  },
  {
    label: 'Other',
    value: 'other',
  },
];
