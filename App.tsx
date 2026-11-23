import React, { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { c } from './src/theme';
import { passports } from './src/data';
import type { Nav } from './src/ui';
import { Notify, Paywall, PickPassport, Reveal, Welcome, WhatYouGet } from './src/screens/onboarding';
import { Alerts, Compare, Country, Home, Offline, Profile, TripBuild, TripResult } from './src/screens/main';

type Route = { screen: string; params?: any };
const tabs = ['Home', 'Compare', 'Alerts', 'Profile'];
const bg: Record<string, string> = { Welcome: c.lilac, Reveal: c.primary, PickPassport: c.white, Paywall: c.white, Notify: c.white };

// Simple stack for the UI skeleton. Tabs replace the stack; other screens push onto it.
export default function App() {
  const [stack, setStack] = useState<Route[]>([{ screen: 'Welcome' }]);
  const [passportCode, setPassportCode] = useState('MX');
  const passport = passports.find((p) => p.code === passportCode) ?? passports[0];
  const route = stack[stack.length - 1];

  const nav: Nav = useMemo(() => ({
    go: (screen, params) => setStack((prev) => (tabs.includes(screen) ? [{ screen }] : [...prev, { screen, params }])),
    back: () => setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev)),
  }), []);

  let view: React.ReactNode;
  switch (route.screen) {
    case 'PickPassport': view = <PickPassport nav={nav} passport={passportCode} setPassport={setPassportCode} />; break;
    case 'Reveal': view = <Reveal nav={nav} passportName={passport.name} />; break;
    case 'WhatYouGet': view = <WhatYouGet nav={nav} />; break;
    case 'Paywall': view = <Paywall nav={nav} />; break;
    case 'Notify': view = <Notify nav={nav} />; break;
    case 'Home': view = <Home nav={nav} passport={passport} />; break;
    case 'Country': view = <Country nav={nav} code={route.params?.code} passport={passport} />; break;
    case 'Compare': view = <Compare nav={nav} passport={passport} />; break;
    case 'Alerts': view = <Alerts nav={nav} />; break;
    case 'Profile': view = <Profile nav={nav} passport={passport} />; break;
    case 'Offline': view = <Offline nav={nav} />; break;
    case 'TripBuild': view = <TripBuild nav={nav} passport={passport} />; break;
    case 'TripResult': view = <TripResult nav={nav} />; break;
    default: view = <Welcome nav={nav} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: bg[route.screen] ?? c.ground }}>
        <StatusBar style={route.screen === 'Reveal' ? 'light' : 'dark'} />
        {view}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
