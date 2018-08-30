import React from 'react';
import './home.scss';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: ''
        };
    }

    render() {
        const {src} = this.state;

        return <div className={'home'}>
            <div className={'nav'}>
                <input name={'navRadio'} type={'radio'} id={'attr'}/><label for={'attr'} onClick={this.change.bind(this, '/attribute')}>attr</label>
                <input name={'navRadio'} type={'radio'} id={'cate'}/><label for={'cate'} onClick={this.change.bind(this, '/category')}>cate</label>
            </div>
            <div className={'content'}>
                <iframe src={src} sandbox={'allow-scripts'}></iframe>
            </div>
        </div>;
    }
    change(src) {
        this.setState({
            src
        });
    }


}
