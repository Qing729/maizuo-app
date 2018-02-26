import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import {getMovieData} from '../../../service/MovieService'

export default class Playing extends Component{
    constructor(){
        super();
        this.state = {
            count: 7,
            page: 1,
            playingData: []
        }
        this.token = PubSub.subscribe('load-movie-more', ()=>{
            console.log('playing监听load-movie-more');
            this.setState({page: this.state.page+1})
            this.requestData();
        })
    }
    render(){
        let {playingData} = this.state;
        return (
            <div className='playList'>
                <ul className='film'>
                    {
                        playingData.map((film,index)=>{
                            return(
                                <Link  key={index} to={{
                                    pathname:'/detail',
                                    state:{
                                        id: film.id
                                    }
                                }}>
                                <li className='one-bottom-px'>
                                    <img src={film.img}/>
                                    <div>
                                        <h4>
                                            {film.name}
                                            <span>{film.grade}</span>
                                            <i className='iconfont icon-right'></i>
                                        </h4>
                                        <p>{film.intro}</p>
                                        <p>
                                            <span><b>{film.cinemaCount}</b>家影院上映</span>
                                            <span><b>{film.watchCount}</b>人购票</span>
                                        </p>                    
                                    </div>
                                </li>
                                </Link>
                            )
                        })
                    }
                    
                </ul>
            </div>
        )
    }
    requestData(){
        let {playingData, page, count} = this.state;
        getMovieData({page, count}).then(result=>{              
            console.log(result);
            this.setState({playingData: playingData.concat(result)});
            PubSub.publish('pass-refresh');     
        })
    }
    componentDidMount(){
        this.requestData();
        
    }
    componentWillUnmount(){
        console.log('销毁playing')
        console.log(this.token);
       PubSub.unsubscribe(this.token);
    }
}