import React, {Component} from 'react'
import {getLocation} from '../../service/HomeService'
import '../../style/local.css'
import { getUnix } from '../../util/handleTime';

export default class Local extends Component{
    constructor({match, location, history}){
        super();
        this.state = {
            locationData: []
        }
    }
    render(){
        let {locationData} = this.state;
        let letters = <ul>
                        {
                          locationData.map((item,index)=>{
                                return(
                                    <li key={index} className='one-bottom-px'>{item.letter}</li>
                                )
                          })  
                        }                       
                    </ul>;
        return (
            <div className='local'>
                <div className='mylocation'>
                    <h4>GPS定位你所在城市</h4>
                    <ul><li>深圳</li></ul>
                </div>
                <div className='hotcity'>
                    <h4>热门城市</h4>
                        <ul>
                            <li>北京</li>
                            <li>上海</li>
                            <li>广州</li>
                            <li>深圳</li>               
                        </ul>
                </div>
                <div className='letters'>
                    <h4>按字母排序</h4>
                    {letters}
                </div>
                <div className='letter'>
                    {
                       locationData.map((item, index)=>{
                           return(
                               <div key={index}>
                                    <h4>{item.letter}</h4>
                                    <ul>
                                        {                                  
                                            item.value.map((value, index)=>{
                                                return(
                                                   <li className='one-bottom-px' key={index}>{value.name}</li> 
                                                )
                                            })
                                        }                       
                                    </ul>
                                </div>
                           )
                       }) 
                    }
                </div>
            </div>
        )
    }
    componentDidMount(){
        getLocation({__t:getUnix()}).then(result=>{
            console.log(result);
            this.setState({locationData: result})
        })
    }
    componentWillUnmount(){
        
    }
}
