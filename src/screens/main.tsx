import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { c, Rule, ruleStyle } from '../theme';
import { Destination, destinations, Passport, passports } from '../data';
import { Badge, BackIcon, BellIcon, Btn, Card, CheckIcon, Chip, IconBtn, MapArt, Nav, Pill, PlusIcon, s, TabBar } from '../ui';

const page = { flex: 1, backgroundColor: c.ground } as const;
const body = { flex: 1, paddingHorizontal: 16 } as const;

function DestBadge({ d }: { d: Destination }) {
  const r = ruleStyle[d.rule];
  return <Badge code={d.code} bg={r.bg} fg={r.fg} />;
}

export function Home({ nav, passport }: { nav: Nav; passport: Passport }) {
  const [filter, setFilter] = useState('All');
  const list = destinations.filter((d) => filter === 'All' || (filter === 'Visa-free' && d.rule === 'free'));
  return (
    <View style={page}>
      <ScrollView style={body} contentContainerStyle={{ paddingBottom: 16 }}>
        <View style={[s.row, { justifyContent: 'space-between', marginTop: 8 }]}>
          <Pressable accessibilityRole="button" accessibilityLabel={`Passport: ${passport.name}. Change`} onPress={() => nav.go('Profile')}
            style={[s.row, { gap: 10, backgroundColor: c.white, height: 44, borderRadius: 22, paddingLeft: 6, paddingRight: 14 }]}>
            <Badge code={passport.code} bg={passport.bg} fg={passport.fg} size={32} />
            <Text style={{ fontSize: 15, fontWeight: '700', color: c.ink }}>{passport.name}</Text>
          </Pressable>
          <IconBtn label="Alerts" onPress={() => nav.go('Alerts')}><BellIcon /></IconBtn>
        </View>
        <View style={[s.row, { backgroundColor: c.primary, borderRadius: 24, padding: 20, marginTop: 14, justifyContent: 'space-between' }]}>
          <View><Text style={{ fontSize: 13, fontWeight: '600', color: c.onPrimarySub }}>Passport rank</Text><Text style={{ fontSize: 34, fontWeight: '800', color: c.white }}>#00</Text></View>
          <View style={{ alignItems: 'flex-end' }}><Text style={{ fontSize: 13, fontWeight: '600', color: c.onPrimarySub }}>Open to you</Text><Text style={{ fontSize: 34, fontWeight: '800', color: c.white }}>00</Text></View>
        </View>
        <Card style={{ marginTop: 12, padding: 14, alignItems: 'center' }}>
          <MapArt width={310} />
          <View style={[s.row, { gap: 12, marginTop: 10, flexWrap: 'wrap' }]}>
            {(['free', 'arrival', 'visa'] as Rule[]).map((r) => (
              <View key={r} style={[s.row, { gap: 6 }]}><View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: ruleStyle[r].dot }} /><Text style={{ fontSize: 12, fontWeight: '600', color: c.sub2 }}>{ruleStyle[r].label}</Text></View>
            ))}
          </View>
        </Card>
        <Btn label="Check a multi-country trip" kind="soft" onPress={() => nav.go('TripBuild')} style={{ marginTop: 12, height: 48 }} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }} contentContainerStyle={{ gap: 8 }}>
          {['All', 'Visa-free', '90+ days', 'No fee'].map((f) => <Chip key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />)}
        </ScrollView>
        <Card style={{ marginTop: 12, paddingVertical: 4 }}>
          {list.map((d, i) => (
            <Pressable key={d.code} accessibilityRole="button" onPress={() => nav.go('Country', { code: d.code })} style={[s.row, { height: 68, gap: 12 }, i > 0 && s.divider]}>
              <DestBadge d={d} />
              <View style={{ flex: 1 }}><Text style={s.rowTitle}>{d.name}</Text>{!!d.stay && <Text style={s.rowSub}>{d.stay}</Text>}</View>
              <Pill rule={d.rule} />
            </Pressable>
          ))}
          {list.length === 0 && <Text style={[s.body, { textAlign: 'center', paddingVertical: 24 }]}>No countries match this filter.</Text>}
        </Card>
      </ScrollView>
      <TabBar active="Home" nav={nav} />
    </View>
  );
}

