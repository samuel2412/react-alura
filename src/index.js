import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import AutorBox from './componentes/Autor/index'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/autor" component={AutorBox} />
                <Route path="/livro" />
            </Switch>
        </BrowserRouter>
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
