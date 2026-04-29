import { Stack, Link } from 'expo-router';
import { useAuth } from '../context/AuthContext'; 
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Importação das imagens
import logoPrincipal from './img/logoprincipal.png';
import fotoElevadores from './img/foto3elevadores.png';

export default function Home() {
  // Pegamos apenas o que é necessário do contexto
  // O loading e o redirecionamento são tratados no app/_layout.jsx
  const { isDark, toggleTheme, logout } = useAuth(); 

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#000' }]}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Botão de Troca de Tema */}
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
        {/* Correção do erro de Style Array: 
            Passamos apenas UM objeto de estilo para o filho do Link */}
        <Link href="/agendar" asChild>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.textoBotao}>Agendar Elevador</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/localizar" asChild>
          <TouchableOpacity style={styles.botaoEspecial}>
            <Text style={styles.textoBotao}>Localizar Elevador</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.botaoLogout} onPress={logout}>
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
  botao: { 
    backgroundColor: '#1C1C1C', 
    padding: 20, 
    borderRadius: 12, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333'
  },
  // Criamos estilos fixos em vez de passar arrays [style1, style2] para o Link
  botaoEspecial: { 
    backgroundColor: '#ED145B',
    padding: 20, 
    borderRadius: 12, 
    alignItems: 'center',
  },
  botaoLogout: {
    backgroundColor: '#444',
    padding: 20, 
    borderRadius: 12, 
    alignItems: 'center',
  },
  textoBotao: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18 
  }
});