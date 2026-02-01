import React from 'react';
import { Download, Share2, Sparkles } from 'lucide-react';
import './VirtualTryOnDisplay.css';

const VirtualTryOnDisplay = ({ result }) => {
  return (
    <div className="tryon-display">
      <div className="tryon-header">
        <h2 className="tryon-title">Your Virtual Try-On</h2>
        <div className="tryon-actions">
          <button className="action-button" aria-label="Download">
            <Download className="action-icon" />
          </button>
          <button className="action-button" aria-label="Share">
            <Share2 className="action-icon" />
          </button>
        </div>
      </div>
      
      <div className="tryon-image-container">
        <img src={result.image} alt="Try-on result" className="tryon-image" />
        <div className="confidence-badge">
          <Sparkles className="confidence-icon" />
          <span className="confidence-score">
            {result.analysis.confidence}/10 Match
          </span>
        </div>
      </div>

      <div className="fit-analysis">
        <h3 className="analysis-title">Fit Analysis</h3>
        <p className="analysis-text">{result.analysis.fitAnalysis}</p>
      </div>
    </div>
  );
};

export default VirtualTryOnDisplay;