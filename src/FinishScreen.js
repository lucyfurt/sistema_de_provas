// src/FinishScreen.js
import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import calcularNota from './utils/calculaNota'; // Importa a função de cálculo de nota
import './css/finish.css';

const FinishScreen = ({ aluno, respostas, questoes, nomeProva, nota }) => {
  const [provaEnviada, setProvaEnviada] = useState(false);

  if (!questoes || questoes.length === 0) {
    return <p>Erro: Não foi possível carregar as questões.</p>;
  }

  // Obter a nota calculada (caso ainda não tenha sido calculada no App)
  if (nota === undefined) {
    nota = calcularNota(questoes, respostas);
  }

  const enviarProva = async () => {
    try {
      await addDoc(collection(db, 'provas'), {
        aluno: aluno.nome,
        curso: aluno.curso,
        nomeProva: nomeProva, // Adiciona o nome da prova
        respostas,
        nota,
        timestamp: new Date(),
      });
      setProvaEnviada(true); // Marca que a prova foi enviada
    } catch (error) {
      console.error("Erro ao enviar a prova:", error);
      alert("Erro ao enviar a prova: " + error.message);
    }
  };

  return (
    <div className="finish-screen">
      {provaEnviada ? (
        <h2 className="thank-you-message">Obrigada! Sua prova foi enviada com sucesso.</h2>
      ) : (
        <>
          <h2 className="result-title">Resumo da Prova</h2>
          <p className="result-score">Nota: {nota}</p>
          <button onClick={enviarProva} className="send-button">Enviar Prova</button>
        </>
      )}
    </div>
  );
};

export default FinishScreen;
