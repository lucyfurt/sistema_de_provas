// src/screens/Dashboard.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AddProvaScreen from './AddProvaScreen';
//import TurmasScreen from './TurmasScreen';

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('overview');

  const renderContent = () => {
    switch (selectedMenu) {
      case 'addProva':
        return <AddProvaScreen />;
     // case 'listarTurmas':
      //  return <TurmasScreen />;
      case 'overview':
        return <div>Visão Geral do Dashboard</div>;
      default:
        return <div>Selecione uma opção no menu</div>;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onMenuSelect={setSelectedMenu} />
      <div style={{ flex: 1, padding: '20px' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
