import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { XmplProvider } from 'xmpl-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
var xmpcfg = {
    access: {
        accessToken: '841fba0a-ef98-4f9c-87b2-cfb7bb2026b6_c96a2e52-cd3a-4633-9cc8-5d7e1c32a428_60d7fac0d0d74b698441a02137140065',
        url: 'https://marketingx.xmpie.net/XMPieXMPL_REST_API',
        circleProjectID:'c96a2e52-cd3a-4633-9cc8-5d7e1c32a428',
        circleProjectName: 'XMPL Sample 5.0'
    }
};
root.render(
    <React.StrictMode>
        <XmplProvider xmpcfg={xmpcfg}>
            <App/>
        </XmplProvider>
    </React.StrictMode>
);
