// src/screens/ResponderProva.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
//import '../css/ResponderProva.css';

const ResponderProva = ({ prova, aluno }) => {
  const [respostas, setRespostas] = useState(
    prova.questoes.map(() => '')
  );

  const handleRespostaChange = (index, resposta) => {
    const novasRespostas = [...respostas];
    novasRespostas[index] = resposta;
    setRespostas(novasRespostas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'respostas'), {
        aluno: aluno.nome,
        disciplina: prova.disciplina,
        tituloProva: prova.titulo,
        respostas,
        timestamp: new Date(),
      });
      alert('Respostas enviadas com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar as respostas:', error);
      alert('Erro ao enviar as respostas. Tente novamente.');
    }
  };

  return (
    <div className="responder-prova">
      <h2>{prova.titulo}</h2>
      <p>{prova.descricao}</p>
      <form onSubmit={handleSubmit}>
        {prova.questoes.map((questao, index) => (
          <div key={index} className="questao-item">
            <h3>{questao.pergunta}</h3>
            {questao.opcoes.map((opcao, opcaoIndex) => (
              <div key={opcaoIndex} className="opcao-item">
                <input
                  type="radio"
                  id={`questao-${index}-opcao-${opcaoIndex}`}
                  name={`questao-${index}`}
                  value={opcao}
                  checked={respostas[index] === opcao}
                  onChange={() => handleRespostaChange(index, opcao)}
                />
                <label htmlFor={`questao-${index}-opcao-${opcaoIndex}`}>
                  {opcao}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-button">
          Enviar Respostas
        </button>
      </form>
    </div>
  );
};

export default ResponderProva;
