import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ equipment = [] }) => {
  const totalUnits = equipment.reduce((sum, item) => sum + (item.quantity || 0), 0) || 28;
  const availableUnits = equipment.reduce((sum, item) => sum + (item.available || 0), 0) || 5;
  const inUseUnits = totalUnits - availableUnits;
  const maintenanceCount = equipment.filter(item => item.status === 'Maintenance').length || 1;
  const lowStockItems = equipment.filter(item => item.available <= 1).length > 0 
    ? equipment.filter(item => item.available <= 1)
    : [
        { id: 1, name: 'Bunsen Burner', location: 'Storage A', available: 0 },
        { id: 2, name: 'Spectrophotometer', location: 'Room 105', available: 0 }
      ];

  return (
    <div className="page-wrapper dashboard-page">
      <div className="page-header-title">
        <h1>Laboratory Analytics & Overview</h1>
        <p>Real-time equipment monitoring and allocation control</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <span className="stat-label">Total Inventory</span>
          <span className="stat-value">{totalUnits}</span>
          <span className="stat-desc">Units across all labs</span>
        </div>
        <div className="stat-card green">
          <span className="stat-label">Available Units</span>
          <span className="stat-value">{availableUnits}</span>
          <span className="stat-desc">Ready for checkout</span>
        </div>
        <div className="stat-card yellow">
          <span className="stat-label">Currently In Use</span>
          <span className="stat-value">{inUseUnits}</span>
          <span className="stat-desc">Checked out by researchers</span>
        </div>
        <div className="stat-card red">
          <span className="stat-label">Under Service</span>
          <span className="stat-value">{maintenanceCount}</span>
          <span className="stat-desc">Maintenance required</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="widget-card">
          <h3>⚠️ Low Availability Notice</h3>
          <hr className="divider" />
          <ul className="alert-list">
            {lowStockItems.map(item => (
              <li key={item.id} className="alert-item">
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.location}</small>
                </div>
                <span className="data-badge in-use">{item.available} Left</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="widget-card">
          <h3>⚡ Quick Operations</h3>
          <hr className="divider" />
          <div className="quick-actions-grid">
            <Link to="/issue" className="action-btn primary-btn">
              ➕ Issue / Return Item
            </Link>
            <Link to="/equipment" className="action-btn outline-btn">
              🔍 Search Catalogue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;