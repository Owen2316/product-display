import React from 'react';
import Api from '../lib/Api';
import {List} from '../Component';
import '../Component/XSpinner';

export default class Attribute extends React.Component {
    constructor() {
        super();
        this.api = new Api();
        this.state = {
            loader: true,
            attributes: []
        };
    }

    async componentWillMount() {
        await this.getAttributes();
    }

    render() {
        const {loader, attributes} = this.state;

        return <div>{
            loader ? <x-spinner></x-spinner>
                : <List data={attributes} id={'id'} name={'name'}
                    onSave={this.saveAttribute.bind(this)}
                    onDelete={this.deleteAttribute.bind(this)}/>
        }</div>;
    }

    async saveAttribute(attribute) {
        this.setState({loader: true});
        if (attribute['id'] === null) {
            await this.api.post('/attributes/new', {...attribute});
        } else {
            await this.api.put(`/attributes/${attribute['id']}`, {...attribute});
        }

        await this.getAttributes();
    }
    async deleteAttribute(attribute) {
        this.setState({loader: true});
        if (attribute['id'] != null) {
            await this.api.delete(`/attributes/${attribute['id']}`);
        }
        await this.getAttributes();
    }

    async getAttributes() {
        const attributes = await this.api.fetch('/attributes', {method: 'get'});
        this.setState({
            loader: false,
            attributes
        });
    }
}
