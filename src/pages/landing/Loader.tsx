import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./Loader.css";

interface LoaderProps {
  size?: "small" | "default" | "large";
  fullScreen?: boolean;
  message?: string;
  overlay?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = "large",
  fullScreen = false,
  message = "Loading...",
  overlay = false,
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size === "small" ? 24 : size === "large" ? 48 : 36 }} spin />;

  if (fullScreen) {
    return (
      <div className={`loader-fullscreen ${overlay ? "loader-overlay" : ""}`}>
        <div className="loader-content">
          <Spin indicator={antIcon} size={size} />
          {message && <p className="loader-message">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="loader-container">
      <Spin indicator={antIcon} size={size} />
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};

export default Loader;