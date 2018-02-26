import React, {Component} from 'react'
import '../../style/shopping.css'
import {getShoppingListData} from '../../service/HomeService'
import Goods from '../../components/shopping/index/Goods'
import { getPrice } from '../../util/handlePrice'

export default class Shopping extends Component{
    constructor(){
        super();
        this.state = {
           bannerData: [],
           menuData: [],
           prefectureData: [],
           commodityData: []
        }
    }
    render(){
        let {bannerData,menuData,prefectureData,commodityData} = this.state
        let menu = <ul className='clearfix'>
                        {
                        menuData.map((item, index)=>{
                            return(
                                <li key={index}>
                                    <img src={item.imageSrc}/>
                                    <p>{item.name}</p>
                                </li>
                            )
                        })  
                        }
                    </ul>;
        return (
            <div className='shopping'>
                <div className="subbanner swiper-container" ref="subbanner">
                    <div className="swiper-wrapper"> 
                        {
                        bannerData.map((item,index)=>{
                            return(
                                <div className="swiper-slide" key={index}>
                                    <img src={item.imageSrc}/>
                                </div>
                            ) 
                        })                                           
                        }
                    </div>  
                    <div className="swiper-pagination"></div>
                </div>
                <div className='menu'>
                    {menu}
                </div>
                {prefectureData.length>0?
                <div className='prefecture'> 
                    <h4>—&nbsp;有品专区&nbsp;—</h4>
                    <div className='clearfix'>          
                    <div className='left clearfix'>
                        <img src={prefectureData[0].imageSrc}/>
                    </div>
                    <div className='right clearfix'>
                        <img src={prefectureData[1].imageSrc}/>
                        <img src={prefectureData[2].imageSrc}/>
                    </div>
                    </div>  
                </div>:''
                }
                <div className='commodity'>
                {
                commodityData.map((item,index)=>{
                    return(
                    <div key={index}>
                        <div className='commodityban'>
                            <img src={item.imageSrc}/>
                        </div>
                        <ul>
                            {
                               item.products.map((product,index)=>{
                                    return(
                                        <li key={index}>
                                            <img src={product.image}/>
                                            <h5>{product.name}</h5>
                                            <p>￥{getPrice(product.price)}</p>
                                        </li>
                                    )
                               })                               
                            }
                        </ul>
                    </div>
                    )
                })
                }               
                </div>
                <Goods/>
            </div>
        )
    }
    componentDidMount(){
        getShoppingListData().then(result=>{
            console.log(result);
            this.setState({
                bannerData:result.banner,
                menuData:result.menu,
                prefectureData:result.prefecture,
                commodityData:result.commodity
            },()=>{
                this.subbannerSwiper = new Swiper(this.refs.subbanner,{
                    loop: true,
                    autoplay: 2000,
                    pagination : '.swiper-pagination',
                    paginationClickable :true,//点击分页器的指示点分页器会控制Swiper切换
                    preventClicks : false,//用于防止触摸时触发链接跳转
                    autoplayDisableOnInteraction : false
                });
            })
        })
    }
    componentWillUnmount(){
        
    }
}
