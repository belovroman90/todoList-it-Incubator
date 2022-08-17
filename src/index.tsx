import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWithReducers from './AppWithReducers';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <AppWithReducers/>
    </React.StrictMode>
);