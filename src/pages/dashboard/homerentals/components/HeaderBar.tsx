import React from 'react';
import { Layout } from 'antd';
import './HeaderBar.css';

const { Header } = Layout;

interface HeaderBarProps {
  onNavigateHome?: () => void;
  onShowProperties?: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onNavigateHome, onShowProperties }) => {
  const handleHomeClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePropertiesClick = () => {
    if (onShowProperties) {
      onShowProperties();
    }
  };

  return (
    <Header className="header-bar">
      <div className="header-content">
        <div className="header-logo" onClick={handleHomeClick}>
          <span className="logo-icon">🏠</span>
          <span className="logo-text">Property Rental</span>
        </div>
        <nav className="header-nav">
          <span className="nav-link" onClick={handleHomeClick}>
            Home
          </span>
          <span className="nav-link" onClick={handlePropertiesClick}>
            Properties
          </span>
        </nav>
      </div>
    </Header>
  );
};

export default HeaderBar;



