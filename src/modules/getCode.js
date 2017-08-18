import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Code from './code';
import { requestData, backendUrl } from '../lib/util';

class GetCode extends Component {
    constructor (props) {
        super(props);

        this.state = { code: '' };
        this.confirmHandler = this.confirmHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    confirmHandler () {
        const state = this.state;

        if (state.code === '') {
            return alert('请输入验证码！');
        } else {
            this.props.onConfirm(state.code);
        }
    }

    handleChange (event) {
        const target = event.target;
        const name   = target.name;
        const value  = target.type === 'checkbox'
                        ? target.checked
                        : target.value.trim();
        this.setState({
            [name]: value
        });
    }

    render () {
        const props = this.props;
        const state = this.state;
        return (
            <div>
                <div className="u-cover"></div>
                <div className="m-getCode">
                    <div className="title"><span className="glyphicon glyphicon-tags"></span> 请输入验证码</div>
                    <div className="content">
                        <Code fullUrl={props.data.fullUrl} />
                        （tip: 点击图片可更换）
                        <div className="f-mb10">
                            <input name="code" value={state.code} onChange={this.handleChange} className="form-control" />
                        </div>
                        <button className="btn btn-block btn-info" onClick={this.confirmHandler}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default GetCode;