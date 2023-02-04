import React from 'react'
import ReactDOM from 'react-dom/client'
import {ConfigProvider, theme} from 'antd';
import './index.css'
import './assets/stylesheets/animation.css';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import Router from "./router/Router";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import SoundEffect from "./components/SoundEffect";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
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
                <SoundEffect />
                <Router />
            </ConfigProvider>
        </DndProvider>
    </Provider>,
)
