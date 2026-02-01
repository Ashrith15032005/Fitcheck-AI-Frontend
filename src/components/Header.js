import React from 'react';
import { Sparkles, Heart, Share2 } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <Sparkles className="logo-icon" />
          </div>
          <div className="brand">
            <h1 className="brand-title">FitCheck AI</h1>
            <p className="brand-subtitle">Virtual Try-On Stylist</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="icon-button" aria-label="Favorites">
            <Heart className="icon" />
          </button>
          <button className="icon-button" aria-label="Share">
            <Share2 className="icon" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;