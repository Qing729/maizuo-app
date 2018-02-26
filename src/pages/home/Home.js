import React, {Component} from 'react'
import '../../style/home.css'
import Banner from '../../components/home/index/Banner'
import List from '../../components/home/index/List'
export default class Home extends Component{
    constructor(){
        super();
        this.state = {
            
        }
    }
    render(){
        return (
            
            <div className='home'>
                <Banner/>
                <List/>
            </div>
            
        )
    }
    componentDidMount(){
        
    }
    componentWillUnmount(){
        
    }
}
