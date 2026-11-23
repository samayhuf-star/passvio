import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { c } from '../theme';
import { passports, plans } from '../data';
import { Badge, BackIcon, BellIcon, Btn, Card, CheckIcon, GlobeIcon, MapArt, Nav, s } from '../ui';

const pad = { paddingHorizontal: 24 };

export function Welcome({ nav }: { nav: Nav }) {
  return (
    <View style={{ flex: 1, backgroundColor: c.lilac, ...pad, paddingBottom: 16 }}>
      <View style={[s.row, { gap: 10, marginTop: 16 }]}>
        <View style={{ width: 32, height: 32, borderRadius: 9, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center' }}>
          <GlobeIcon color={c.white} size={20} />
        </View>
        <Text style={{ fontSize: 20, fontWeight: '800', color: c.ink }}>Passvio</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 170, height: 240, borderRadius: 18, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-6deg' }] }}>
          <GlobeIcon color={c.white} size={96} />
        </View>
      </View>
      <Text style={{ fontSize: 32, lineHeight: 37, fontWeight: '800', color: c.ink, textAlign: 'center', letterSpacing: -0.6 }}>See where your passport can take you</Text>
      <Text style={[s.body, { textAlign: 'center', fontSize: 16, marginTop: 12, color: c.sub2 }]}>Every country, with the date its entry rule was last verified.</Text>
      <Btn label="Get started" onPress={() => nav.go('PickPassport')} style={{ marginTop: 28 }} />
      <Btn label="Restore purchase" kind="white" style={{ marginTop: 12 }} />
    </View>
  );
}

function Dots({ step, light }: { step: number; light?: boolean }) {
  return (
    <View style={[s.row, { gap: 6, justifyContent: 'center', height: 44 }]} accessibilityLabel={`Step ${step} of 3`}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={{ width: i === step ? 22 : 6, height: 6, borderRadius: 3,
          backgroundColor: i === step ? (light ? c.white : c.primary) : (light ? '#A99BFA' : '#D9D3F7') }} />
      ))}
    </View>
  );
}

export function PickPassport({ nav, passport, setPassport }: { nav: Nav; passport: string; setPassport: (code: string) => void }) {
  const [q, setQ] = useState('');
  const list = passports.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <View style={{ flex: 1, backgroundColor: c.white, ...pad, paddingBottom: 16 }}>
      <View style={[s.row, { justifyContent: 'space-between' }]}>
        <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={nav.back} style={{ width: 44, height: 44, justifyContent: 'center' }}><BackIcon color={c.primary} /></Pressable>
        <Dots step={1} />
        <View style={{ width: 44 }} />
      </View>
      <Text style={[s.h1, { fontSize: 30, marginTop: 20 }]}>Which passport do you hold?</Text>
      <Text style={[s.body, { marginTop: 8, marginBottom: 20 }]}>You can add a second passport later.</Text>
      <TextInput accessibilityLabel="Search countries" placeholder="Search countries" placeholderTextColor={c.sub} value={q} onChangeText={setQ}
        style={{ height: 52, borderRadius: 16, backgroundColor: c.ground, paddingHorizontal: 16, fontSize: 16, color: c.ink }} />
      <ScrollView style={{ flex: 1, marginTop: 12 }}>
        {list.map((p) => (
          <Pressable key={p.code} accessibilityRole="radio" accessibilityState={{ selected: passport === p.code }} onPress={() => setPassport(p.code)} style={[s.row, { height: 68, gap: 14 }]}>
            <Badge code={p.code} bg={p.bg} fg={p.fg} />
            <Text style={{ flex: 1, fontSize: 17, fontWeight: '600', color: c.ink }}>{p.name}</Text>
            {passport === p.code
              ? <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center' }}><CheckIcon color={c.white} size={14} /></View>
              : <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#C9C4DC' }} />}
          </Pressable>
        ))}
        {list.length === 0 && <Text style={[s.body, { textAlign: 'center', marginTop: 24 }]}>No country matches that search.</Text>}
      </ScrollView>
      <Btn label="Show my map" onPress={() => nav.go('Reveal')} />
    </View>
  );
}

