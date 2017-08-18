import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GetCode from './getCode';
import { requestData, backendUrl } from '../lib/util.js';

class Userform extends Component {
    constructor (props) {
        super(props);

        this.pIndex = 0;
        this.teachersList = [];
        this.state = {
            stuNum: '',
            stuPwd: '',
            useFor: 'xqxk',
            result: [],
            winData: {},
            showWin: false,
            showRes: false,
            processing: false,
            checkButtonText: '验证账号',
            checkButtonDisable: false,
            startButtonText: '开始验证',
            startButtonDisable: true
        }
        this.hideRes = this.hideRes.bind(this);
        this.checkAccount = this.checkAccount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.startProcess = this.startProcess.bind(this);
        this.onGetCodeConfirm = this.onGetCodeConfirm.bind(this);
    }

    hideRes () {
        this.setState({
            showRes: false
        });
    }

    checkAccount () {
        let isValid = true;
        const state = this.state;
        const checkMap = [
            {name: 'stuNum', error: '请输入学号！'},
            {name: 'stuPwd', error: '请输入密码！'}
        ];

        for (let item of checkMap) {
            let { name, error } = item;
            if (state[name] === '') {
                alert(error);
                isValid = false;
                break;
            }
        }
        if (!isValid) return;

        this.setState({
            checkButtonText: '验证中..',
            checkButtonDisable: true
        });

        fetch(backendUrl('index.php?f=saveUserInfo'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: requestData({
                sn: state.stuNum,
                pw: state.stuPwd
            }),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(jsonData => {
            this.setState({
                checkButtonText: '重新验证',
                checkButtonDisable: false,
                startButtonDisable: false
            });
            alert(jsonData.message);
        })
        .catch(error => {
            console.error(error);
            alert('服务器错误！');
        });
    }

    startProcess () {
        const url = backendUrl('index.php?f=fetchList&type='+this.state.useFor);
        
        this.setState({
            result: [],
            processing: true,
            startButtonText: '获取验证码中',
            startButtonDisable: true
        });
        fetch(url, {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(this.cbGetList.bind(this))
        .catch(error => {
            console.error(error);
            this.setState({
                startButtonText: '开始评议',
                startButtonDisable: false
            });
            alert('服务器错误！');
        });
    }

    cbGetList (jsonData) {
        if (jsonData.length) {
            for (let each of jsonData) {
                this.teachersList.push({
                    fullUrl: each.fullUrl,
                    teacherName: each.teacherName
                });
            }
            this.setState({
                showWin: true,
                winData: this.teachersList[this.pIndex],
            });
        } else {
            alert("该用途下的教师已全部评议完毕！");
        }
        this.setState({
            startButtonText: '开始评议',
            startButtonDisable: false
        });
    }
    
    onGetCodeConfirm (code) {
        const state = this.state;
        const { fullUrl } = this.teachersList[0];
        this.setState({
            showWin: false,
            showRes: true
        });
        this.processList.call(this, fullUrl, code);
    }

    processList (fullUrl, code) {
        const teachersList = this.teachersList;
        const { teacherName } = teachersList[this.pIndex];

        fetch(backendUrl('index.php?f=doProcess'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: requestData({
                url: fullUrl,
                code: code
            }),
            credentials: 'include'
        })
        .then(response => response.json())
        .then(result => {
            this.setState({
                result: [
                    `对${teacherName}老师评议${result.status ? '成功' : '失败'}！`,
                    ...this.state.result
                ]
            });
            if (++this.pIndex < teachersList.length) {
                const { fullUrl: nextTickUrl } = teachersList[this.pIndex];
                this.processList(nextTickUrl, code);
            } else {
                this.setState({
                    processing: false
                });
            }
        }).catch(error => {
            console.error(error);
            alert('服务器错误！');
        });
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
        const state = this.state;
        const resultList = state.result.map(each => (
            <p>{each}</p>
        ));

        return (
            <div>
            {state.showWin && (<GetCode onConfirm={this.onGetCodeConfirm} data={state.winData} />)}
            {state.showRes && (
                <div>
                    <div className="u-cover"></div>
                    <div className="m-resultList">
                        <div className="title">
                            <span onClick={this.hideRes} className="glyphicon glyphicon-remove pull-right close"></span>
                            评议结果
                        </div>
                        <div className="content">
                            {state.processing && (
                                <div className="m-loading"><span className="glyphicon glyphicon-refresh"></span></div>
                            )}
                            {resultList}
                        </div>
                    </div>
                </div>
            )}
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">评议助手</h3>
                </div>
                <div className="panel-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-3 control-label">学号</label>
                            <div className="col-sm-6">
                                <input name="stuNum" type="text" maxLength="9" value={state.stuNum} onChange={this.handleChange} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">密码</label>
                            <div className="col-sm-6">
                                <input name="stuPwd" type="password" value={state.stuPwd} onChange={this.handleChange} className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">评议用途</label>
                            <div className="col-sm-6">
                                <select name="useFor" value={this.useFor} onChange={this.handleChange} className="form-control">
                                    <option value="xqxk">选课</option>
                                    <option value="score">查成绩</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-6">
                                <button type="button" className="btn btn-block btn-warning" disabled={state.checkButtonDisable} onClick={this.checkAccount}>{state.checkButtonText}</button>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-6">
                                <button type="button" className="btn btn-block btn-warning" disabled={state.startButtonDisable} onClick={this.startProcess}>{state.startButtonText}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

export default Userform;