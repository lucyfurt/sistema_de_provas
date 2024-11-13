// src/App.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import LoginScreen from './LoginScreen';
import WelcomeScreen from './WelcomeScreen';
import QuestionScreen from './QuestionScreen';
import FinishScreen from './FinishScreen';
import AlunosNotasScreen from './AlunosNotasScreen';
import MenuSelecaoProva from './provas/MenuSelecaoProvas';  


// Importa função para cálculo da nota
import calculaNota from './utils/calculaNota';

function App() {
  const [user, setUser] = useState(null);            
  const [aluno, setAluno] = useState({});             
  const [respostas, setRespostas] = useState([]);     
  const [nota, setNota] = useState(0);               
  const [isProfessor, setIsProfessor] = useState(false); 
  const [provaSelecionada, setProvaSelecionada] = useState(null); 
  const [nomeProvaSelecionada, setNomeProvaSelecionada] = useState(""); 
 
  // Verifica se o usuário é professor ou aluno
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsProfessor(user.email === 'luciana.furtado@ifma.edu.br'); 
      } else {
        setUser(null);
        setIsProfessor(false);
      }
    });
    return unsubscribe;
  }, []);

  // Função chamada ao finalizar a prova
  const handleProvaFinalizada = (respostas) => {
    console.log("Prova finalizada com as respostas:", respostas);
    const pontos = calculaNota(provaSelecionada, respostas);
    setNota(pontos);
    setRespostas(respostas);
  };

// Alternância de provas pelo menu de seleção
const selecionarProva = (prova, nomeProva) => {
  setProvaSelecionada(prova);
  setNomeProvaSelecionada(nomeProva);
  setRespostas([]); 
  setNota(0);       
};

  // Renderização condicional das telas
  if (!user) return <LoginScreen />;
  if (isProfessor) return <AlunosNotasScreen />;
  if (!aluno.nome) return <WelcomeScreen setAluno={setAluno} />;
  if (!provaSelecionada) return <MenuSelecaoProva selecionarProva={selecionarProva} />;
  if (respostas.length === 0) {
    return (
      <QuestionScreen 
        questoes={provaSelecionada} 
        tempoMaximo={1800}  
        onProvaFinalizada={handleProvaFinalizada} 
      />
    );
  }

  return (
    <FinishScreen 
      aluno={aluno} 
      respostas={respostas} 
      questoes={provaSelecionada} 
      nomeProva={nomeProvaSelecionada} 
      nota={nota} 
    />

  );
}

export default App;
