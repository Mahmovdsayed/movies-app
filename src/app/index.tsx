import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { authClient } from '@/lib/auth-client';
import SplashScreenUI from '@/components/layout/SplashScreen';

export default function Index() {
  const { data: session, isPending } = authClient.useSession();
  const [minSplashDone, setMinSplashDone] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => { });

    const timer = setTimeout(() => {
      setMinSplashDone(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isPending || !minSplashDone) {
    return <SplashScreenUI />;
  }

  if (session) {
    if (!session.user?.emailVerified) {
      return (
        <Redirect
          href={{
            pathname: '/(auth)/verify-otp',
            params: { email: session.user.email, type: 'email-verification' },
          }}
        />
      );
    }
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)" />;
}
