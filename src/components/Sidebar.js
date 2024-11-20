// src/components/Sidebar.js
import React from 'react';
import '../css/Sidebar.css';

const Sidebar = ({ onMenuSelect }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <ul className="sidebar-menu">
        <li onClick={() => onMenuSelect('addProva')} className="sidebar-item">Adicionar Prova</li>
        <li onClick={() => onMenuSelect('listarNotas')} className="sidebar-item">Listar Notas</li>
        <li onClick={() => onMenuSelect('listarProvas')} className="sidebar-item">Listar Provas</li>        
        <li onClick={() => onMenuSelect('overview')} className="sidebar-item">Visão Geral</li>
      </ul>
    </div>
  );
};

export default Sidebar;
