import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {getMovieTheatreData} from '../../service/MovieService'
import '../../style/movietheatre.css'
import { getUnix } from '../../util/handleTime'
export default class MovieTheatre extends Component{
    constructor(){
        super();
        this.state = {
            theatreData: []
        }
    }
    render(){
        let {theatreData, isShow} = this.state;
        return (
            <div className='cinema'>
                {
                    theatreData.map((item, index)=>{
                        return(
                            <div className='theatre' key={index}> 
                                <h4 className='one-bottom-px' onClick={this.btnAction.bind(this, index)}>{item.name}</h4>
                               {item.flag?<ul>
                                    {
                                        item.info.map((info,index)=>{
                                            return(
                                                <Link  key={index} to={{
                                                    pathname:'/cinemadetail',
                                                    state:{
                                                        id: info.id,
                                                        isLabels: info.labels.length>0
                                                    }
                                                }}>
                                                <li className='one-bottom-px'>
                                                <h5><span>{info.name}</span><i className='iconfont icon-right'></i></h5>
                                            {info.labels.length>0?<p className='labels'><span>可乐爆米花</span></p>:''}
                                                <p>{info.address}</p>
                                                <p>距离未知</p>
                                                </li>
                                                </Link>
                                            )
                                        })                                     
                                      }                                
                                </ul>:''
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    btnAction(index){
        let theatreData = this.state.theatreData;
        if(theatreData[index].flag==true){
            theatreData[index].flag=false;
        }else{
            theatreData.map(item=>{
                item.flag=false;
            })
            theatreData[index].flag=!theatreData[index].flag;
        }
        this.setState({theatreData});
        PubSub.publish('pass-refresh');
    }
    componentDidMount(){
        getMovieTheatreData({__t:getUnix()}).then(data=>{
            data[0].flag=true;
            let result=data;
            this.setState({theatreData: result})
        })
    }
    componentWillUnmount(){
        
    }

    testAction(){
       
    }
}
