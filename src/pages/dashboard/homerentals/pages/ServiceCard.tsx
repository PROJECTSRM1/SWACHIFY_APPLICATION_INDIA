import React from 'react';
import { Card, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import '../../../../index.css';

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
      className="sw-hr-service-card"
      cover={
        <div className="sw-hr-sc-image-wrap">
          <img src={image} className="sw-hr-sc-image" alt={title} />
        </div>
      }
      bodyStyle={{ padding: 20 }}
    >
      <div className="sw-hr-sc-body">
        <div>
          <h3 className="sw-hr-sc-title">{title}</h3>
          {subtitle && <div className="sw-hr-sc-sub sw-hr-muted">{subtitle}</div>}
        </div>
        <div className="sw-hr-sc-cta">
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<EyeOutlined />}
            onClick={onBrowse}
            className="sw-hr-browse-btn"           
          >
            Browse Properties
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;

