# 🚀 FIAP Elevadores - Simulador de Sistema de Elevadores

[![React Native](https://img.shields.io/badge/React%20Native-0.83.2-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~55.0.8-black.svg)](https://expo.dev/)
[![Expo Router](https://img.shields.io/badge/Expo%20Router-~55.0.7-orange.svg)](https://docs.expo.dev/router/introduction/)

> **Projeto acadêmico** - Simulador de um sistema para agendamento e localização de elevadores desenvolvido para a disciplina de CPAD (FIAP)

## 📋a) Sobre o Projeto 

**Nome do aplicativo**: FIAP Elevadores

Este aplicativo foi desenvolvido para solucionar de uma vez por todas o grande tumulto no hall dos elevadores da universidade.

O aplicativo nos permite saber em qual andar cada elevador está programado para passar, dispensando a necessidade de um painel físico para colocar-mos o andar e sabermos qual elevador devemos utilizar.

E também conseguimos agendar um elevador colocando informações simples como o horário e o andar que vamos.

**Baseado no projeto disponível em:** [fiap-2ccpw-cp1-elevadores-fiap](https://github.com/robertomoreira/fiap-2ccpw-cp1-elevadores-fiap) 

## ✨ Funcionalidades Principais

### Autenticação e Cadastro
- **Tela de cadastro** com campos:
  - RM (ex: `RM123456`)
  - E-mail válido
  - Senha com mínimo de 6 caracteres
  - Confirmação de senha igual à senha
- **Tela de login** com validação explícita dos campos e mensagens inline de erro
- **Persistência de sessão** usando `AsyncStorage` para manter o usuário logado entre reinícios
- **Logout** limpa a sessão e retorna à tela de login
- **Fluxo inicial**: usuário não logado é redirecionado para cadastro/login antes de acessar Home

## HOME 
- **Acesso para as opções**
- **AGENDAR ELEVADOR**
- **LOCALIZAR ELEVADOR**
- **LOGOUT** disponível após login

### 🏢 Simulação de Elevadores
- **8 elevadores independentes** (A-H) com estados dinâmicos
- **Movimento realista**: 2 segundos por andar com animação de progresso
- **Dispatch inteligente**: Algoritmo que prioriza elevador mais próximo ao destino
- **Chamadas simultâneas**: Sistema processa 2-5 elevadores ao mesmo tempo
- **Processamento paralelo**: Não bloqueia novas chamadas enquanto elevadores estão em movimento

### 🎨 Interface Visual
- **Cores distintas por elevador**: Cada unidade A-H possui borda lateral colorida única
- **Barra de progresso animada**: Gradiente rosa-verde durante transições
- **Feedback visual rico**: Estados, destinos e progresso em tempo real
- **Design responsivo**: Adaptado para dispositivos móveis

  ### Estados do Elevador
- **Parado**: Disponível para novas chamadas
- **Subindo/Descendo**: Em movimento (com barra de progresso)
- **Ocupado**: Atendendo chamada (destino definido)
- **Cheguei!**: Feedback temporário de chegada

## 📁 Estrutura do Projeto

```
nosso-app-elevador/
├── app/
│   ├── _layout.js          # Layout principal com navegação
│   ├── index.js            # Tela inicial (Home)
│   ├── agendar.js          # Tela de agendamento
│   └── localizar.js        # Simulação de elevadores
├── components/
│   └── CardElevador.js     # Componente de cartão do elevador
├── assets/                 # Recursos estáticos
└── package.json            # Dependências e scripts
```

## 👨‍💻 **b) Integrantes da equipe** 

**Guilherme Ferraz Medeiros** - RM 564743.
**Roberto Marques Moreira** - RM 564935.
**Anny Elly Pantoja** - RM : 565055 .

## 📋**c) Como Rodar o projeto**

## 🛠️ Tecnologias Utilizadas

- **React Native 0.83.2** - Framework principal
- **Expo ~55.0.8** - Plataforma de desenvolvimento
- **Expo Router ~55.0.7** - Navegação baseada em arquivos
- **React 19.2.0** - Biblioteca de componentes
- **expo-linear-gradient** - Gradientes visuais
- **@react-native-async-storage/async-storage** - Armazenamento persistente de sessão e dados

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js instalado
- Expo CLI: `npm install -g @expo/cli`
- Dispositivo físico ou emulador/simulador

### Passos para execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Gui-Ferraz-Medeiros/copia-fiap-2ccpw-cp1-elevadores-fiap.git
   cd copia-fiap-2ccpw-cp1-elevadores-fiap/nosso-app-elevador
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute a aplicação**
   ```bash
   npx expo start -c
   ```

4. **Acesse no dispositivo**
   - Escaneie o QR code com o app Expo Go
   - Ou execute em emulador/simulador

## 🎮 Como Usar

1. **Cadastro**: Na primeira execução, crie sua conta com:
   - RM (por exemplo, `RM123456`)
   - E-mail válido
   - Senha com pelo menos 6 caracteres
   - Confirmação de senha idêntica
2. **Login**: Informe seu e-mail e senha para acessar o app.
   - Se já estiver logado em sessão anterior, o app entra direto na Home
3. **Tela Inicial**: Após o login, navegue entre "Agendar Elevador" e "Localizar Elevador"
4. **Localizar Elevador**: Observe a simulação automática
   - Pedidos são gerados automaticamente a cada 2-5 segundos
   - 2-5 elevadores são despachados simultaneamente
   - Acompanhe o progresso visual e estados em tempo real
   - Cada elevador tem cor distinta para fácil identificação
5. **Agendar Elevador**:
   - Informe o horário de chegada
   - Selecione o andar desejado
   - Confirme para agendar um elevador disponível
  
## 📋d) Demonstração

### TELAS DO APLICATIVO

**HOME**

<img width="597" height="845" alt="image" src="https://github.com/user-attachments/assets/4aa68605-872d-4520-ae9b-33c096810deb" />

**AGENDAR ELEVADOR**

<img width="616" height="722" alt="image" src="https://github.com/user-attachments/assets/fdfc0b45-17e2-46ec-bb5d-efd9feca7445" />

**LOCALIZAR ELEVADOR**

<img width="601" height="872" alt="image" src="https://github.com/user-attachments/assets/36d165b3-3a0f-4c82-a70b-7a7a437f3973" />

### VÍDEO DE DEMONSTRAÇÃO

![Demonstração do App](./nosso-app-elevador/app/img/demonstracaogif.gif)

## 📋d) Decisões Técnicas
**HOOKs**
**OPÇÃO Agendar Elevador**: 
- Utilizamos em "Agendar Elevador" o "useState" para criar memória e atualizar a tela quando selecionamos o andar.
```
export default function Agendar() {
  const [carregando, setCarregando] = useState(true);
      // amarzenamento de informações que mudam durante o uso da tela
  const [andar, setAndar] = useState(null);
  const [horario, setHorario] = useState('');
  const [elevador, setElevador] = useState(null);
  const [mensagem, setMensagem] = useState('Escolha um andar e horário');

```

- Utilizamos também em "Agendar Elevador" o "useEffect".
- Usamos o eleevador como dependência, ou seja toda vez que o valor de elevador mudar, deve executar a função.
  
```
useEffect(() => {
  if (elevador) { setMensagem(`Elevador ${elevador} agendado!`); }
}, [elevador]);
```

### Algoritmo de Dispatch
```javascript
// 1. Filtrar elevadores livres
const livres = elevadores.filter(e => !e.ocupado);

// 2. Calcular distâncias para o destino
const distancias = livres.map(e => ({
  elevador: e,
  distancia: Math.abs(destino - e.andarAtual)
}));

// 3. Selecionar menor distância
const menorDistancia = Math.min(...distancias.map(d => d.distancia));

// 4. Desempate randômico entre candidatos
const melhores = distancias.filter(d => d.distancia === menorDistancia);
const escolhido = melhores[Math.floor(Math.random() * melhores.length)];
```

## 📋e) Próximos Passos
- Implementar o cancelamento de agendamento
- Fazer uma integração API dos elevadores.


