import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Rooms from './components/Rooms';
import ActivityLog from './components/ActivityLog';
import Reports from './components/Reports';
import StudentInformation from './components/StudentInformation';
import Inventory from './components/Inventory';
import Account from './components/Account';

  function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/activity-log" element={<ActivityLog />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/student-information" element={<StudentInformation />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;