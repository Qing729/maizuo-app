import React, {Component} from 'react'
import Playing from '../../components/movie/index/Playing'
import Soon from '../../components/movie/index/Soon'
import Subnav from '../../common/Subnav'
import '../../style/movie.css'

export default class Movie extends Component{
    constructor({location}){
        super();
        this.state = {
            flag: location.state?location.state.flag:'playing',
        }
        console.log(location)
    }
    render(){
        let {flag} = this.state;
        return (
            <div className='movie'>
                <Subnav chooseTab={this.chooseAction.bind(this)} data={flag}/>
                {flag=='playing'?<Playing/>:<Soon/>}
            </div>
        )
    }
    chooseAction(flag){
        this.setState({flag})
    }
    componentDidMount(){

    }
    componentWillUnmount(){
        
    }
}
