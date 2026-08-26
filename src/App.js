import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Equipment from './pages/Equipment';
import IssueEquipment from './pages/IssueEquipment';
import History from './pages/History';
import { initialEquipmentData } from './data/mockData';
import './index.css';

function App() {
  // Load from localStorage or use initial mock data
  const [equipmentList, setEquipmentList] = useState(() => {
    const saved = localStorage.getItem('labEquipment');
    return saved ? JSON.parse(saved) : initialEquipmentData;
  });

  const [historyLog, setHistoryLog] = useState(() => {
    const saved = localStorage.getItem('labHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage whenever data changes (useEffect)
  useEffect(() => {
    localStorage.setItem('labEquipment', JSON.stringify(equipmentList));
  }, [equipmentList]);

  useEffect(() => {
    localStorage.setItem('labHistory', JSON.stringify(historyLog));
  }, [historyLog]);

  return (
    <Router>
      <nav className="navbar">
        <h2>🔬 Lab Tracker</h2>
        <div className="navbar-links">
          <Link to="/">Dashboard</Link>
          <Link to="/equipment">Catalogue</Link>
          <Link to="/issue">Issue/Return</Link>
          <Link to="/history">History</Link>
        </div>
      </nav>
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard equipment={equipmentList} />} />
          <Route path="/equipment" element={<Equipment equipment={equipmentList} />} />
          <Route path="/issue" element={<IssueEquipment equipmentList={equipmentList} setEquipmentList={setEquipmentList} historyLog={historyLog} setHistoryLog={setHistoryLog} />} />
          <Route path="/history" element={<History historyLog={historyLog} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;