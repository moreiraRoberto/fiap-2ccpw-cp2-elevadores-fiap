// app/_layout.jsx
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

function RootLayoutNav() {
  const { signed, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)' || segments[segments.length -1] === 'login' || segments[segments.length -1] === 'register';

    if (!signed && !inAuthGroup) {
      // Redireciona para login se não estiver logado e tentar acessar área restrita
      router.replace('/login');
    } else if (signed && inAuthGroup) {
      // Redireciona para home se já estiver logado e tentar acessar login/cadastro
      router.replace('/');
    }
  }, [signed, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ED145B" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#ED145B' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}