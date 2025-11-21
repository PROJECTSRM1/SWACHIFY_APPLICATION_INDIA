import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import './HeaderBar.css';

const { Header } = Layout;

const HeaderBarforrental: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Header className="header-bar">
      <div className="header-content">
        {/* <div className="header-logo" onClick={() => navigate('/')}>
          <span className="logo-icon">🏠</span>
          <span className="logo-text">Property Rental</span>
        </div> */}
        {/* <nav className="header-nav">
          <span className="nav-link" onClick={() => navigate('/')}>
            Home
          </span>
          <span className="nav-link" onClick={() => navigate('/property-types')}>
            Properties
          </span>
        </nav> */}
      </div>
    </Header>
  );
};

export default HeaderBarforrental;



