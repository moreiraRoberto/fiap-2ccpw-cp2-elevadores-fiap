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

    // Como login e register estão na raiz, verificamos se o segmento atual é um deles
    const isAuthPage = segments.includes('login') || segments.includes('register');

    if (!signed && !isAuthPage) {
      // Se não está logado e NÃO está na página de login/registro, força ir para login
      router.replace('/login');
    } else if (signed && isAuthPage) {
      // Se já está logado e tenta entrar no login/registro, manda para a home
      router.replace('/');
    }
  }, [signed, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
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
    >
      {/* Definimos as telas explicitamente para evitar erros de renderização */}
      <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
      <Stack.Screen name="register" options={{ title: 'Cadastro', headerShown: true }} />
      <Stack.Screen name="agendar" options={{ title: 'Agendar' }} />
      <Stack.Screen name="localizar" options={{ title: 'Localizar' }} />
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}