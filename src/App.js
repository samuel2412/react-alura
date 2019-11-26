import React, { Component } from 'react';
import api from './services/api';
import InputCustomizado from './componentes/InputCustomizado/index';
import ButtonCustomizado from './componentes/ButtonCustomizado/index';
import './css/pure-min.css';
import './css/side-menu.css';



export default class App extends Component {

    constructor() {
        super();
        this.state = { autores: [{}], nome: '', email: '', senha: '' };
        //this.enviaForm = this.enviaForm.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);

    }

    setNome(evento) {
        this.setState({ nome: evento.target.value });
    }
    setEmail(evento) {
        this.setState({ email: evento.target.value });
    }
    setSenha(evento) {
        this.setState({ senha: evento.target.value });
    }


    componentDidMount() {
        this.loadAutores();
    };

    enviaForm(evento) {
        evento.preventDefault();
        const teste = { nome: this.state.nome, email: this.state.email, senha: this.state.senha };
        console.log(teste);
        api.post(`/autores`, { nome: this.state.nome, email: this.state.email, senha: this.state.senha })
            .then(res => {
                this.setState({ autores: res.data });
                console.log(res);
                console.log(res.data);
            })
    }

    loadAutores = async () => {
        const response = await api.get('/autores');


        this.setState({ autores: response.data });

    }


    render() {
        const { autores } = this.state;

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
                        <div className="pure-form pure-form-aligned">
                            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">


                                <InputCustomizado id="nome" label="Nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome}></InputCustomizado>
                                <InputCustomizado id="email" label="Email" type="email" name="nome" value={this.state.email} onChange={this.setEmail}></InputCustomizado>
                                <InputCustomizado id="senha" label="Senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha}></InputCustomizado>

                                <ButtonCustomizado type="submit" className="pure-button pure-button-primary" name="Gravar"></ButtonCustomizado>
                            </form>

                        </div>
                        <div>
                            <table className="pure-table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Nome</th>
                                        <th>email</th>
                                    </tr>
                                </thead>
                                <tbody>


                                    {autores.map(autor => (
                                        <tr key={autor.id}>
                                            <td>{autor.id}</td>
                                            <td>{autor.nome}</td>
                                            <td>{autor.email}</td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
