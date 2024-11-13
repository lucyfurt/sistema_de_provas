// src/MenuSelecaoProva.js
import React from 'react';
import HistoriaUm from './ProvaHistoriaI';
import HistoriaDois from './ProvaHistoriaII';
import HistoriaTres from './ProvaHistoriaIII';
import HistoriaQuatro from './ProvaHistoriaIV';
import HistoriaCinco from './ProvaHistoriaV';
import './MenuSelecaoProvas.css';  

const MenuSelecaoProva = ({ selecionarProva }) => {
  return (
    <div className="menu-container">
      <h2 className="menu-title">Selecione a Prova</h2>
      <div className="button-group">
        <button 
          className="menu-button" 
          onClick={() => selecionarProva(HistoriaUm, "História I")}
        >
          História I
        </button>
        <button 
          className="menu-button" 
          onClick={() => selecionarProva(HistoriaDois, "História II")}
        >
          História II
        </button>
        <button 
          className="menu-button" 
          onClick={() => selecionarProva(HistoriaTres, "História III")}
        >
          História III
        </button>
        <button 
          className="menu-button" 
          onClick={() => selecionarProva(HistoriaQuatro, "História IV")}
        >
          História IV
        </button>
        <button 
          className="menu-button" 
          onClick={() => selecionarProva(HistoriaCinco, "História V")}
        >
          História V
        </button>
      </div>
    </div>
  );
};

export default MenuSelecaoProva;
