import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logoPrincipal from './img/logoprincipal.png';
import fotoElevadores from './img/foto3elevadores.png';

const SESSION_STORAGE_KEY = '@fiapElevador:session';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifySession() {
      const session = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
      if (!session) {
        router.replace('/register');
        return;
      }
      setLoading(false);
    }

    verifySession();
  }, [router]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
    router.replace('/login');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ED145B" />
        <Text style={styles.loadingText}>Verificando autenticação...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/*coloquei esse comando para sumir a palavra index no topo da pagina*/}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Imagem de Fundo com a imagem do elevador para destaca*/}
      <Image 
        source={fotoElevadores} 
        style={styles.imagemFundo}
        resizeMode="cover"
      />


      {/* Exemplo de uso de Image (Requisito) */}
      <View style={styles.header}>
        {/* Imagem da Logo salva em img */}
        <Image 
          source={logoPrincipal} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.tituloApp}>FIAP Elevadores</Text>
      </View>

      <View style={styles.menu}>
        {/* Botão para a tela agendar */}
        <Link href="/agendar" asChild>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.textoBotao}>Agendar Elevador</Text>
          </TouchableOpacity>
        </Link>

        {/* Botão para a tela card-elevador */}
        <Link href="/localizar" asChild>
          <TouchableOpacity style={StyleSheet.flatten([styles.botao, styles.botaoRosa])}>
            <Text style={styles.textoBotao}>Localizar Elevador</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={StyleSheet.flatten([styles.botao, styles.botaoLogout])} onPress={handleLogout}>
          <Text style={styles.textoBotao}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Ajustando o estilo do home 
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000',
    position: 'relative',
  },
  header: { 
    backgroundColor: 'transparent', 
    paddingTop: 80,
    paddingBottom: 20, 
    alignItems: 'center',
    zIndex: 2 
  },
  logo: {
    width: '90%', 
    height: 180,
    marginBottom: 20,
  },

  tituloApp: { 
    color: '#fff',       
    fontSize: 28,        
    fontWeight: 'bold',  
    letterSpacing: 1,    
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
  },
 
  imagemFundo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.12,
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
    backgroundColor: '#000',
  },
  loadingText: {
    marginTop: 12,
    color: '#fff',
    fontSize: 16,
  },
  botao: { 
    backgroundColor: '#1C1C1C', 
    padding: 22, 
    borderRadius: 12, 
    alignItems: 'center',
  },
  botaoRosa: { 
    backgroundColor: '#ED145B' 
  },
  botaoLogout: {
    backgroundColor: '#333',
  },
  textoBotao: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18 
  }
});