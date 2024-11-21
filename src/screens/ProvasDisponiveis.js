
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
//import '../css/ProvasDisponiveis.css';

const ProvasDisponiveis = ({ selecionarProva }) => {
  const [provas, setProvas] = useState([]);

  useEffect(() => {
    const fetchProvas = async () => {
      const querySnapshot = await getDocs(collection(db, 'provas'));
      const provasList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProvas(provasList);
    };

    fetchProvas();
  }, []);

  return (
    <div className="provas-disponiveis">
      <h2>Provas Disponíveis</h2>
      {provas.map((prova) => (
        <button
          key={prova.id}
          onClick={() => selecionarProva(prova)}
          className="prova-button"
        >
          {prova.titulo}
        </button>
      ))}
    </div>
  );
};

export default ProvasDisponiveis;