export function Country({ nav, code, passport }: { nav: Nav; code: string; passport: Passport }) {
  const d = destinations.find((x) => x.code === code) ?? destinations[0];
  const r = ruleStyle[d.rule];
  const rows: [string, string][] = [['Passport validity', d.validity], ['Entry fee', d.fee], ['Safety advisory', d.safety], ['Health entry rules', d.health], ['Land borders', d.border]];
  return (
    <View style={page}>
      <ScrollView style={body} contentContainerStyle={{ paddingBottom: 16 }}>
        <View style={[s.row, { justifyContent: 'space-between', marginTop: 8 }]}>
          <IconBtn label="Back" onPress={nav.back}><BackIcon /></IconBtn>
          <IconBtn label="Save and get alerts"><BellIcon color={c.primary} /></IconBtn>
        </View>
        <Card style={{ marginTop: 12, padding: 20 }}>
          <View style={[s.row, { gap: 14 }]}>
            <DestBadge d={d} />
            <View style={{ flex: 1 }}><Text style={{ fontSize: 26, fontWeight: '800', color: c.ink }}>{d.name}</Text><Text style={s.rowSub}>With a {passport.name} passport</Text></View>
          </View>
          <View style={{ backgroundColor: r.bg, borderRadius: 18, padding: 16, marginTop: 16 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: r.fg }}>{r.label}</Text>
            <Text style={{ fontSize: 26, fontWeight: '800', color: r.fg, marginTop: 2 }}>{d.rule === 'unverified' ? 'We have not verified this rule yet' : d.stay}</Text>
          </View>
          {d.rule !== 'unverified' && (
            <View style={[s.row, { gap: 8, marginTop: 12 }]}><CheckIcon color={c.primary} size={18} /><Text style={{ fontSize: 13, fontWeight: '600', color: c.sub2 }}>Last verified {d.verified}</Text></View>
          )}
        </Card>
        {d.rule !== 'unverified' && (
          <Card style={{ marginTop: 12, paddingVertical: 4, paddingHorizontal: 20 }}>
            {rows.map(([k, v], i) => (
              <View key={k} style={[{ paddingVertical: 14 }, i > 0 && s.divider]}><Text style={s.rowSub}>{k}</Text><Text style={s.rowTitle}>{v}</Text></View>
            ))}
          </Card>
        )}
        <Btn label="Alert me if this changes" style={{ marginTop: 16, marginHorizontal: 8 }} />
      </ScrollView>
    </View>
  );
}

