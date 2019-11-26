import React, { Component } from 'react';

export default class ButtonCustomizado extends Component {

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <button type={this.props.type} className={this.props.className}>{this.props.name}</button>
            </div>
        );
    }
}