import React, {Component} from 'react'
import Banner from '../../components/movietheatre/subpage/Banner'
import '../../style/theatredetail.css'
import {getUnix, getShowTime,getToday} from '../../util/handleTime'
import {getFilmPrice} from '../../util/handlePrice'
import {getFilmTimeData} from '../../service/MovieService'

export default class TheatreDetail extends Component{
    constructor({location}){
        super();
        this.state = {
            film_time: [],
            filmId: '',
            time: getToday(),
            isActive: 1,
        }
        this.location = location;
        console.log(this.location);
    }
    render(){
        let {film_time,filmId,time,isActive} = this.state;
        return (     
            <div className='theatredetail'>
                <Banner data={this.location.state.id} passfilmId={this.getFilmId.bind(this)}/>
                <div className='film_time'>
                {
                    film_time.map((item,index)=>{
                        return(
                        item.id==filmId?(
                            <div key={index}>
                                <div className='t_nav swiper-container' ref="tab">
                                <ul className='swiper-wrapper'>
                                    <li onClick={this.tabAction.bind(this,getToday(),-1)} className='swiper-slide'>
                                        <a href='javascript:' className={isActive==1?'active':''}>{getToday()}</a> 
                                    </li>
                                {
                                    item.schedules.map((film,index)=>{
                                        return(
                                            film.time!=getToday()?(
                                            <li key={index} onClick={this.tabAction.bind(this,film.time,index)} className='swiper-slide'>
                                                <a href='javascript:' className={film.isActive==1?'active':''}>{film.time}</a>
                                            </li>):''
                                        )
                                    })
                                }    
                                </ul>
                                </div>
                                <ul className='t_list'>
                                {
                                    item.schedules.map((film,index)=>{
                                        return(   
                                            film.time==time?
                                            film.film.map((item,index)=>{
                                                return(
                                                    
                                                    <li key={index} className='one-bottom-px'>
                                                        <p>{getShowTime(item.showAt)}<span>￥{getFilmPrice(item.price.maizuo+item.price.premium)}</span></p>
                                                        <p>预计结束/{item.film.language}{item.imagery}/{item.hall.name}<s>￥{getFilmPrice(item.price.cinema)}</s></p>
                                                        <i className='iconfont icon-right'></i>
                                                    </li>
                                                )
                                            }):'' 
                                        )                             
                                    })
                                }    
                                </ul>                
                            </div>
                           ):''
                        )         
                    })

                }            
                </div>
            </div>          
        )
    }
    getFilmId(id){
        this.setState({filmId: id,time: getToday(),isActive: 1},()=>{
            this.tabSwiper = new Swiper(this.refs.tab,{
                slidesPerView: 3,
                slideToClickedSlide: true
            });
        });
    }
    tabAction(time,index){
        this.setState({time});
        if(index==-1){
            let film_time=this.state.film_time;
            film_time.map(item=>{
                if(item.id==this.state.filmId){
                    item.schedules.map(schedule=>{
                        schedule.isActive=0;
                    })
                }
            })
            this.setState({isActive:1,film_time})
        }else{
            let film_time=this.state.film_time;
            film_time.map(item=>{
                if(item.id==this.state.filmId){
                    item.schedules.map(schedule=>{
                        schedule.isActive=0;
                    })
                    item.schedules[index].isActive=1;
                }
            })
            this.setState({isActive:0,film_time})
        }

    }
    componentDidMount(){
        getFilmTimeData({
            __t:getUnix(),
            film:0,
            cinema:this.location.state.id
        }).then(result=>{
            console.log(result);
            this.setState({film_time: result},()=>{
                this.tabSwiper = new Swiper(this.refs.tab,{
                    slidesPerView: 3,
                    slideToClickedSlide: true
                });
            })
        }) 
    }
    componentWillUnmount(){
        
    }
}