export function Reveal({ nav, passportName }: { nav: Nav; passportName: string }) {
  const stats: [string, string][] = [['Visa-free', c.okDot], ['On arrival', '#B86E00'], ['Visa first', c.badDot]];
  return (
    <View style={{ flex: 1, backgroundColor: c.primary, ...pad, paddingBottom: 16 }}>
      <Dots step={2} light />
      <Text style={{ fontSize: 15, fontWeight: '600', color: c.onPrimarySub, textAlign: 'center', marginTop: 16 }}>Your {passportName} passport opens</Text>
      <Text style={{ fontSize: 84, fontWeight: '800', color: c.white, textAlign: 'center', letterSpacing: -3 }}>00</Text>
      <Text style={{ fontSize: 20, fontWeight: '700', color: c.white, textAlign: 'center' }}>countries without a visa in advance</Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><MapArt dark /></View>
      <View style={[s.row, { gap: 8 }]}>
        {stats.map(([label, dot]) => (
          <View key={label} style={{ flex: 1, backgroundColor: c.white, borderRadius: 18, padding: 12 }}>
            <View style={[s.row, { gap: 6 }]}><View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: dot }} /><Text style={{ fontSize: 12, fontWeight: '600', color: c.sub2 }}>{label}</Text></View>
            <Text style={{ fontSize: 24, fontWeight: '800', color: c.ink, marginTop: 6 }}>00</Text>
          </View>
        ))}
      </View>
      <Btn label="Continue" kind="white" onPress={() => nav.go('WhatYouGet')} style={{ marginTop: 20 }} />
    </View>
  );
}

const features: [string, string][] = [
  ['Your visa-free map', 'Every country, coloured by rule'],
  ['Last verified date', 'Shown on every rule'],
  ['Rule-change alerts', 'For your passport and saved trips'],
  ['Compare passports', 'Two side by side'],
  ['Trip Check', 'One readiness list for every stop'],
  ['Passport expiry reminder', 'Before the validity rule bites'],
];

export function WhatYouGet({ nav }: { nav: Nav }) {
  return (
    <View style={{ flex: 1, backgroundColor: c.ground, paddingHorizontal: 16, paddingBottom: 16 }}>
      <Dots step={3} />
      <View style={{ backgroundColor: c.primary, borderRadius: 24, padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: '800', color: c.white }}>Passvio Pro</Text>
        <Text style={{ fontSize: 14, lineHeight: 20, color: c.onPrimarySub, marginTop: 6 }}>Know the rule before you book, and hear about it when it changes.</Text>
      </View>
      <Card style={{ flex: 1, marginTop: 12, padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: '800', color: c.ink, marginBottom: 6 }}>What you get</Text>
        <ScrollView>
          {features.map(([small, big]) => (
            <View key={small} style={[s.row, { gap: 14, marginTop: 14 }]}>
              <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: c.lilac, alignItems: 'center', justifyContent: 'center' }}><CheckIcon color={c.primary} /></View>
              <View style={{ flex: 1 }}><Text style={s.rowSub}>{small}</Text><Text style={s.rowTitle}>{big}</Text></View>
            </View>
          ))}
        </ScrollView>
      </Card>
      <Btn label="Continue" onPress={() => nav.go('Paywall')} style={{ marginTop: 16, marginHorizontal: 8 }} />
    </View>
  );
}

