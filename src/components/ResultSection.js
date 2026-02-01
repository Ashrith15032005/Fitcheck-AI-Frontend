import React from 'react';
import VirtualTryOnDisplay from './VirtualTryOnDisplay';
import StylingPanel from './StylingPanel';
import './ResultSection.css';

const ResultSection = ({ result }) => {
  return (
    <div className="result-section">
      <VirtualTryOnDisplay result={result} />
      <StylingPanel analysis={result.analysis} />
    </div>
  );
};

export default ResultSection;