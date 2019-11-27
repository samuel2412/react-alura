import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import api from '../../services/api';
import InputCustomizado from '../../componentes/InputCustomizado';
import ButtonCustomizado from '../../componentes/ButtonCustomizado';
import TratadorErros from '../../TratadorErros';


class FormularioLivro extends Component {
    constructor() {
        super();
        this.state = { titulo: '', preco: '', autorId: '' }
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
    }

    setTitulo(evento) {
        this.setState({ titulo: evento.target.value });
    }

    setPreco(evento) {
        this.setState({ preco: evento.target.value });
    }

    setAutorId(evento) {
        console.log(evento.target.value);
        this.setState({ autorId: evento.target.value });
    }
    enviaForm = async (evento) => {
        evento.preventDefault();

        PubSub.publish("limpa-erros", {});

        api.post(`/livros`, { titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId })
            .then(response => {
                console.log('👉 Returned data:', response);
                PubSub.publish('nova-lista-livros', response.data);
                this.setState({ titulo: '', preco: '', autorId: '' });

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


                    <InputCustomizado id="titulo" label="Título" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo}></InputCustomizado>
                    <InputCustomizado step=".01" id="preco" label="Preço" type="number" name="preco" value={this.state.preco} onChange={this.setPreco}></InputCustomizado>

                    <div className="pure-control-group">
                        <label>Autor </label>
                        <select value={this.state.autorId} name="autorId" onChange={this.setAutorId}>
                            <option value="">Selecione</option>
                            {
                                this.props.autores.map(autor => (
                                    <option key={autor.id} value={autor.id}>
                                        {autor.nome}
                                    </option>
                                ))}
                            }
                    </select>
                    </div>



                    <ButtonCustomizado type="submit" className="pure-button pure-button-primary" name="Gravar"></ButtonCustomizado>
                </form>

            </div>
        );
    }
}

class ListaLivro extends Component {


    render() {
        console.log(this.props.livros)
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>


                        {this.props.livros.map(livro => (
                            <tr key={livro.id}>
                                <td>{livro.id}</td>
                                <td>{livro.titulo}</td>
                                <td>{livro.preco}</td>
                               <td>{livro.autor && livro.autor.nome ? livro.autor.nome : 'Não Informado' }</td>

                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        );
    }
}

export default class LivroBox extends Component {

    constructor() {
        super();
        this.state = { autores: [{}], livros: [{}] };
    }

    componentDidMount() {
        this.loadAutores();
        this.loadLivros();

        PubSub.subscribe('nova-lista-autores', function (topico, novaLista) {
            this.setState({ autores: novaLista })
        }.bind(this));
        PubSub.subscribe('nova-lista-livros', function (topico, novaLista) {
            this.setState({ livros: novaLista })
        }.bind(this));


    };

    loadAutores = async () => {
        const response = await api.get('/autores');

        this.setState({ autores: response.data });
    }
    loadLivros = async () => {
        const response = await api.get('/livros');
        //console.log(response.data)
        this.setState({ livros: response.data });
    }


    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de livros</h1>
                </div>
                <div>
                    <FormularioLivro autores={this.state.autores} />
                    <ListaLivro livros={this.state.livros} />
                </div>
            </div>
        );
    }
}