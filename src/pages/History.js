import React from 'react';

const History = ({ historyLog }) => {
  return (
    <div className="page-wrapper">
      <div className="page-header-title">
        <h1>Transaction History</h1>
        <p>Complete audit trail of equipment issuance and returns.</p>
      </div>

      <div className="table-container">
        {historyLog && historyLog.length > 0 ? (
          <table className="catalogue-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Transaction ID</th>
                <th>Equipment Details</th>
                <th>Action</th>
                <th>Researcher / User</th>
              </tr>
            </thead>
            <tbody>
              {historyLog.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {log.date}
                  </td>
                  <td style={{ fontFamily: 'monospace', color: '#818cf8' }}>
                    TXN-{log.id.toString().slice(-6)}
                  </td>
                  <td>
                    <strong>{log.equipmentName}</strong>
                  </td>
                  <td>
                    <span className={`badge ${log.action}`}>
                      {log.action === 'Issue' ? 'Checked Out' : 'Returned'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>
                        {log.user.charAt(0).toUpperCase()}
                      </div>
                      {log.user}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem', color: '#fff' }}>No history available</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Issue or return equipment in the Issue/Return tab to automatically generate audit logs here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;