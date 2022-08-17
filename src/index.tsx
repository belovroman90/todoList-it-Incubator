import React from 'react';
import ReactDOM from 'react-dom/client';
import {AppWithReducers} from './AppWithReducers';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./state/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppWithReducers/>
        </Provider>
    </React.StrictMode>
);