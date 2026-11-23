import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { c, Rule, ruleStyle } from './theme';

export type Nav = { go: (screen: string, params?: any) => void; back: () => void };

export function Btn({ label, onPress, kind = 'primary', style }: {
  label: string; onPress?: () => void; kind?: 'primary' | 'white' | 'soft'; style?: ViewStyle;
}) {
  const bg = kind === 'primary' ? c.primary : kind === 'white' ? c.white : c.lilac;
  const fg = kind === 'primary' ? c.white : kind === 'white' ? c.ink : c.primaryDark;
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={[s.btn, { backgroundColor: bg }, style]}>
      <Text style={[s.btnText, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[s.card, style]}>{children}</View>;
}

export function Badge({ code, bg, fg, size = 44 }: { code: string; bg: string; fg: string; size?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: fg, fontWeight: '700', fontSize: size > 40 ? 13 : 11 }}>{code}</Text>
    </View>
  );
}

export function Pill({ rule, text }: { rule: Rule; text?: string }) {
  const r = ruleStyle[rule];
  return (
    <View style={{ backgroundColor: r.bg, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 }}>
      <Text style={{ color: r.fg, fontSize: 12, fontWeight: '700' }}>{text ?? r.label}</Text>
    </View>
  );
}

export function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ selected: !!active }} onPress={onPress}
      style={{ height: 44, borderRadius: 22, paddingHorizontal: 16, justifyContent: 'center', backgroundColor: active ? c.ink : c.white }}>
      <Text style={{ color: active ? c.white : c.ink, fontWeight: '600', fontSize: 14 }}>{label}</Text>
    </Pressable>
  );
}

export function IconBtn({ label, onPress, children }: { label: string; onPress?: () => void; children: React.ReactNode }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={s.iconBtn}>
      {children}
    </Pressable>
  );
}

export function BackIcon({ color = c.ink }: { color?: string }) {
  return <Svg width={22} height={22} viewBox="0 0 24 24"><Path d="M15 5l-7 7 7 7" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
}
export function BellIcon({ color = c.ink, filled }: { color?: string; filled?: boolean }) {
  return <Svg width={22} height={22} viewBox="0 0 24 24"><Path d="M6 17V11a6 6 0 0112 0v6l2 2H4l2-2zM10 21h4" fill={filled ? color : 'none'} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
}
export function CheckIcon({ color = c.ok, size = 22 }: { color?: string; size?: number }) {
  return <Svg width={size} height={size} viewBox="0 0 24 24"><Path d="M5 12l5 5 9-11" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
}
export function PlusIcon({ color = c.primary, size = 20 }: { color?: string; size?: number }) {
  return <Svg width={size} height={size} viewBox="0 0 24 24"><Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2.5} strokeLinecap="round" /></Svg>;
}
export function GlobeIcon({ color = c.primary, size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={9} fill="none" stroke={color} strokeWidth={2} />
      <Path d="M3 12h18M12 3c4 4 4 14 0 18M12 3c-4 4-4 14 0 18" fill="none" stroke={color} strokeWidth={2} />
    </Svg>
  );
}

// Placeholder map: abstract continents coloured by rule. Replaced by a real map later.
export function MapArt({ width = 320, dark }: { width?: number; dark?: boolean }) {
  const ok = dark ? '#7DE3BC' : c.okDot, warn = dark ? '#FFD27A' : c.warnDot, bad = dark ? '#FF9DB0' : c.badDot;
  return (
    <Svg width={width} height={(width * 190) / 320} viewBox="0 0 320 190" accessibilityLabel="World map coloured by entry rule">
      <Rect width={320} height={190} rx={16} fill={dark ? '#4A2FE0' : c.lilac} />
      <Path d="M28 42q24-22 58-14 18 6 12 26-10 18-30 22-8 22-22 12-22-18-18-46z" fill={ok} />
      <Path d="M78 104q20-6 28 14 6 30-10 54-14 8-18-12-8-32 0-56z" fill={ok} />
      <Path d="M142 28q22-14 44-4 8 14-8 22-20 8-34 0-8-10-2-18z" fill={ok} />
      <Path d="M146 72q26-10 44 6 10 30-6 58-16 18-28-4-18-34-10-60z" fill={warn} />
      <Path d="M196 24q44-18 86 4 14 22-10 38-34 14-62 2-22-18-14-44z" fill={bad} />
      <Path d="M214 80q16-6 24 8 2 16-12 18-14-6-12-26z" fill={warn} />
      <Path d="M252 130q24-10 40 6 4 20-18 24-22-2-22-30z" fill={ok} />
    </Svg>
  );
}

export function TabBar({ active, nav }: { active: string; nav: Nav }) {
  const tabs = [['Home', 'Map'], ['Compare', 'Compare'], ['Alerts', 'Alerts'], ['Profile', 'Profile']];
  return (
    <View style={s.tabBar}>
      {tabs.map(([screen, label]) => (
        <Pressable key={screen} accessibilityRole="tab" accessibilityState={{ selected: active === screen }}
          onPress={() => nav.go(screen)} style={s.tab}>
          <Text style={{ fontSize: 12, fontWeight: active === screen ? '700' : '600', color: active === screen ? c.primary : c.sub }}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export const s = StyleSheet.create({
  btn: { height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontSize: 17, fontWeight: '600' },
  card: { backgroundColor: c.white, borderRadius: 24, padding: 16 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: c.white, alignItems: 'center', justifyContent: 'center' },
  tabBar: { flexDirection: 'row', backgroundColor: c.white, borderTopWidth: 1, borderTopColor: c.line, paddingTop: 6 },
  tab: { flex: 1, height: 50, alignItems: 'center', justifyContent: 'center' },
  h1: { fontSize: 28, fontWeight: '800', color: c.ink, letterSpacing: -0.5 },
  h2: { fontSize: 18, fontWeight: '800', color: c.ink },
  body: { fontSize: 15, lineHeight: 22, color: c.sub },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowTitle: { fontSize: 16, fontWeight: '700', color: c.ink },
  rowSub: { fontSize: 13, color: c.sub },
  divider: { borderTopWidth: 1, borderTopColor: c.line },
});
