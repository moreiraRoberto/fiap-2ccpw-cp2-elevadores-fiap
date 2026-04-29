import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext'; 
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import logoPrincipal from './img/logoprincipal.png';
import fotoElevadores from './img/foto3elevadores.png';

const SESSION_STORAGE_KEY = '@fiapElevador:session';

export default function Home() {
  const { isDark, toggleTheme, logout } = useAuth(); 
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifySession() {
      const session = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
      if (!session) {
        router.replace('/login'); // Mudei para login para seguir o fluxo padrão
        return;
      }
      setLoading(false);
    }
    verifySession();
  }, [router]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: isDark ? '#121212' : '#000' }]}>
        <ActivityIndicator size="large" color="#ED145B" />
        <Text style={styles.loadingText}>Verificando autenticação...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#000' }]}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Botão de Troca de Tema (Diferencial Dark Mode) */}
      <TouchableOpacity onPress={toggleTheme} style={styles.botaoTema}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          {isDark ? '☀️ Mudar para Light' : '🌙 Mudar para Dark'}
        </Text>
      </TouchableOpacity>

      <Image 
        source={fotoElevadores} 
        style={styles.imagemFundo}
        resizeMode="cover"
      />

      <View style={styles.header}>
        <Image 
          source={logoPrincipal} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.tituloApp, { color: isDark ? '#ED145B' : '#fff' }]}>
          FIAP Elevadores
        </Text>
      </View>

      <View style={styles.menu}>
        <Link href="/agendar" asChild>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.textoBotao}>Agendar Elevador</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/localizar" asChild>
          <TouchableOpacity style={[styles.botao, styles.botaoRosa]}>
            <Text style={styles.textoBotao}>Localizar Elevador</Text>
          </TouchableOpacity>
        </Link>

        {/* Logout usando a função do Contexto (Item 3) */}
        <TouchableOpacity style={[styles.botao, styles.botaoLogout]} onPress={logout}>
          <Text style={styles.textoBotao}>Sair do App</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    position: 'relative',
  },
  botaoTema: {
    marginTop: 60,
    marginRight: 20,
    padding: 10,
    backgroundColor: 'rgba(237, 20, 91, 0.5)',
    borderRadius: 8,
    alignSelf: 'flex-end',
    zIndex: 10,
  },
  header: { 
    backgroundColor: 'transparent', 
    paddingTop: 20,
    paddingBottom: 20, 
    alignItems: 'center',
    zIndex: 2 
  },
  logo: {
    width: '90%', 
    height: 150,
    marginBottom: 10,
  },
  tituloApp: { 
    fontSize: 28,        
    fontWeight: 'bold',  
    letterSpacing: 1,    
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  imagemFundo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.15,
    zIndex: 0,
  },
  menu: { 
    flex: 1,
    padding: 20, 
    gap: 20, 
    justifyContent: 'center',
    zIndex: 2 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#fff',
    fontSize: 16,
  },
  botao: { 
    backgroundColor: '#1C1C1C', 
    padding: 20, 
    borderRadius: 12, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333'
  },
  botaoRosa: { 
    backgroundColor: '#ED145B' 
  },
  botaoLogout: {
    backgroundColor: '#444',
  },
  textoBotao: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18 
  }
});