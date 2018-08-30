import React from 'react';
import Api from '../lib/Api';
import {List} from '../Component';

import '../Component/XSpinner';

export default class Category extends React.Component {
    constructor() {
        super();
        this.api = new Api();
        this.state = {
            loader: true,
            categories: []
        };
    }

    async componentWillMount() {
        await this.getCategoies();
    }

    render() {
        const {loader, categories} = this.state;

        return <div>{
            loader ? <x-spinner></x-spinner>
                : <List data={categories} id={'id'} name={'name'}
                    onSave={this.saveCategory.bind(this)}
                    onDelete={this.deleteCategory.bind(this)}/>
        }</div>;
    }

    async saveCategory(category) {
        this.setState({loader: true});
        if (category['id'] === null) {
            await this.api.post('/categories/new', {...category});
        } else {
            await this.api.put(`/categories/${category['id']}`, {...category});
        }

        await this.getCategoies();
    }
    async deleteCategory(category) {
        this.setState({loader: true});
        if (category['id'] != null) {
            await this.api.delete(`/categories/${category['id']}`);
        }
        await this.getCategoies();
    }

    async getCategoies() {
        const categories = await this.api.fetch('/categories', {method: 'get'});
        this.setState({
            loader: false,
            categories
        });
    }
}
