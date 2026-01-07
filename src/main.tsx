// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { BrowserRouter } from "react-router-dom";
import { App as AntApp } from "antd";


import './index.css'
import '@ant-design/v5-patch-for-react-19';


createRoot(document.getElementById('root')!).render(
  <AntApp>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </AntApp>
)
