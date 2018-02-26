import React, {Component} from 'react'
import {getFilmDetail} from '../../service/HomeService'
import 'pubsub-js'
import { getUnix } from '../../util/handleTime'
export default class Detail extends Component{
    constructor({match, location, history}){
        super();
        this.state = {
            filmDetail: []
        }
        console.log(match, location, history);
        this.location = location;
    }
    render(){
        let {filmDetail} = this.state;
        return (
            <div className='detail'>
                <div className='film_img'>
                    <img src={filmDetail.img}/>
                </div>
                <div className='film_info'>
                    <h3><span></span>影片简介</h3>
                    <p><span>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演</span>：{filmDetail.director}</p>
                    <p className='pre'><span>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演</span>：{filmDetail.actors}</p>
                    <p><span>地区语言</span>：{filmDetail.nation}({filmDetail.language})</p>
                    <p><span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</span>：{filmDetail.category}</p>
                    <p><span>上映日期</span>：{filmDetail.time}上映</p>
                    <p>{filmDetail.synopsis}</p>
                </div>  
                <div className='buyBtn'><button>立即购票</button></div>
            </div>
        )
    }
    componentDidMount(){
        getFilmDetail(this.location.state.id, {__t:getUnix()}).then(result=>{
            this.setState({filmDetail: result},()=>{
                PubSub.publish('pass-refresh');
                PubSub.publish('pass-text', this.state.filmDetail.name);
            });
        })
    }
    componentWillUnmount(){
        
    }
}




