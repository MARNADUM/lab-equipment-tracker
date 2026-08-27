import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Equipment from './pages/Equipment';
import IssueEquipment from './pages/IssueEquipment';
import History from './pages/History';
import { initialEquipmentData } from './data/mockData';
import './App.css';

function App() {
  const [equipment, setEquipment] = useState(initialEquipmentData);
  const [historyLog, setHistoryLog] = useState([]);

  const handleIssue = (id, user) => {
    setEquipment(prev => prev.map(item => {
      if (item.id === id) {
        const nextAvail = item.available - 1;
        return {
          ...item,
          available: nextAvail,
          status: nextAvail === 0 ? 'In-Use' : item.status
        };
      }
      return item;
    }));

    const item = equipment.find(e => e.id === id);
    setHistoryLog(prev => [{
      id: Date.now(),
      date: new Date().toLocaleString(),
      equipmentName: item ? item.name : 'Equipment',
      action: 'Issue',
      user: user
    }, ...prev]);
  };

  const handleReturn = (id, user) => {
    setEquipment(prev => prev.map(item => {
      if (item.id === id) {
        const nextAvail = item.available + 1;
        return {
          ...item,
          available: nextAvail,
          status: 'Available'
        };
      }
      return item;
    }));

    const item = equipment.find(e => e.id === id);
    setHistoryLog(prev => [{
      id: Date.now(),
      date: new Date().toLocaleString(),
      equipmentName: item ? item.name : 'Equipment',
      action: 'Return',
      user: user
    }, ...prev]);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard equipment={equipment} />} />
            <Route path="/equipment" element={<Equipment equipment={equipment} />} />
            <Route path="/issue" element={<IssueEquipment equipment={equipment} onIssue={handleIssue} onReturn={handleReturn} />} />
            <Route path="/history" element={<History historyLog={historyLog} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;