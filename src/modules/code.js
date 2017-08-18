import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Code extends Component {
    constructor (props) {
        super(props);

        this.state = {
            imageSrc: ''
        };
        this.alterCode = this.alterCode.bind(this);
        this.fetchCode.call(this, this.props.fullUrl);
    }

    alterCode () {
        this.fetchCode(this.props.fullUrl+'?t='+Date.now());
    }

    fetchCode (fullUrl) {
        const url = 'backend/index.php?f=getImage';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'url='+encodeURIComponent(fullUrl),
            credentials: 'include'
        })
        .then(response => response.text())
        .then(imageData => {
            this.setState({
                imageSrc: 'data:image/gif;base64,'+imageData
            })
        })
        .catch(error => {
            console.error(error);
            alert('服务器错误！');
        });
    }

    render () {
        return (
            <div><img src={this.state.imageSrc} title="看不清？点击替换" onClick={this.alterCode} /></div>
        );
    }
}

export default Code;