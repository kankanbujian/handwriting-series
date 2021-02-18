import React from 'react';
import {connect} from '../../my-react-redux/index';
import {Redirect, Link} from 'react-router-dom';


const UserRoute = (props) => {
    return props.hasLogin ? <div>
        个人中心
        <button onClick={props.logout}>注销</button>
        </div> : 
        <Redirect to={{pathnam:'/' , state: {redirect: '/user'}}}></Redirect>
}


export default connect(
    state => ({
       hasLogin: state.hasLogin
    }),
    {
        logout: () => ({
            type: 'logout'
        })
    }
)(UserRoute);