export function Compare({ nav, passport }: { nav: Nav; passport: Passport }) {
  const other = passports.find((p) => p.code !== passport.code)!;
  return (
    <View style={page}>
      <ScrollView style={body} contentContainerStyle={{ paddingBottom: 16 }}>
        <Text style={[s.h1, { marginTop: 8, marginBottom: 14 }]}>Compare</Text>
        <View style={[s.row, { gap: 10 }]}>
          {[passport, other].map((p, i) => (
            <View key={p.code} style={{ flex: 1, borderRadius: 24, padding: 16, backgroundColor: i === 0 ? c.primary : c.white }}>
              <View style={[s.row, { gap: 8 }]}><Badge code={p.code} bg={i === 0 ? c.white : p.bg} fg={p.fg} size={32} /><Text style={{ fontSize: 15, fontWeight: '700', color: i === 0 ? c.white : c.ink, flexShrink: 1 }}>{p.name}</Text></View>
              <Text style={{ fontSize: 12, fontWeight: '600', color: i === 0 ? c.onPrimarySub : c.sub, marginTop: 14 }}>Open to you</Text>
              <Text style={{ fontSize: 34, fontWeight: '800', color: i === 0 ? c.white : c.ink }}>00</Text>
              <Text style={{ fontSize: 12, fontWeight: '600', color: i === 0 ? c.onPrimarySub : c.sub }}>Rank #00</Text>
            </View>
          ))}
        </View>
        <Card style={{ marginTop: 12 }}>
          <View style={s.row}><Text style={[s.rowSub, { flex: 1, fontWeight: '700' }]}>Destination</Text><Text style={[s.rowSub, { width: 96, textAlign: 'center', fontWeight: '700' }]}>{passport.code}</Text><Text style={[s.rowSub, { width: 96, textAlign: 'center', fontWeight: '700' }]}>{other.code}</Text></View>
          {destinations.slice(0, 3).map((d, i) => (
            <View key={d.code} style={[s.row, { height: 64, marginTop: i === 0 ? 6 : 0 }, s.divider]}>
              <Text style={[s.rowTitle, { flex: 1 }]}>{d.name}</Text>
              <View style={{ width: 96, alignItems: 'center' }}><Pill rule={d.rule} text={d.rule === 'free' ? '90 days' : undefined} /></View>
              <View style={{ width: 96, alignItems: 'center' }}><Pill rule={i === 0 ? 'visa' : 'free'} /></View>
            </View>
          ))}
        </Card>
      </ScrollView>
      <TabBar active="Compare" nav={nav} />
    </View>
  );
}

export function Alerts({ nav }: { nav: Nav }) {
  const items: [Rule, string, string][] = [
    ['free', 'Sample country A is now visa-free', 'For your passport. Was: visa on arrival.'],
    ['arrival', 'Safety level raised for Sample country B', 'A country you saved moved from level 1 to level 2.'],
    ['unverified', 'Passport expires in 6 months', 'Some countries need 6 months of validity on arrival.'],
  ];
  return (
    <View style={page}>
      <ScrollView style={body} contentContainerStyle={{ paddingBottom: 16 }}>
        <Text style={[s.h1, { marginTop: 8, marginBottom: 14 }]}>Alerts</Text>
        <Card style={{ paddingVertical: 4 }}>
          {items.map(([rule, title, text], i) => (
            <View key={title} style={[s.row, { gap: 12, paddingVertical: 14, alignItems: 'flex-start' }, i > 0 && s.divider]}>
              <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: rule === 'unverified' ? c.lilac : ruleStyle[rule].bg, alignItems: 'center', justifyContent: 'center' }}><BellIcon color={rule === 'unverified' ? c.primary : ruleStyle[rule].fg} /></View>
              <View style={{ flex: 1 }}><Text style={s.rowTitle}>{title}</Text><Text style={{ fontSize: 14, lineHeight: 20, color: c.sub, marginTop: 2 }}>{text}</Text></View>
            </View>
          ))}
        </Card>
        <Text style={[s.h2, { marginTop: 20, marginBottom: 10 }]}>Watching</Text>
        <Card style={{ paddingVertical: 4 }}>
          <View style={[s.row, { height: 64, gap: 12 }]}><DestBadge d={destinations[0]} /><Text style={[s.rowTitle, { flex: 1 }]}>{destinations[0].name}</Text><BellIcon color={c.primary} filled /></View>
          <Pressable accessibilityRole="button" style={[s.row, { height: 64, gap: 12 }, s.divider]}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: c.lilac, alignItems: 'center', justifyContent: 'center' }}><PlusIcon /></View>
            <Text style={[s.rowTitle, { color: c.primaryDark }]}>Watch another country</Text>
          </Pressable>
        </Card>
      </ScrollView>
      <TabBar active="Alerts" nav={nav} />
    </View>
  );
}

