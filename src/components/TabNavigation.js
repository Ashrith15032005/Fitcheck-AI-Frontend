import React from 'react';
import { Upload, Camera } from 'lucide-react';
import './TabNavigation.css';

const TabNavigation = ({ activeTab, setActiveTab, hasResult }) => {
  return (
    <div className="tab-navigation">
      <button
        onClick={() => setActiveTab('upload')}
        className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
      >
        <Upload className="tab-icon" />
        Upload & Try On
      </button>
      <button
        onClick={() => setActiveTab('result')}
        disabled={!hasResult}
        className={`tab-button ${activeTab === 'result' && hasResult ? 'active' : ''} ${!hasResult ? 'disabled' : ''}`}
      >
        <Camera className="tab-icon" />
        Your Look
      </button>
    </div>
  );
};

export default TabNavigation;