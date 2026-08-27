import React, { useState } from 'react';
import './IssueEquipment.css';

const IssueEquipment = ({ equipment = [], onIssue, onReturn }) => {
  const [selectedId, setSelectedId] = useState('');
  const [userName, setUserName] = useState('');
  const [actionType, setActionType] = useState('Issue');
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId || !userName.trim()) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    const item = equipment.find(e => e.id === parseInt(selectedId));
    if (!item) return;

    if (actionType === 'Issue') {
      if (item.available <= 0) {
        setMessage({ type: 'error', text: 'This equipment is out of stock.' });
        return;
      }
      if (onIssue) onIssue(item.id, userName);
      setMessage({ type: 'success', text: `Successfully issued ${item.name} to ${userName}.` });
    } else {
      if (onReturn) onReturn(item.id, userName);
      setMessage({ type: 'success', text: `Successfully returned ${item.name} from ${userName}.` });
    }

    setUserName('');
  };

  return (
    <div className="page-wrapper issue-page">
      <div className="form-card">
        <div className="page-header-title" style={{ marginBottom: '1.5rem' }}>
          <h2>Issue / Return Equipment</h2>
          <p>Process equipment movement for researchers</p>
        </div>

        {message && (
          <div className={`alert-banner ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Action Type</label>
            <select className="form-select" value={actionType} onChange={e => setActionType(e.target.value)}>
              <option value="Issue">Issue (Check Out)</option>
              <option value="Return">Return (Check In)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Select Equipment</label>
            <select className="form-select" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
              <option value="">-- Choose Item --</option>
              {equipment.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.available} available)
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Researcher / User Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter researcher name"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn">
            {actionType === 'Issue' ? 'Confirm Checkout' : 'Confirm Return'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueEquipment;