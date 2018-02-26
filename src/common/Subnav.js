import React, {Component} from 'react'
import '../style/subnav.css'
export default class Home extends Component{
    constructor(){
        super();
        this.state = {
            flag: 'playing'
        }
    }
    render(){
        let {flag} = this.state
        return(
            <div className='subnav'>
                <ul className='clearfix'>
                    <li ref='play' className={'playing'+(flag=='playing'?' choose':'')} onClick={this.tabAction.bind(this, 'playing')}>正在热映</li>
                    <li ref='soon' className={'soon'+(flag=='soon'?' choose':'')} onClick={this.tabAction.bind(this, 'soon')}>即将上映</li>
                </ul>
            </div>
        )
    }
    tabAction(flag){
        this.setState({flag});     
        this.props.chooseTab(flag);
    }
    componentDidMount(){
        console.log(this.props.data);
        this.setState({flag: this.props.data});  
    }
}