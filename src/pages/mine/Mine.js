import React, {Component} from 'react'
import '../../style/mine.css'

export default class Mine extends Component{
    render(){
        return (
            <div className='login'>
                <p><input type='text' placeholder='输入手机号/邮箱'/></p>
                <p><input type='text' placeholder='输入密码/验证码'/></p>
                <button>登录</button>
            </div>
        )
    }

    componentDidMount(){
        
    }
    componentWillUnmount(){
        
    }
}
