import React, {Component} from 'react'
import {getBannerData} from '../../../service/HomeService'
import { getUnix } from '../../../util/handleTime'
export default class Home extends Component{
    constructor(){
        super();
        this.state = {
            imgPath: []
        }
    }
    render(){
        let {imgPath} = this.state;
        return (
            <div className="banner swiper-container" ref="banner">
                <div className="swiper-wrapper">
                    {
                        imgPath.map((item, index)=>{
                            return (
                                <div className="swiper-slide" ref="slide" key={index}>
                                    <img src={item.img}/>
                                </div>
                            )
                        })
                    }
                </div>  
            </div>
        )
    }
    componentDidMount(){
        getBannerData({__t:getUnix()}).then(result=>{        
            this.setState({imgPath: result},()=>{
                this.bannerSwiper = new Swiper(this.refs.banner,{
                    loop: true,
                    autoplay: 2000,
                    autoplayDisableOnInteraction : false
                }); 
            });       
        })
        
    }
    componentWillUnmount(){
        
    }
}
