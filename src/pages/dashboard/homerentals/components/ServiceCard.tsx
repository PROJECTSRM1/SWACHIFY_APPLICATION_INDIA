import React from 'react';
import { Card, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import './ServiceCard.css';

interface Props {
  title: string;
  subtitle?: string;
  image: string;
  onBrowse?: () => void;
}

const ServiceCard: React.FC<Props> = ({ title, subtitle, image, onBrowse }) => {
  return (
    <Card
      hoverable
      className="service-card"
      cover={
        <div className="sc-image-wrap">
          <img src={image} className="sc-image" alt={title} />
        </div>
      }
      bodyStyle={{ padding: 20 }}
    >
      <div className="sc-body">
        <div>
          <h3 className="sc-title">{title}</h3>
          {subtitle && <div className="sc-sub muted">{subtitle}</div>}
        </div>
        <div className="sc-cta">
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<EyeOutlined />}
            onClick={onBrowse}
            className="browse-btn"           
          >
            Browse Properties
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