export function Profile({ nav, passport }: { nav: Nav; passport: Passport }) {
  const settings = ['Alert settings', 'Restore purchases', 'Where our data comes from', 'Privacy policy and terms', 'Contact support'];
  return (
    <View style={page}>
      <ScrollView style={body} contentContainerStyle={{ paddingBottom: 16 }}>
        <Text style={[s.h1, { marginTop: 8, marginBottom: 14 }]}>Profile</Text>
        <View style={[s.row, { backgroundColor: c.primary, borderRadius: 24, padding: 20, justifyContent: 'space-between' }]}>
          <View><Text style={{ fontSize: 18, fontWeight: '800', color: c.white }}>Passvio Pro</Text><Text style={{ fontSize: 13, color: c.onPrimarySub, marginTop: 2 }}>Free trial, 5 days left</Text></View>
          <Pressable accessibilityRole="button" style={{ height: 44, borderRadius: 14, backgroundColor: c.white, paddingHorizontal: 16, justifyContent: 'center' }}><Text style={{ color: c.primaryDark, fontWeight: '700' }}>Manage</Text></Pressable>
        </View>
        <Text style={[s.h2, { marginTop: 20, marginBottom: 10 }]}>My passports</Text>
        <Card style={{ paddingVertical: 4 }}>
          <View style={[s.row, { height: 68, gap: 12 }]}><Badge code={passport.code} bg={passport.bg} fg={passport.fg} /><View style={{ flex: 1 }}><Text style={s.rowTitle}>{passport.name}</Text><Text style={s.rowSub}>Expiry date not set</Text></View>
            <View style={{ backgroundColor: c.lilac, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 }}><Text style={{ color: c.primaryDark, fontSize: 12, fontWeight: '700' }}>Main</Text></View></View>
          <Pressable accessibilityRole="button" onPress={() => nav.go('PickPassport')} style={[s.row, { height: 64, gap: 12 }, s.divider]}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: c.lilac, alignItems: 'center', justifyContent: 'center' }}><PlusIcon /></View>
            <Text style={[s.rowTitle, { color: c.primaryDark }]}>Add a second passport</Text>
          </Pressable>
        </Card>
        <Text style={[s.h2, { marginTop: 20, marginBottom: 10 }]}>Settings</Text>
        <Card style={{ paddingVertical: 0 }}>
          {settings.map((label, i) => (
            <Pressable key={label} accessibilityRole="button" style={[s.row, { height: 56 }, i > 0 && s.divider]}><Text style={{ flex: 1, fontSize: 16, fontWeight: '600', color: c.ink }}>{label}</Text><Text style={{ color: '#8C88A0', fontSize: 18 }}>›</Text></Pressable>
          ))}
        </Card>
        <Btn label="Preview offline screen" kind="soft" onPress={() => nav.go('Offline')} style={{ marginTop: 16, height: 48 }} />
      </ScrollView>
      <TabBar active="Profile" nav={nav} />
    </View>
  );
}

export function Offline({ nav }: { nav: Nav }) {
  return (
    <View style={[page, { paddingHorizontal: 16, paddingBottom: 16 }]}>
      <View style={[s.row, { gap: 10, backgroundColor: c.warnBg, borderRadius: 16, padding: 12, marginTop: 8 }]}>
        <Text style={{ flex: 1, fontSize: 14, fontWeight: '600', color: c.warn }}>You are offline. Showing the last saved rules.</Text>
      </View>
      <Card style={{ flex: 1, marginTop: 12, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: '800', color: c.ink, textAlign: 'center' }}>Can't check for updates</Text>
        <Text style={[s.body, { textAlign: 'center', marginTop: 12 }]}>Your map still works with the last saved rules. Reconnect to confirm nothing changed before you travel.</Text>
      </Card>
      <Btn label="Try again" onPress={nav.back} style={{ marginTop: 16, marginHorizontal: 8 }} />
      <Btn label="Open saved map" kind="white" onPress={() => nav.go('Home')} style={{ marginTop: 12, marginHorizontal: 8 }} />
    </View>
  );
}

