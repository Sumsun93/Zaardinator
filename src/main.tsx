import React from 'react'
import ReactDOM from 'react-dom/client'
import {ConfigProvider, theme} from 'antd';
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ConfigProvider
        theme={{
            algorithm: theme.darkAlgorithm,
            token: {
                colorPrimary: '#FFF',
                colorPrimaryActive: '#FFF',
                colorPrimaryBorder: '#FFF',
                colorPrimaryBorderHover: '#FFF',
                colorBorder: '#FFF',

                fontFamily: 'Poppins, sans-serif',
            },
        }}
    >
        <App />
    </ConfigProvider>,
)
