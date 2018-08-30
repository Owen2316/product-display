import './list.scss';
import React from 'react';
export default class List extends React.Component {
    constructor(props) {
        super(props);
        const {data = []} = this.props;
        this.state = {
            data
        };
    }
    render() {
        const {name, onSave, onDelete} = this.props;
        const {data} = this.state;
        const values = data.map((item, index) => {
            const readOnly = <span onDoubleClick={this.modify.bind(this, index)}>{item[name]}</span>;
            const writeable = <input placeholder={'Name'} value={item[name]}
                autoFocus={'autofocus'}
                onChange={this.changeValue.bind(this, index)}
                onBlur={this.onSave.bind(this, index)}/>;

            return <div key={index}>
                {onSave && item['modify'] ? writeable : readOnly}
                {onDelete ? <button onClick={this.onDelete.bind(this, index)} >delete</button> : ''}
            </div>;
        });
        const add = <div onClick={this.onAdd.bind(this)}>Add</div>;

        return <div className={'list'}>{values}{add}</div>;
    }

    onDelete(index) {
        const {id, onDelete} = this.props;
        const {data} = this.state;
        if (data[index][id] === null) {
            data.splice(index, 1);
            this.setState({data});
        } else {
            onDelete(data[index]);
        }
    }
    onSave(index) {
        const {onSave} = this.props;
        const {data} = this.state;
        onSave(data[index]);
    }
    onAdd() {
        const {id, name} = this.props;
        const {data} = this.state;
        data.push({[id]: null, [name]: '', modify: true});
        this.setState({data});
    }

    modify(index) {
        const {data} = this.state;
        data[index]['modify'] = true;
        this.setState({
            data
        });
    }
    changeValue(index, e) {
        const {name} = this.props;
        const {data} = this.state;
        const v = e.target.value;
        data[index][name] = v;
        this.setState({data});
    }
}
