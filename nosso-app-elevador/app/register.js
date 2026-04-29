import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, Link } from 'expo-router';
import { useAuth } from '../context/AuthContext'; 

const emailRegex = /^\S+@\S+\.\S+$/;

export default function Register() {
  const { register: authRegister } = useAuth();

  const [rm, setRm] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  // Mantenha este useEffect: Ele serve apenas para validar os campos do formulário
  useEffect(() => {
    const newErrors = {};
    if (!rm.trim()) newErrors.rm = 'O RM é obrigatório';
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
    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'As senhas devem ser idênticas';
    }
    setErrors(newErrors);
  }, [rm, email, password, confirmPassword]);

  const handleRegister = async () => {
    if (Object.keys(errors).length > 0) return;
    
    setBusy(true);
    setMessage('');

    try {
      const userData = {
        rm: rm.trim(),
        email: email.trim().toLowerCase(),
        password,
      };

      // Chama a função do contexto que salva no AsyncStorage e atualiza o estado assinado
      await authRegister(userData);
      
    } catch (error) {
      setMessage('Não foi possível criar a conta.');
      console.error(error);
    } finally {
      setBusy(false);
    }
  };

  const canSubmit = !busy && rm.trim() && email.trim() && password.length >= 6 && confirmPassword === password;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Stack.Screen options={{ title: 'Cadastrar' }} />
      <View style={styles.card}>
        <Text style={styles.title}>Cadastro</Text>

        <TextInput
          style={styles.input}
          placeholder="RM"
          value={rm}
          autoCapitalize="characters"
          onChangeText={setRm}
        />
        {errors.rm && <Text style={styles.errorText}>{errors.rm}</Text>}

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
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Confirmação de senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        {message ? <Text style={styles.errorText}>{message}</Text> : null}

        <TouchableOpacity 
          style={[styles.button, !canSubmit && styles.buttonDisabled]} 
          disabled={!canSubmit} 
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>{busy ? 'Cadastrando...' : 'Cadastrar'}</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Já possui conta?</Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Ir para login</Text>
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