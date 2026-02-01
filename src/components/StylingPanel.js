import React from 'react';
import { Wand2, ShoppingBag } from 'lucide-react';
import './StylingPanel.css';

const StylingPanel = ({ analysis }) => {
  return (
    <div className="styling-panel">
      {/* Styling Tips */}
      <div className="panel-card">
        <h3 className="panel-title">
          <Wand2 className="panel-icon" />
          Styling Tips
        </h3>
        <ul className="tips-list">
          {analysis.stylingTips?.map((tip, idx) => (
            <li key={idx} className="tip-item">
              <span className="tip-number">{idx + 1}</span>
              <span className="tip-text">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Complementary Items */}
      <div className="panel-card">
        <h3 className="panel-title">
          <ShoppingBag className="panel-icon" />
          Complete The Look
        </h3>
        <div className="items-list">
          {analysis.complementaryItems?.map((item, idx) => (
            <div key={idx} className="item-card">
              <p className="item-text">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Occasions */}
      <div className="panel-card">
        <h3 className="panel-title">Perfect For</h3>
        <div className="occasions-list">
          {analysis.occasions?.map((occasion, idx) => (
            <span key={idx} className="occasion-tag">
              {occasion}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StylingPanel;