import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage'; //importando o async-storage
=======
import * as Notifications from 'expo-notifications';
>>>>>>> edde89e9bf3bcaa25616f074bcba55cbc0281078

export default function Agendar() {
  const [carregando, setCarregando] = useState(true);

  const [andar, setAndar] = useState(null);
  const [horario, setHorario] = useState('');
  const [elevador, setElevador] = useState(null);
  const [mensagem, setMensagem] = useState('Escolha um andar e horário');

<<<<<<< HEAD
    // simular carregamento inicial, carregar os dados ao abrir a tela
=======
  const [errors, setErrors] = useState({});

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);
>>>>>>> edde89e9bf3bcaa25616f074bcba55cbc0281078

  useEffect(() => {
    setTimeout(() => {
    async function carregarAgendamentoSalvo() {
    try {
      const dados = await AsyncStorage.getItem('@fiapElevador:agendamentos');
      if (dados) {
        const agendamento = JSON.parse(dados);
        setAndar(agendamento.andar);
        setHorario(agendamento.horario);
        setElevador(agendamento.elevadorId);
        setMensagem('Último agendamento recuperado!');
      }
    } catch (e) {
      console.error("Erro ao carregar dados", e);
    } finally {
      setCarregando(false);
    }
  }
  carregarAgendamentoSalvo();
}, []);
  
  const elevadores = [
    { id: 'A', ocupado: false },
    { id: 'B', ocupado: false },
    { id: 'C', ocupado: true },
    { id: 'D', ocupado: false },
    { id: 'E', ocupado: false },
    { id: 'F', ocupado: true },
    { id: 'G', ocupado: false },
    { id: 'H', ocupado: false },
  ];

  useEffect(() => {
    if (elevador) {
      setMensagem(`Elevador ${elevador} agendado! Você receberá um lembrete.`);
    }
  }, [elevador]);

  useEffect(() => {
    const newErrors = {};

    if (!andar) {
      newErrors.andar = 'Selecione um andar';
    }

    if (!horario.trim()) {
      newErrors.horario = 'O horário é obrigatório';
    } else if (!/^\d{2}:\d{2}$/.test(horario.trim())) {
      newErrors.horario = 'Formato inválido (use HH:MM)';
    }

    setErrors(newErrors);
  }, [andar, horario]);

  const agendarNotificacao = async (idElevador) => {
    try {
      const [hora, minuto] = horario.split(':');

      const data = new Date();
      data.setHours(parseInt(hora));
      data.setMinutes(parseInt(minuto));
      data.setSeconds(0);

      if (data < new Date()) {
        data.setDate(data.getDate() + 1);
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Lembrete de Elevador',
          body: `Elevador ${idElevador} → Andar ${andar} às ${horario}`,
        },
        trigger: data,
      });
    } catch (error) {
      console.log('Erro ao agendar notificação:', error);
    }
  };

  const agendarElevador = () => {
    if (Object.keys(errors).length > 0) {
      return;
    }

    if (!andar || !horario) {
      setMensagem('Escolha um andar e horário');
      return;
    }

    const livres = elevadores.filter(e => !e.ocupado);

    if (livres.length === 0) {
      setMensagem('Nenhum elevador disponível');
      return;
    }

    const escolhido = livres[Math.floor(Math.random() * livres.length)];

    setElevador(escolhido.id);

<<<<<<< HEAD
  const novoAgendamento = {
  andar: andar, 
  horario: horario,
  elevadorId: escolhido.id
};

AsyncStorage.setItem('@fiapElevador:agendamentos', JSON.stringify(novoAgendamento))
  .catch(err => console.log("Erro ao salvar", err));
=======
    agendarNotificacao(escolhido.id);
>>>>>>> edde89e9bf3bcaa25616f074bcba55cbc0281078
  };

  const canSubmit =
    andar &&
    horario.trim().length > 0 &&
    Object.keys(errors).length === 0;

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}> Agendar Elevador</Text>

    
      <Text style={styles.label}>Escolha o andar:</Text>

      <View style={styles.andares}>
        {[1,2,3,4,5,6,7,8].map(num => (
          <TouchableOpacity
            key={num}
            style={[
              styles.botaoAndar,
              andar === num && styles.botaoSelecionado
            ]}
            onPress={() => setAndar(num)}
          >
            <Text style={[
              styles.textoAndar,
              andar === num && styles.textoSelecionado
            ]}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {errors.andar ? <Text style={styles.errorText}>{errors.andar}</Text> : null}

      <Text style={styles.label}>Digite o horário:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 14:30"
        value={horario}
        onChangeText={setHorario}
      />

      {errors.horario ? <Text style={styles.errorText}>{errors.horario}</Text> : null}

      <TouchableOpacity
        style={[styles.botaoAgendar, !canSubmit && { opacity: 0.5 }]}
        disabled={!canSubmit}
        onPress={agendarElevador}
      >
        <Text style={styles.textoBotao}>Agendar</Text>
      </TouchableOpacity>

      <Text style={styles.mensagem}>{mensagem}</Text>

      {elevador && (
        <Text style={styles.resultado}>
          Elevador {elevador} → Andar {andar} às {horario}
        </Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 16,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },

  andares: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },

  botaoAndar: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    minWidth: 45,
    alignItems: 'center',
  },

  botaoSelecionado: {
    backgroundColor: '#E91E63',
  },

  textoAndar: {
    fontWeight: 'bold',
    color: '#333',
  },

  textoSelecionado: {
    color: '#fff',
  },

  input: {
    backgroundColor: '#eaeaea',
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
  },

  botaoAgendar: {
    backgroundColor: '#E91E63',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  mensagem: {
    marginTop: 15,
    textAlign: 'center',
    color: '#666',
  },

  resultado: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  errorText: {
    color: 'red',
    marginBottom: 10,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 18,
  },
});
