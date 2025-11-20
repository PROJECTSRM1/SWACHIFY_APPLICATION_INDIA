// src/pages/landing/LandingPackes.tsx
import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { CheckCircleOutlined, TruckOutlined, SafetyCertificateOutlined, DollarOutlined } from '@ant-design/icons';
import './LandingPackers.css';  // Correct CSS file path
import heroPackes from '../../assets/landingimages/hero.jpg';  // Correct image path

const services = [
  {
    icon: <TruckOutlined style={{ fontSize: 30, color: '#1677ff' }} />,
    title: 'Local & Long-Distance Moving',
    desc: 'Reliable transportation services ensuring safe relocations.',
  },
  {
    icon: <CheckCircleOutlined style={{ fontSize: 30, color: '#00aa33' }} />,
    title: 'Packing & Unpacking',
    desc: 'Professional packing with premium quality materials.',
  },
  {
    icon: <SafetyCertificateOutlined style={{ fontSize: 30, color: '#ff7a00' }} />,
    title: 'Insurance Coverage',
    desc: 'Fully insured service for your peace of mind.',
  },
  {
    icon: <DollarOutlined style={{ fontSize: 30, color: '#8b00ff' }} />,
    title: 'Affordable Pricing',
    desc: 'Best value moving services at competitive rates.',
  },
];

const LandingPackes: React.FC = () => {
  return (
    <div className="packes-container">
      {/* HERO SECTION */}
      <section className="packes-hero" style={{ backgroundImage: `url(${heroPackes})` }}>
        <div className="hero-overlay">
          <h1>Stress-Free Relocation Services</h1>
          <p>From packing to delivery, we make moving seamless and efficient.</p>
          <Button type="primary" size="large">
            Book Now
          </Button>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="packes-services">
        <h2>Our Packers & Movers Services</h2>
        <p>Your trusted relocation partner across cities and states.</p>

        <Row gutter={[24, 24]} justify="center">
          {services.map((item, i) => (
            <Col xs={24} sm={12} md={8} lg={6} key={i}>
              <Card className="packes-card" hoverable>
                <div className="packes-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* CTA SECTION */}
      <section className="packes-cta">
        <h2>Ready to Move?</h2>
        <p>Get a quote today and relocate without any hassle.</p>
        <Button type="primary" size="large">
          Get Instant Quote
        </Button>
      </section>
    </div>
  );
};

export default LandingPackes;  // Ensure you use default export
