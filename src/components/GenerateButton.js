import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import './GenerateButton.css';

const GenerateButton = ({ onClick, isProcessing }) => {
  return (
    <div className="generate-button-container">
      <button
        onClick={onClick}
        disabled={isProcessing}
        className="generate-button"
      >
        {isProcessing ? (
          <span className="button-content">
            <Loader2 className="button-icon spinner" />
            Generating Your Virtual Try-On...
          </span>
        ) : (
          <span className="button-content">
            <Sparkles className="button-icon" />
            Generate Virtual Try-On
            <Sparkles className="button-icon" />
          </span>
        )}
      </button>
    </div>
  );
};

export default GenerateButton;