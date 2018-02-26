import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getMovieSoonData} from '../../../service/MovieService'

export default class Soon extends Component{
    constructor(){
        super();
        this.state = {
            count: 7,
            page: 1,
            soonData: []
        }
        this.token = PubSub.subscribe('load-movie-more', ()=>{
            console.log('soon监听load-movie-more');
            this.setState({page: this.state.page+1})
            this.requestData();
        })
    }
    render(){
        let {soonData} = this.state;
            return (
            <div className='soonList'>
                <ul className='film'>
                    {
                        soonData.map((film,index)=>{
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
                                            <i className='iconfont icon-right'></i>
                                        </h4>
                                        <p>{film.intro}</p>
                                        <p>
                                            <span>{film.date}上映</span>
                                            <span>{film.week}</span>
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
        let {soonData, page, count} = this.state;
        getMovieSoonData({page, count}).then(result=>{
            this.setState({soonData: soonData.concat(result)});
            PubSub.publish('pass-refresh');              
        })
    }
    componentDidMount(){
        this.requestData()
    }
    componentWillUnmount(){
        console.log('销毁soon')
        console.log(this.token);
       PubSub.unsubscribe(this.token);
    }
}