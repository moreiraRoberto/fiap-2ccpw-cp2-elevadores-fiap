import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '../context/AuthContext'; // Importando o contexto

const emailRegex = /^\S+@\S+\.\S+$/;

export default function Login() {
  const router = useRouter();
  const { login: authLogin } = useAuth(); // Pegando a função de login do contexto

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  // Validação em tempo real
  useEffect(() => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'O e-mail é obrigatório';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Formato de e-mail inválido';
    }
    if (!password) {
      newErrors.password = 'A senha é obrigatória';
    }
    setErrors(newErrors);
  }, [email, password]);

  const handleLogin = async () => {
    if (Object.keys(errors).length > 0) return;

    setBusy(true);
    setMessage('');

    try {
      // USANDO O CONTEXTO:
      // A função authLogin já verifica o AsyncStorage e atualiza o estado global 'user'
      await authLogin(email.trim(), password);
      
      // O redirecionamento para '/' já acontece dentro do AuthContext.js
    } catch (error) {
      // Captura o erro que você deu "throw" lá no AuthContext (ex: 'E-mail ou senha inválidos')
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  };

  const canSubmit = !busy && email.trim().length > 0 && password.length > 0 && Object.keys(errors).length === 0;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {message ? <Text style={styles.errorText}>{message}</Text> : null}

        <TouchableOpacity 
          style={[styles.button, !canSubmit && styles.buttonDisabled]} 
          disabled={!canSubmit} 
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>{busy ? 'Entrando...' : 'Entrar'}</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Ainda não tem conta?</Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Cadastre-se aqui</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 24 },
  card: { backgroundColor: '#F9F9F9', borderRadius: 18, padding: 24, elevation: 10, shadowColor: '#000', shadowOpacity: 0.08, shadowOffset: { width: 0, height: 6 }, shadowRadius: 18 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24, color: '#ED145B', textAlign: 'center' },
  input: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#E0E0E0', padding: 16, marginBottom: 10 },
  button: { backgroundColor: '#ED145B', paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginTop: 12 },
  buttonDisabled: { backgroundColor: '#D7A1B7' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  errorText: { color: '#C62828', marginBottom: 10, fontSize: 12 },
  footer: { marginTop: 18, alignItems: 'center' },
  footerText: { color: '#555' },
  linkText: { color: '#ED145B', fontWeight: '700', marginTop: 6 },
});