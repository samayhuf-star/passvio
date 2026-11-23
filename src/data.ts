import type { Rule } from './theme';
// Dummy data for the UI skeleton. Real values come from the data service later.
export type Passport = { code: string; name: string; bg: string; fg: string };
export const passports: Passport[] = [
  { code: 'IN', name: 'India', bg: '#FDE7D8', fg: '#8A3B00' },
  { code: 'MX', name: 'Mexico', bg: '#DDF3E8', fg: '#0B5C40' },
  { code: 'US', name: 'United States', bg: '#DCE8FD', fg: '#173F8A' },
  { code: 'GB', name: 'United Kingdom', bg: '#FBE0E6', fg: '#8A1830' },
  { code: 'AE', name: 'United Arab Emirates', bg: '#EEEAFE', fg: '#3F27C4' },
  { code: 'DE', name: 'Germany', bg: '#FFF1C9', fg: '#6E4A00' },
];
export type Destination = {
  code: string; name: string; rule: Rule; stay: string; fee: string; validity: string;
  safety: string; health: string; border: string; verified: string;
};
export const destinations: Destination[] = [
  { code: 'FI', name: 'Finland', rule: 'free', stay: 'Up to 90 days', fee: 'Free (visa exemption)',
    validity: '3 months beyond your stay', safety: 'Level 1: exercise normal precautions',
    health: 'None required', border: 'Crossings with Russia closed', verified: '14 Aug 2026' },
  { code: 'AA', name: 'Sample country A', rule: 'arrival', stay: 'Sample: 30 days', fee: 'Sample fee',
    validity: 'Sample: 6 months on arrival', safety: 'Sample level', health: 'Sample', border: 'Sample', verified: 'Sample date' },
  { code: 'BB', name: 'Sample country B', rule: 'visa', stay: 'Sample', fee: 'Sample fee',
    validity: 'Sample', safety: 'Sample level', health: 'Sample', border: 'Sample', verified: 'Sample date' },
  { code: 'CC', name: 'Sample country C', rule: 'unverified', stay: '', fee: '', validity: '', safety: '', health: '', border: '', verified: '' },
];
export const plans = [
  { id: 'annual', name: 'Annual', price: '$29.99', note: '7 days free, then $29.99 per year', best: true },
  { id: 'monthly', name: 'Monthly', price: '$5.99', note: '7 days free, then $5.99 per month' },
  { id: 'weekly', name: 'Weekly', price: '$2.99', note: '7 days free, then $2.99 per week' },
  { id: 'lifetime', name: 'Lifetime', price: '$39.99', note: 'One payment, no renewal' },
];
