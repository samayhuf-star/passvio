export const c = {
  primary: '#5B3DF5', primaryDark: '#3F27C4', lilac: '#EEEAFE', ground: '#F4F2FB',
  ink: '#17132B', sub: '#5F5B6B', sub2: '#4A4560', line: '#EEEAFE', white: '#FFFFFF',
  okBg: '#DDF3E8', ok: '#0B5C40', okDot: '#0E8A5F',
  warnBg: '#FFF1C9', warn: '#6E4A00', warnDot: '#E0A23A',
  badBg: '#FBE0E6', bad: '#8A1830', badDot: '#C2334D', onPrimarySub: '#E3DDFF',
};
export type Rule = 'free' | 'arrival' | 'visa' | 'unverified';
export const ruleStyle: Record<Rule, { bg: string; fg: string; dot: string; label: string }> = {
  free: { bg: c.okBg, fg: c.ok, dot: c.okDot, label: 'Visa-free' },
  arrival: { bg: c.warnBg, fg: c.warn, dot: c.warnDot, label: 'On arrival or eVisa' },
  visa: { bg: c.badBg, fg: c.bad, dot: c.badDot, label: 'Visa first' },
  unverified: { bg: c.ground, fg: c.sub, dot: '#C9C4DC', label: 'Not yet verified' },
};
