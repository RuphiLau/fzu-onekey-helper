import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/header.less';

function Header (props) {
    let key = 1;
    const license = props.license;
    const licenseList = license.map(each => {
        return (
            <p key={key}>{key++}. {each}</p>
        );
    });

    return (
        <header className="m-header">
            <div className="title">
                <span className="glyphicon glyphicon-menu-hamburger f-mr10"></span> 
                评议助手
            </div>
            <div className="m-banner"></div>
            <div className="g-wrap">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">使用规约</h3>
                    </div>
                    <div className="panel-body">
                        {licenseList}
                        <p className="bg-success notice">提示：请使用最新的Chrome浏览器访问本站，然后点击“验证账号”后再开始评议。<strong>如遇评议失败，请刷新页面重试</strong></p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;