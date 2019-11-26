import React, { Component } from 'react';

export default class SelectCustomizado extends Component {

    constructor() {
        super();
        this.state = { autorId: '' };
    }

    /* <select value={this.state.autorId} name="autorId" onChange={this.setAutorId}>
     <option value="">Selecione</option>
     {
         this.props.autores.map(function (autor) {
             return <option key={autor.id} value={autor.id}>
                 {autor.nome}
             </option>;
         })
     }
 </select>*/

    render() {
        return (
            <div className="pure-control-group">

                <select value={this.state.autorId} name="autorId" onChange={this.props.onChange}>


                    <option value="">Selecione</option>

                    {this.props.autores && this.props.autores.map(autor => (
                        <option key={autor.id} value={autor.id}>
                            {autor.nome}
                        </option>
                    ))}

                </select>
            </div>


        );
    }
}