import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import 'pubsub-js'
export default class Sidebar extends Component{
    constructor(){
        super();
        this.state = {
            text: '卖座电影'
        }
        this.token = PubSub.subscribe('pass-text', (eventName, params)=>{
            console.log('监听header')
            this.setState({text: params});
        })
    }
    render(){
        let {text} = this.state;
        return (
            <nav className='nav'>
                <ul className='clearfix'>
                    <li onClick={this.loginAction.bind(this)}>
                        <NavLink className='mine' to='/mine'>
                            <i className='iconfont icon-user'></i>
                        </NavLink>
                    </li>
                    <li onClick={this.localAction.bind(this)}>
                        <NavLink className='location' to='/local'>
                            <span>深圳</span>
                            <i className='iconfont icon-down'></i>
                        </NavLink>
                    </li>        
                    <li className='clearfix' onClick={this.isShowAction.bind(this)}>
                        <i className="iconfont icon-menu"></i>
                        <span>{text}</span>
                    </li>
                </ul>
            </nav>
        )
    }
    isShowAction(){
        this.props.sidebarIsShow();
    }
    loginAction(){
        this.setState({text: '登录'});
    }
    localAction(){
        this.setState({text: '选择城市'});
    }
    componentWillUnmount(){
        console.log('销毁header')
        PubSub.unsubscribe(this.token);
    }
}