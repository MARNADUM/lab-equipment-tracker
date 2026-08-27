import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Equipment.css';

const Equipment = ({ equipment = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-wrapper equipment-page">
      <div className="page-header-title">
        <h1>Equipment Catalogue</h1>
        <p>Browse and manage laboratory assets</p>
      </div>

      <div className="catalogue-controls">
        <input
          type="text"
          placeholder="Search equipment or category..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Available">Available</option>
          <option value="In-Use">In-Use</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      <div className="table-container">
        <table className="catalogue-table">
          <thead>
            <tr>
              <th>Asset ID</th>
              <th>Equipment Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Available / Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id}>
                <td className="data-code">EQP-{item.id}</td>
                <td><strong>{item.name}</strong></td>
                <td>{item.category}</td>
                <td>{item.location}</td>
                <td>{item.available} / {item.quantity}</td>
                <td>
                  <span className={`data-badge ${(item.status || 'available').toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <Link to="/issue" className="action-link">Issue</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Equipment;