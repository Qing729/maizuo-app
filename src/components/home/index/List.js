import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getBannerData,getHotMovieData,getUpcomMovieData} from '../../../service/HomeService'
import { getUnix } from '../../../util/handleTime'
export default class Home extends Component{
    constructor(){
        super();
        this.state = {
            listData: [],
            listcomData: []
        }
    }
    render(){
        let {listData,listcomData} = this.state;
        return (   
            <div className="list">
                <div className="hotmovie">
                    <ul>
                    {
                       listData.map((item,index)=>{
                        return(
                            <Link  key={index} to={{
                                pathname:'/detail',
                                state:{
                                    id: item.id
                                }
                            }}>
                            <li>
                                <img src={item.img} />
                                <div>
                                <h4>{item.name}</h4>
                                <p>{item.cinemaCount}家影院上映&nbsp;{item.watchCount}人购票</p>
                                <span>{item.grade}</span>
                                </div>
                            </li>
                            </Link>
                        )
                       }) 
                    }             
                    </ul> 
                    <Link to={{
                        pathname:'/movie',
                        state:{
                            flag: 'playing'
                        }
                    }}>
                    <div className='more-button'>更多热映电影</div>
                    </Link>
                    </div>
                 
                <div className="soonmovie one-top-px">
                    <span>即将上映</span>
                    <ul>
                    {
                       listcomData.map((item,index)=>{
                        return(
                            <Link key={index} to={{
                                pathname:'/detail',
                                state:{
                                    id: item.id
                                }
                            }}>
                            <li>
                                <img src={item.img} />
                                <div>
                                <h4>{item.name}</h4>
                                <span>{item.time}上映</span>
                                </div>
                            </li>
                            </Link>
                        )
                       }) 
                    }             
                    </ul> 
                    <Link to={{
                        pathname:'/movie',
                        state:{
                            flag: 'soon'
                        }
                    }}>
                    <div className='more-button'>更多即将上映电影</div>
                    </Link>
                </div>
            </div>   
        )
    }
    componentDidMount(){
        getHotMovieData({
            __t:getUnix(),
            page:1,
            count:5
        }).then(result=>{              
            this.setState({listData: result});
        })
        getUpcomMovieData({
            __t:getUnix(),
            page:1,
            count:3
        }).then(result=>{              
            console.log(result);
            this.setState({listcomData: result});
        })
    }
    componentWillUnmount(){
        
    }
}
