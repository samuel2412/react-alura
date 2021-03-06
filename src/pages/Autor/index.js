import React, { Component } from 'react';
import api from '../../services/api';
import PubSub from 'pubsub-js';
import InputCustomizado from '../../componentes/InputCustomizado/index';
import ButtonCustomizado from '../../componentes/ButtonCustomizado/index';
import TratadorErros from '../../TratadorErros';
import '../../css/pure-min.css';
import '../../css/side-menu.css'

class FormularioAutor extends Component {

    constructor() {
        super();
        this.state = { nome: '', email: '', senha: '' };
        this.enviaForm = this.enviaForm.bind(this);

    }
    salvaAlteracao(nomeInput,evento){
        var campoSendoAlterado = [];
        campoSendoAlterado[nomeInput] = evento.target.value;
        this.setState(campoSendoAlterado);
      }

    enviaForm = async (evento) => {
        evento.preventDefault();

        PubSub.publish("limpa-erros", {});

        api.post(`/autores`, { nome: this.state.nome, email: this.state.email, senha: this.state.senha })
            .then(response => {
                console.log('👉 Returned data:', response);
                PubSub.publish('nova-lista-autores', response.data);
                this.setState({ nome: '', email: '', senha: '' });

            })
            .catch(error => {
                console.log(`😱 Axios request failed: ${error.response}`);
                console.log(error.response.data.errors)
                new TratadorErros().publicaErros(error.response.data.errors);
            });

    }

    render() {
        return (
            <div className="pure-form pure-form-aligned" >
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">


                    <InputCustomizado id="nome" label="Nome" type="text" name="nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this,'nome')}></InputCustomizado>
                    <InputCustomizado id="email" label="Email" type="email" name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this,'email')}></InputCustomizado>
                    <InputCustomizado id="senha" label="Senha" type="password" name="senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this,'senha')}></InputCustomizado>

                    <ButtonCustomizado type="submit" className="pure-button pure-button-primary" name="Gravar"></ButtonCustomizado>
                </form>

            </div>
        );
    }
}

class ListaAutores extends Component {

    constructor() {
        super();
        this.state = { autores: [{}] };
    }

    componentDidMount() {
        this.loadAutores();

        PubSub.subscribe('nova-lista-autores', function (topico, novaLista) {
            this.setState({ autores: novaLista })
        }.bind(this));
    };

    loadAutores = async () => {
        const response = await api.get('/autores');

        this.setState({ autores: response.data });
    }


    render() {
        return (
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


                        {this.state.autores.map(autor => (
                            <tr key={autor.id}>
                                <td >{autor.id}</td>
                                <td>{autor.nome}</td>
                                <td>{autor.email}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        );
    }
}

export default class AutorBox extends Component {

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de autores</h1>
                </div>
                <div>
                    <FormularioAutor />
                    <ListaAutores />
                </div>
            </div>
        );
    }
}