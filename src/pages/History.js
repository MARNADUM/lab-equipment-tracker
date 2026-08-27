import React from 'react';
import './History.css';

const History = ({ historyLog = [] }) => {
  return (
    <div className="page-wrapper history-page">
      <div className="page-header-title">
        <h1>Transaction History</h1>
        <p>Complete audit log of checked out and returned items</p>
      </div>

      {historyLog.length > 0 ? (
        <div className="table-container">
          <table className="catalogue-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Transaction ID</th>
                <th>Equipment Details</th>
                <th>Action</th>
                <th>Researcher</th>
              </tr>
            </thead>
            <tbody>
              {historyLog.map(log => (
                <tr key={log.id}>
                  <td style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{log.date}</td>
                  <td className="transaction-id">TXN-{log.id.toString().slice(-6)}</td>
                  <td><strong>{log.equipmentName}</strong></td>
                  <td>
                    <span className={`data-badge ${log.action === 'Issue' ? 'in-use' : 'available'}`}>
                      {log.action === 'Issue' ? 'Checked Out' : 'Returned'}
                    </span>
                  </td>
                  <td>
                    <div className="user-badge">
                      <div className="avatar-circle">
                        {log.user ? log.user.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span>{log.user}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-history">
          <h3>No transactions recorded yet</h3>
          <p>Issue or return an item to see log entries here.</p>
        </div>
      )}
    </div>
  );
};

export default History;