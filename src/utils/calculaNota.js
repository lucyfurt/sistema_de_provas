// src/utils/calculaNota.js
const calculaNota = (prova, respostas) => {
  let nota = 0;

  prova.forEach((questao) => {
    const respostaAluno = respostas[questao.id];
    
    // Verifique se a resposta do aluno existe e se corresponde à resposta correta
    if (respostaAluno && respostaAluno === questao.respostaCorreta) {
      nota += 1; // Incrementa a nota em 1 ponto para cada resposta correta
    }
  });

  return nota;
};

export default calculaNota;
