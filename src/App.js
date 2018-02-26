import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import 'pubsub-js'

import './style/app.css'

import Header from './common/Header'
import Sidebar from './common/Sidebar'
import Home from './pages/home/Home'
import Detail from './pages/home/Detail'
import Local from './pages/home/Local'
import Movie from './pages/movie/Movie'
import MovieTheatre from './pages/movietheatre/MovieTheatre'
import CinemaDetail from './pages/movietheatre/CinemaDetail'
import TheatreDetail from './pages/movietheatre/TheatreDetail'
import Shopping from './pages/shopping/Shopping'
import Mine from './pages/mine/Mine'
import Card from './pages/card/Card'

export default class App extends Component{
    constructor(){
        super();
        this.state = {
           isShow: false
        }
        this.pageRefresh = this.pageRefresh.bind(this);
        this.token = PubSub.subscribe('pass-refresh', (eventName, params)=>{
            console.log('监听pass-refresh');
            this.pageRefresh()
        })
    }
    render(){
        return( 
            <Router>
                <div>
                {/* 头部导航 */}
                <Header sidebarIsShow={this.handleisShow.bind(this)}/>
                <div className='page' ref='page'>
                    <div className='wrapper'>
                        {/* 重定向 */}
                        <Route exact path='/' render={()=>{
                            return <Redirect to='/home'/>
                        }}/>
                        <Route exact path='/film' render={()=>{
                            return <Redirect to='/movie'/>
                        }}/>
                        <Route path='/home' component={Home}/> 
                        <Route path='/movie' component={Movie}/>  
                        <Route path='/movietheatre' component={MovieTheatre}/> 
                        <Route path='/shopping' component={Shopping}/> 
                        <Route path='/mine' component={Mine}/> 
                        <Route path='/card' component={Card}/>
                        <Route path='/detail' component={Detail}/>
                        <Route path='/local' component={Local}/>
                        <Route path='/cinemadetail' component={CinemaDetail}/>
                        <Route path='/theatredetail' component={TheatreDetail}/>
                    </div>                
                </div>             
                {/* 侧边栏 */}
                {this.state.isShow?<Sidebar disappear={this.handleDisappear.bind(this)}/>:''}  
                </div>       
            </Router>          
        )
    }
    componentDidMount(){
        this.pageScroll = new IScroll(this.refs.page, {
            bounce: false, //弹簧效果        
            click: true, //打开点击事件          
            tap: true, //移动端的点击事件          
            mouseWheel: true, //支持鼠标滚轮事件          
            scrollbars: true, //滚动条          
            fadeScrollbars: true,//不滚动时滚动条淡出
        })
        this.pageScroll.on('scrollStart', this.pageRefresh);
        this.pageScroll.on('scrollEnd', ()=>{
            let maxScrollY = this.pageScroll.maxScrollY;
			let y = this.pageScroll.y;
            if(y<=maxScrollY+60){
                console.log('加载更多');
                PubSub.publish('load-movie-more');
            }
        })
    }
    handleisShow(){
        this.setState({isShow: true})
    }
    handleDisappear(){
        this.setState({isShow: false})
    }
    pageRefresh(){
        this.pageScroll.refresh();
        console.log('刷新滚动');
    }
    componentWillUnmount(){
        console.log('销毁')
        PubSub.unsubscribe(this.token);
    }
}
