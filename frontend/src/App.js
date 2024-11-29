import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TrainingModule from './pages/TrainingModule';
import Simulation from './pages/Simulation';
import Analytics from './pages/Analytics';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import EmailGenerator from './pages/EmailGenerator';

const App = () => {
  return (
    <Router>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr', // Header takes up the first row; content takes up remaining height
          gridTemplateColumns: '240px 1fr', // Sidebar takes a fixed width; Main Content fills the rest
          height: '100vh',
        }}
      >
        {/* Header */}
        <div style={{ gridColumn: '1 / 3', gridRow: '1' }}>
          <Header />
        </div>

        {/* Sidebar */}
        <div style={{ gridColumn: '1', gridRow: '2', overflowY: 'auto' }}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div style={{ gridColumn: '2', gridRow: '2', overflowY: 'auto', padding: 16 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/training" element={<TrainingModule />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/email-generator" element={<EmailGenerator />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
