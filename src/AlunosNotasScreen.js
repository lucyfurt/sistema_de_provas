// src/AlunosNotasScreen.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";
import './css/AlunosNotasScreen.css';

const AlunosNotasScreen = () => {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'provas'));
        const alunosList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAlunos(alunosList);
      } catch (error) {
        console.error("Erro ao buscar dados dos alunos:", error);
      }
    };

    fetchAlunos();
  }, []);

  return (
    <div className="alunos-notas">
      <h2>Dashboard Notas</h2>
      {alunos.length === 0 ? (
        <p>Nenhum aluno encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Curso</th>
              <th>Prova Escolhida</th>
              <th>Notas</th>          
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.aluno}</td>
                <td>{aluno.curso}</td>
                <td>{aluno.nomeProva}</td> 
                <td>{aluno.nota}</td>
                <td>{new Date(aluno.timestamp.seconds * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AlunosNotasScreen;
