import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../../style/cinemadetail.css'
import {getCinemaData} from '../../service/MovieService'
import { getUnix } from '../../util/handleTime'
import 'pubsub-js'
export default class CinemaDetail extends Component{
    constructor({location}){
        super();
        this.state = {
            name: '',
            address: '',
            tel: '',
            submenu: []
        }
        this.location = location;
    }
    render(){
        let {address,tel,submenu} = this.state;
        return (       
            <div className='cinemadetail'>
               <div className='cinema_ban'>
                    <img src="//static.m.maizuo.com/v4/static/app/asset/66461d1a02a9eaa64876c90952c42aed.png"/>
               </div>
               <div className='cinema_menu'>
                    <ul>
                        <li>
                            <div className='one-bottom-px'>
                                <h4>订座票</h4>
                                <p>选好场次及座位，到影院自助机取票</p>
                                <Link to={{
                                    pathname:'/theatredetail',
                                    state:{
                                        id: this.location.state.id
                                    }
                                }}>
                                <button className='seat'>立即订座</button>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className='one-bottom-px'>
                                <h4>通兑票</h4>
                                <p>有效期内到影院前台兑换影票</p>
                                <button className='ticket'>立即订票</button>
                            </div>
                        </li>
                        {
                            this.location.state.isLabels?(
                            <li>
                                <div className='one-bottom-px'>
                                    <h4>小卖品</h4>
                                    <button className='seat'>购买</button>
                                </div>
                            </li>
                            ):''            
                        }
                        
                        <li>
                            <div className='one-bottom-px'>
                                <h4>{address}</h4>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>{tel}</h4>
                            </div>
                        </li>
                    </ul>
               </div>
               <div className='submenu'>
                    {/* <ul>
                        <li>
                            <p>取票</p>
                        </li>
                        {
                            submenu.map((item,index)=>{
                                return(
                                    <li key={index}>
                                        <img src={item.iconUrl} />
                                        <p>{item.name}</p> 
                                    </li>
                                )  
                            })

                        }
                        <li>
                            <p>交通</p>
                        </li>
                    </ul> */}
               </div>
            </div>   
        )
    }
    
    componentDidMount(){
        getCinemaData(this.location.state.id,{__t:getUnix()}).then(result=>{
            console.log(result);
            this.setState({
                name: result.name,
                address: result.address,
                tel: result.telephones,
                submenu: result.services
            },()=>{
                PubSub.publish('pass-text', this.state.name);
                PubSub.publish('pass-refresh');
            })
        })   
    }
    componentWillUnmount(){
        
    }
}