export function TripBuild({ nav, passport }: { nav: Nav; passport: Passport }) {
  const [stops, setStops] = useState(destinations.slice(0, 3));
  return (
    <View style={[page, { paddingHorizontal: 16, paddingBottom: 16 }]}>
      <View style={{ marginTop: 8 }}><IconBtn label="Back" onPress={nav.back}><BackIcon /></IconBtn></View>
      <Text style={[s.h1, { marginTop: 14 }]}>Trip Check</Text>
      <Text style={[s.body, { marginTop: 6, marginBottom: 16 }]}>Add every stop. We check each one against your {passport.name} passport.</Text>
      <ScrollView style={{ flex: 1 }}>
        <Card style={{ paddingVertical: 4 }}>
          {stops.map((d, i) => (
            <View key={d.code} style={[s.row, { height: 72, gap: 12 }, i > 0 && s.divider]}>
              <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: c.white, fontWeight: '700', fontSize: 13 }}>{i + 1}</Text></View>
              <View style={{ flex: 1 }}><Text style={s.rowTitle}>{d.name}</Text><Text style={s.rowSub}>Dates not set</Text></View>
              <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${d.name}`} onPress={() => setStops(stops.filter((x) => x.code !== d.code))} style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#8C88A0', fontSize: 20 }}>×</Text></Pressable>
            </View>
          ))}
          {stops.length === 0 && <Text style={[s.body, { textAlign: 'center', paddingVertical: 24 }]}>No stops yet. Add your first one.</Text>}
          <Pressable accessibilityRole="button" onPress={() => setStops(destinations.slice(0, Math.min(stops.length + 1, 3)))} style={[s.row, { height: 64, gap: 12 }, s.divider]}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: c.lilac, alignItems: 'center', justifyContent: 'center' }}><PlusIcon size={16} /></View>
            <Text style={[s.rowTitle, { color: c.primaryDark }]}>Add a stop</Text>
          </Pressable>
        </Card>
      </ScrollView>
      <Btn label="Check my trip" onPress={() => nav.go('TripResult')} style={{ marginHorizontal: 8 }} />
    </View>
  );
}

export function TripResult({ nav }: { nav: Nav }) {
  const stops = destinations.slice(0, 3);
  const ready = stops.filter((d) => d.rule === 'free').length;
  return (
    <View style={[page, { paddingHorizontal: 16, paddingBottom: 16 }]}>
      <View style={{ marginTop: 8 }}><IconBtn label="Back" onPress={nav.back}><BackIcon /></IconBtn></View>
      <ScrollView style={{ flex: 1, marginTop: 12 }}>
        <View style={{ backgroundColor: c.primary, borderRadius: 24, padding: 20 }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: c.onPrimarySub }}>{stops.length} stops checked</Text>
          <Text style={{ fontSize: 28, fontWeight: '800', color: c.white, marginTop: 2 }}>{ready} ready, {stops.length - ready} need action</Text>
        </View>
        {stops.map((d, i) => (
          <Card key={d.code} style={{ marginTop: 12 }}>
            <View style={[s.row, { gap: 12 }]}>
              <Text style={{ flex: 1, fontSize: 17, fontWeight: '800', color: c.ink }}>{i + 1}. {d.name}</Text>
              <Pill rule={d.rule === 'free' ? 'free' : 'arrival'} text={d.rule === 'free' ? 'Ready' : 'Action needed'} />
            </View>
            <Text style={{ fontSize: 14, color: c.sub2, marginTop: 10 }}>{ruleStyle[d.rule].label}{d.stay ? `, ${d.stay.toLowerCase()}` : ''}</Text>
            {!!d.validity && <Text style={{ fontSize: 14, color: c.sub2, marginTop: 6 }}>Passport validity: {d.validity}</Text>}
            {!!d.verified && <Text style={{ fontSize: 12, fontWeight: '600', color: c.sub, marginTop: 6 }}>Last verified {d.verified}</Text>}
          </Card>
        ))}
      </ScrollView>
      <Btn label="Watch this trip for changes" style={{ marginTop: 12, marginHorizontal: 8 }} />
    </View>
  );
}
