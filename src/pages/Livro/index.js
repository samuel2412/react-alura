import React,{ Component } from 'react';
import PubSub from 'pubsub-js';
import api from '../../services/api';
import InputCustomizado from '../../componentes/InputCustomizado';
import ButtonCustomizado from '../../componentes/ButtonCustomizado';
import SelectCustomizado from '../../componentes/SelectCustomizado';

class FormularioLivro extends Component {
    constructor(){
        super();
        this.state = { titulo:'', preco:'', autorId:'' }
    }

    setTitulo(evento){
        this.setState({ titulo: evento.target.value });
    }
    
    setPreco(evento){
        this.setState({ preco: evento.target.value });
    }

    setAutorId(evento){
        console.log(evento.target);
        this.setState({ autorId: evento.target.value });
    }
    enviaForm = async (evento) => {
        evento.preventDefault();
        console.log(this.state);
        //<SelectCustomizado autores={this.props.autores} onChange={this.setAutorId}></SelectCustomizado>
    }

    render(){
        return(
            <div className="pure-form pure-form-aligned" >
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm.bind(this)} method="post">


                <InputCustomizado id="titulo" label="Titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo}></InputCustomizado>
                <InputCustomizado id="preco" label="Preco" type="number" name="preco" value={this.state.preco} onChange={this.setPreco}></InputCustomizado>
               
                    <SelectCustomizado autores={ this.props.autores } id={ this.state.autorId }></SelectCustomizado>
               
                
                

                <ButtonCustomizado type="submit" className="pure-button pure-button-primary" name="Gravar"></ButtonCustomizado>
            </form>

        </div>
        );
    }
}


export default class LivroBox extends Component {
    
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


    render(){
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de livros</h1>
                </div>
                <div>
                   <FormularioLivro autores={this.state.autores}/>
                </div>
            </div>
        );
    }
}