import React, {Component} from 'react'
import {getShoppingGoods} from '../../../service/HomeService'

export default class Goods extends Component{
    constructor(){
        super();
        this.state = {
            goodsData: [],           
            page: 1,
            num: 20
        };
        this.token = PubSub.subscribe('load-movie-more', ()=>{
            console.log('goods监听load-movie-more');
            this.setState({page: this.state.page+1})
            this.requestData();
        })
    }
    render(){
        return (
            <div className='goods'>
                <h4>—&nbsp;好货精选&nbsp;—</h4>
                <div className='goodsList'>
                    <ul className='clearfix'>
                        {
                            this.state.goodsData.map((item,index)=>{
                                return(
                                <li key={index}>
                                    <img src={item.image}/>
                                    <h5>{item.masterName}</h5>
                                    <p><b>￥{item.price}</b><span>已售{item.displaySalesCount}</span></p>
                                </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
    requestData(){
        let {goodsData,page,num} = this.state;
        getShoppingGoods({page,num}).then(result=>{
            this.setState({goodsData: goodsData.concat(result)});
        })
    }
    componentDidMount(){
        this.requestData()
    }
    componentWillUnmount(){
        
    }
}