// Layout stand-in only. The shipped paywall is RevenueCat's own paywall (checkpoint 4).
export function Paywall({ nav }: { nav: Nav }) {
  const [plan, setPlan] = useState('annual');
  return (
    <View style={{ flex: 1, backgroundColor: c.white, paddingHorizontal: 20, paddingBottom: 12 }}>
      <View style={[s.row, { justifyContent: 'space-between', height: 44 }]}>
        <Pressable accessibilityRole="button" onPress={() => nav.go('Notify')} style={{ height: 44, justifyContent: 'center' }}><Text style={{ color: c.primary, fontWeight: '600', fontSize: 16 }}>Close</Text></Pressable>
        <Pressable accessibilityRole="button" style={{ height: 44, justifyContent: 'center' }}><Text style={{ color: c.primary, fontWeight: '600', fontSize: 16 }}>Restore</Text></Pressable>
      </View>
      <Text style={[s.h1, { marginTop: 8 }]}>Try Passvio Pro free for 7 days</Text>
      <Text style={[s.body, { marginTop: 6, marginBottom: 16 }]}>Full map, alerts, compare and Trip Check. Cancel any time before the trial ends.</Text>
      <ScrollView style={{ flex: 1 }}>
        {plans.map((p) => (
          <Pressable key={p.id} accessibilityRole="radio" accessibilityState={{ selected: plan === p.id }} onPress={() => setPlan(p.id)}
            style={[s.row, { minHeight: 68, borderRadius: 18, borderWidth: 2, paddingHorizontal: 16, marginBottom: 10, gap: 12,
              borderColor: plan === p.id ? c.primary : '#E4E0F3', backgroundColor: plan === p.id ? c.ground : c.white }]}>
            <View style={{ flex: 1 }}>
              <View style={[s.row, { gap: 8 }]}>
                <Text style={{ fontSize: 17, fontWeight: '700', color: c.ink }}>{p.name}</Text>
                {p.best && <View style={{ backgroundColor: c.primary, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}><Text style={{ color: c.white, fontSize: 11, fontWeight: '700' }}>Best value</Text></View>}
              </View>
              <Text style={[s.rowSub, { marginTop: 2 }]}>{p.note}</Text>
            </View>
            <Text style={{ fontSize: 17, fontWeight: '800', color: c.ink }}>{p.price}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <View style={[s.row, { gap: 10, backgroundColor: c.ground, borderRadius: 14, padding: 12 }]}>
        <BellIcon color={c.primary} />
        <Text style={{ flex: 1, fontSize: 13, color: c.sub2 }}>We remind you 2 days before your trial ends.</Text>
      </View>
      <Btn label={plan === 'lifetime' ? 'Buy lifetime access' : 'Start 7-day free trial'} onPress={() => nav.go('Notify')} style={{ marginTop: 12 }} />
      <Text style={{ fontSize: 12, lineHeight: 17, color: c.sub, textAlign: 'center', marginTop: 10 }}>Subscriptions renew automatically until cancelled in your App Store settings. Terms and Privacy</Text>
    </View>
  );
}

export function Notify({ nav }: { nav: Nav }) {
  return (
    <View style={{ flex: 1, backgroundColor: c.white, ...pad, paddingBottom: 16 }}>
      <View style={{ alignItems: 'flex-end' }}>
        <Pressable accessibilityRole="button" onPress={() => nav.go('Home')} style={{ height: 44, justifyContent: 'center' }}><Text style={{ color: c.primary, fontWeight: '600', fontSize: 16 }}>Not now</Text></Pressable>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 220, height: 220, borderRadius: 110, backgroundColor: c.lilac, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ transform: [{ scale: 4 }] }}><BellIcon color={c.primary} filled /></View>
        </View>
      </View>
      <Text style={[s.h1, { fontSize: 30, textAlign: 'center' }]}>Hear it when a rule changes</Text>
      <Text style={[s.body, { fontSize: 16, textAlign: 'center', marginTop: 12 }]}>We alert you only when an entry rule changes for your passport or a saved country, and before your passport runs short on validity.</Text>
      <Btn label="Turn on alerts" onPress={() => nav.go('Home')} style={{ marginTop: 28 }} />
    </View>
  );
}
