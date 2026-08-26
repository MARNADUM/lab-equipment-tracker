import React, { useState } from 'react';
import './IssueEquipment.css';
const IssueEquipment = ({ equipmentList, setEquipmentList, historyLog, setHistoryLog }) => {
  const [selectedId, setSelectedId] = useState('');
  const [action, setAction] = useState('Issue'); // 'Issue' or 'Return'
  const [user, setUser] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 1. Form Validation
    if (!selectedId || !user) {
      setError('Please select an item and enter a user name.');
      return;
    }

    // Array method: find()
    const itemIndex = equipmentList.findIndex(eq => eq.id === parseInt(selectedId));
    if (itemIndex === -1) return;
    
    const item = equipmentList[itemIndex];
    const updatedList = [...equipmentList];

    // 2. Logic & Status Updates
    if (action === 'Issue') {
      if (item.available <= 0) {
        setError('This item is currently out of stock.');
        return;
      }
      updatedList[itemIndex].available -= 1;
      if (updatedList[itemIndex].available === 0) updatedList[itemIndex].status = 'In-Use';
    } else {
      if (item.available >= item.quantity) {
        setError('All items are already returned.');
        return;
      }
      updatedList[itemIndex].available += 1;
      updatedList[itemIndex].status = 'Available';
    }

    // 3. Update State & History
    setEquipmentList(updatedList);
    
    const newLog = {
      id: Date.now(),
      equipmentName: item.name,
      action: action,
      user: user,
      date: new Date().toLocaleString()
    };
    setHistoryLog([newLog, ...historyLog]);
    
    // Reset form
    setUser('');
    setSelectedId('');
    alert(`Successfully ${action}d ${item.name}!`);
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="page-header">Issue / Return Simulation</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Equipment</label>
          <select className="form-control" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            <option value="">-- Choose Item --</option>
            {equipmentList.map(eq => (
              <option key={eq.id} value={eq.id}>{eq.name} (Avail: {eq.available})</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Action</label>
          <select className="form-control" value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="Issue">Issue Item</option>
            <option value="Return">Return Item</option>
          </select>
        </div>

        <div className="form-group">
          <label>User / Researcher Name</label>
          <input type="text" className="form-control" value={user} onChange={(e) => setUser(e.target.value)} placeholder="e.g. Dr. Smith" />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
          Submit {action}
        </button>
      </form>
    </div>
  );
};

export default IssueEquipment;