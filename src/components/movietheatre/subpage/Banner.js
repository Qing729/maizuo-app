import React, {Component} from 'react'
import {getCinemaBannerData} from '../../../service/MovieService'
import { getUnix } from '../../../util/handleTime'
export default class Banner extends Component{
    constructor(){
        super();
        this.state = {
            imgPath: []
        }
    }
    render(){
        let {imgPath} = this.state;
        return (
            <div className="cinema_banner swiper-container" ref="cinema_banner">
                <div className="swiper-wrapper">
                    {
                        imgPath.map((item, index)=>{
                            return (
                                <div className="swiper-slide" ref="slide" key={index} onClick={this.selectFilmAct.bind(this,item.id)}>
                                    <img src={item.img}/>
                                    <p>{item.name}</p>
                                </div>
                            )
                        })
                    }
                </div>  
            </div>
        )
    }
    selectFilmAct(filmId){
        this.setState({filmId});
        this.props.passfilmId(filmId);
    }
    componentDidMount(){
        getCinemaBannerData(this.props.data,{__t:getUnix()}).then(result=>{        
            this.setState({imgPath: result},()=>{
                if(result.length>0){
                    this.props.passfilmId(result[0].id);
                } 
                this.bannerSwiper = new Swiper(this.refs.cinema_banner,{
                    centeredSlides : true,
                    slidesPerView: 4,
                    slideToClickedSlide: true
                });
            });       
        })
         
    }
    componentWillUnmount(){
        
    }
}

