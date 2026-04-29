// context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const router = useRouter();

const USER_KEY = '@fiapElevador:user';
const SESSION_KEY = '@fiapElevador:session';

//Extra solicitado dark mode
const [isDark, setIsDark] = useState(false);
const toggleTheme = () => setIsDark(!isDark);


useEffect(() => {
    async function loadStorageData() {
    const storageUser = await AsyncStorage.getItem(SESSION_KEY);
    if (storageUser) {
        setUser({ email: storageUser });
    }
    setLoading(false);
    }
    loadStorageData();
}, []);

const login = async (email, password) => {
    const storedUser = await AsyncStorage.getItem(USER_KEY);
    if (!storedUser) throw new Error('Usuário não encontrado');

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.email === email.toLowerCase() && parsedUser.password === password) {
    await AsyncStorage.setItem(SESSION_KEY, email);
    setUser({ email });
    router.replace('/');
    } else {
    throw new Error('E-mail ou senha inválidos');
    }
};

const logout = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
    router.replace('/login');
};

const register = async (newUser) => {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
    await AsyncStorage.setItem(SESSION_KEY, newUser.email);
    setUser({ email: newUser.email });
    router.replace('/');
};

return (
    <AuthContext.Provider value={{ 
    signed: !!user, 
    user, 
    login, 
    logout, 
    register, 
    loading,
      isDark,       // ADICIONE ISSO
      toggleTheme   // ADICIONE ISSO
    }}>
    {children}
    </AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);