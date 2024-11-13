import React, { useState, useEffect } from 'react';
import './css/question.css';

const QuestionScreen = ({ questoes, tempoMaximo, onProvaFinalizada }) => {
  const [respostas, setRespostas] = useState({});
  const [tempoRestante, setTempoRestante] = useState(tempoMaximo);

  useEffect(() => {
    if (tempoRestante > 0) {
      const timer = setTimeout(() => setTempoRestante(tempoRestante - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onProvaFinalizada(respostas);
    }
  }, [tempoRestante, onProvaFinalizada, respostas]);

  const handleChange = (idQuestao, idOpcao) => {
    setRespostas({
      ...respostas,
      [idQuestao]: idOpcao,
    });
  };

  const finalizarProva = () => {
    onProvaFinalizada(respostas);
  };

  // Função para formatar o tempo em minutos:segundos
  const formatarTempo = (tempo) => {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    return `${minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
  };

  return (
    <div className="question-screen">
      <h2>Prova de História</h2>
      <div className="timer">Tempo restante: {formatarTempo(tempoRestante)}</div>
      
      {questoes.map((questao) => (
        <div key={questao.id} className="question">
          <h3>{questao.pergunta}</h3>
          <div className="options">
            {questao.opcoes.map((opcao) => (
              <label key={opcao.id} className="option">
                <input
                  type="checkbox"
                  checked={respostas[questao.id] === opcao.id}
                  onChange={() => handleChange(questao.id, opcao.id)}
                />
                {opcao.texto}
              </label>
            ))}
          </div>
        </div>
      ))}
      
      <button onClick={finalizarProva} className="finish-button">Finalizar Prova</button>
    </div>
  );
};

export default QuestionScreen;
