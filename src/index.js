import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import AutorBox from './pages/Autor/index'
import Home from './pages/Home/index'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    (
        <BrowserRouter>
            <Switch>
                <App>
                    <Route exact path="/" component={ Home } /> 
                    <Route path="/autor" component={ AutorBox } />
                    <Route path="/livro" />
                </App>
            </Switch>
        </BrowserRouter>
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
