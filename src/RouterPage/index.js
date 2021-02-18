import React from 'react';
import {BrowserRouter, Link, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from '../../my-react-redux';
import UserRoute from './UserRoute';

const Home = (props) => {
    console.log('Home--props', props);
    return <div>首页
        {props.hasLogin ? <Redirect to={{pathname:'/user'}} /> : <button onClick={props.login}>登陆</button> }
    </div>
};

const HomePage = connect(
    (state) => ({hasLogin: state.hasLogin}),
    {
        login: () => ({type: 'login'})
    }
)(Home)

const Search = (props) => {
    return <div>
        <h1>搜索:{props.match.params.id}</h1>
        <Link to={`/search/detail/${props.match.params.id}`}>详情</Link>
        <Route component={Detail} path="/search/detail/:id"></Route>
    </div>
};
const ErrorPage = (props) => <div>404</div>;


const Detail = ({match}) => {
    return <div>
        详情:{match.params.id}
    </div>
}

const RouterPage = (props) => {
    return <div>
        RouterPage
        <BrowserRouter>
        <nav>
            <Link to="/">首页</Link>
            <Link to="/user">个人中心</Link>
            <Link to="/search">搜索</Link>
            <Link to='/dsa'>随便领取</Link>
        </nav>
        <Switch>
            <Route exact component={HomePage} path='/'></Route>
            <Route component={UserRoute} path="/user"></Route>
            <Route component={Search} path="/search/:id">
            </Route>
        
            <Route component={ErrorPage}></Route>
        </Switch>
        </BrowserRouter>
    </div>
}


export default RouterPage;