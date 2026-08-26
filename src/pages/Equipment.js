import React, { useState } from 'react';
import './Equipment.css';
import './History.css';

const Equipment = ({ equipment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null); // Equipment Details Modal State

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1 className="page-header">Equipment Catalogue</h1>
      
      <div className="filter-bar">
        <input 
          type="text" 
          placeholder="Search items..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="status-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Available">Available</option>
          <option value="In-Use">In-Use</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <table className="catalogue-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Available / Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEquipment.map(item => (
            <tr key={item.id}>
              <td><strong>{item.name}</strong></td>
              <td>{item.location}</td>
              <td>{item.available} / {item.quantity}</td>
              <td><span className={`badge ${item.status}`}>{item.status}</span></td>
              <td>
                <button 
                  style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => setSelectedItem(item)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Equipment Details Screen (Modal View) */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedItem.name}</h2>
            <hr style={{ borderColor: '#334155', margin: '1rem 0' }} />
            <p><strong>ID:</strong> LAB-00{selectedItem.id}</p>
            <p><strong>Location:</strong> {selectedItem.location}</p>
            <p><strong>Total Quantity:</strong> {selectedItem.quantity}</p>
            <p><strong>Currently Available:</strong> {selectedItem.available}</p>
            <p><strong>Status:</strong> {selectedItem.status}</p>
            <button 
              className="btn-submit" 
              style={{ marginTop: '1.5rem' }} 
              onClick={() => setSelectedItem(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipment;