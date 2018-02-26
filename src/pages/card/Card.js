import React, {Component} from 'react'
import '../../style/card.css'

export default class Card extends Component{
    constructor(){
        super();
        this.state = {
            flag: 'card'
        }
    }
    render(){
        let {flag} = this.state;
        return (           
            <div className='cards'>
                <div className='cardnav'>
                    <ul className='clearfix'>
                        <li ref='card' className={'card'+(flag=='card'?' choose':'')} onClick={this.tabAction.bind(this, 'card')}>卖座卡</li>
                        <li ref='ecard' className={'ecard'+(flag=='ecard'?' choose':'')} onClick={this.tabAction.bind(this, 'ecard')}>电子卖座卡</li>
                    </ul>
                </div>
                {flag=='card'?
                    <div className='card'>
                        <p>卡号：<input type='text' placeholder='请输入卡号'/></p>
                        <p>密码：<input type='text' placeholder='请输入密码'/></p>
                        <button>查询</button>
                    </div>:
                    <div className='card'>
                        <p>卡号：<input type='text' placeholder='请输入15位电子卖座卡号'/></p>
                        <button>查询</button>
                    </div>
                }
            </div>
        )
    }
    tabAction(flag){
        this.setState({flag});
    }
    componentDidMount(){
        
    }
    componentWillUnmount(){
        
    }
}

