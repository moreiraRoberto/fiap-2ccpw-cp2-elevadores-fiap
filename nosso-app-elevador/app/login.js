import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, Link } from 'expo-router';

const USER_STORAGE_KEY = '@fiapElevador:user';
const SESSION_STORAGE_KEY = '@fiapElevador:session';
const emailRegex = /^\S+@\S+\.\S+$/;

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    async function restoreSession() {
      const session = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
      if (session) {
        router.replace('/');
      }
    }
    restoreSession();
  }, [router]);

  useEffect(() => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'O e-mail é obrigatório';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Formato de e-mail inválido';
    }

    if (!password) {
      newErrors.password = 'A senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter ao menos 6 caracteres';
    }

    setErrors(newErrors);
  }, [email, password]);

  const handleLogin = async () => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    setBusy(true);
    setMessage('');

    try {
      const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (!storedUser) {
        setMessage('Nenhum usuário cadastrado. Peça ao colega responsável pelo cadastro para criar um usuário.');
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email !== email.trim().toLowerCase() || parsedUser.password !== password) {
        setMessage('E-mail ou senha inválidos.');
        return;
      }

      await AsyncStorage.setItem(SESSION_STORAGE_KEY, parsedUser.email);
      router.replace('/');
    } catch (error) {
      setMessage('Não foi possível realizar o login. Tente novamente.');
      console.error('Login error:', error);
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
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        {message ? <Text style={styles.errorText}>{message}</Text> : null}

        <TouchableOpacity style={[styles.button, !canSubmit && styles.buttonDisabled]} disabled={!canSubmit} onPress={handleLogin}>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 18,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 18,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: '#ED145B',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ED145B',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: '#D7A1B7',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  errorText: {
    color: '#C62828',
    marginBottom: 10,
  },
  footer: {
    marginTop: 18,
    alignItems: 'center',
  },
  footerText: {
    color: '#555',
  },
  linkText: {
    color: '#ED145B',
    fontWeight: '700',
    marginTop: 6,
  },
});
