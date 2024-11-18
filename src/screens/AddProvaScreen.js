// src/screens/AddProvaScreen.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import '../css/AddProvaScreen.css';

const AddProvaScreen = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [questoes, setQuestoes] = useState([{ pergunta: '', opcoes: ['', '', '', ''], correta: '' }]);

  const handleAddQuestao = () => {
    setQuestoes([...questoes, { pergunta: '', opcoes: ['', '', '', ''], correta: '' }]);
  };

  const handleQuestaoChange = (index, field, value) => {
    const novasQuestoes = [...questoes];
    if (field === 'pergunta') {
      novasQuestoes[index].pergunta = value;
    } else if (field === 'correta') {
      novasQuestoes[index].correta = value;
    } else {
      novasQuestoes[index].opcoes[field] = value;
    }
    setQuestoes(novasQuestoes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !descricao || !disciplina || questoes.some(q => !q.pergunta || !q.correta || q.opcoes.some(op => !op))) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await addDoc(collection(db, 'provas'), {        
        titulo,
        descricao,
        disciplina,
        questoes,
        timestamp: new Date(),
      });
      alert('Prova adicionada com sucesso!');
      setTitulo('');
      setDescricao('');
      setDisciplina('');
      setQuestoes([{ pergunta: '', opcoes: ['', '', '', ''], correta: '' }]);
    } catch (error) {
      console.error('Erro ao adicionar a prova:', error);
      alert('Erro ao adicionar a prova. Tente novamente.');
    }
  };

  return (
    <div className="add-prova-screen">
      <h2>Adicionar Nova Prova</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título da Prova</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título da prova"
          />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva a prova"
          />
        </div>
        <div className="form-group">
          <label>Disciplina</label>
          <textarea
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
            placeholder="Disciplina"
          />
        </div>
        <div className="questoes-container">
          {questoes.map((questao, index) => (
            <div key={index} className="questao-item">
              <label>Pergunta {index + 1}</label>
              <input
                type="text"
                value={questao.pergunta}
                onChange={(e) => handleQuestaoChange(index, 'pergunta', e.target.value)}
                placeholder="Digite a pergunta"
              />
              <div className="opcoes-container">
                {questao.opcoes.map((opcao, opcaoIndex) => (
                  <input
                    key={opcaoIndex}
                    type="text"
                    value={opcao}
                    onChange={(e) => handleQuestaoChange(index, opcaoIndex, e.target.value)}
                    placeholder={`Opção ${opcaoIndex + 1}`}
                  />
                ))}
              </div>
              <label>Resposta Correta</label>
              <input
                type="text"
                value={questao.correta}
                onChange={(e) => handleQuestaoChange(index, 'correta', e.target.value)}
                placeholder="Digite a resposta correta"
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={handleAddQuestao} className="add-questao-button">
          + Adicionar Questão
        </button>
        <button type="submit" className="submit-button">
          Salvar Prova
        </button>
      </form>
    </div>
  );
};

export default AddProvaScreen;
