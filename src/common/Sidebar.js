import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import 'pubsub-js'
// import { CSSTransitionGroup } from 'react-transition-group'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Sidebar extends Component{
    constructor(){
        super();
        this.state = {
            sidebarData:[
                {href: '/home', title:'首页', text:'卖座电影'},
                {href: '/film', title:'影片', text:'卖座电影'},
                {href: '/movietheatre', title:'影院', text:'全部影院'},
                {href: '/shopping', title:'商城', text:'卖座商城'},
                {href: '/mine', title:'我的', text:'登录'},
                {href: '/card', title:'卖座卡', text:'查询/绑定/激活卖座卡'},
            ]
        }
    }
    render(){
        let {sidebarData} = this.state;
        return (
            <nav ref='nav' className='sidebar fadeIn' onClick={this.disappearAction.bind(this)}>
                {/* <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}> */}
                <ul ref='ul' className='appear'>
                {
                   sidebarData.map((sidebarItem, index)=>{
                       return (     
                            <li className='side' ref='li' key={index} onClick={this.sendAction.bind(this,index)}>
                                <NavLink to={sidebarItem.href}>
                                    <span>{sidebarItem.title}</span>
                                    <i className='iconfont icon-right'></i>
                                </NavLink>
                            </li>                          
                       )
                   }) 
                }
                </ul>
                {/* </ReactCSSTransitionGroup> */}
            </nav>
        )
    }
    disappearAction(){
        this.refs.ul.className = 'disappear';
        this.refs.nav.className += ' fadeOut';
        setTimeout(()=>{
            this.props.disappear();
        }, 500);        
    }
    sendAction(index){
        // console.log(index);
        PubSub.publish('pass-text', this.state.sidebarData[index].text);
    }
}