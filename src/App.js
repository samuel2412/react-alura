import React, { Component } from 'react';
import AutorBox from './componentes/Autor/index';
import './css/pure-min.css';
import './css/side-menu.css';



export default class App extends Component {


    render() {
       
        return (
            <div id="layout">

                <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md" id="menuLink" className="menu-link">

                    <span></span>
                </a>

                <div id="menu">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md">Company</a>

                        <ul className="pure-menu-list">
                            <li className="pure-menu-item">
                                <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md" className="pure-menu-link">Home</a>
                            </li>

                            <li className="pure-menu-item">
                                <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md" className="pure-menu-link">Autor</a>
                            </li>

                            <li className="pure-menu-item">
                                <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md" className="pure-menu-link">Livro</a>
                            </li>

                        </ul>
                    </div>
                </div>

                <div id="main">
                    <div className="header">
                        <h1>Cadastro de Autores</h1>
                    </div>
                    <div className="content" id="content">
                      
                      <AutorBox/>
                       
                    </div>
                </div>
            </div>
        );
    }
}
