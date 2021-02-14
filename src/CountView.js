import React, {Component} from 'react';
// import {connect} from 'react-redux';
import {connect} from '../my-react-redux/index';


class CountView extends Component {
    render() {
        console.log('props---', this.props);

        return <div>
            it is a countView
            <p>{this.props.count}</p>
            <p>dsadsa</p>
            <button onClick={this.props.add}>add</button>
            
            <button onClick={this.props.minus}>minus</button>
        </div>
    }
}

const mapStateToProps = (state) => {
    console.log('state--', state);
    return ({
        count:state
    })
}

export default connect(mapStateToProps, {
    add: () => ({type: 'add'}),
    minus: () => ({type: 'minus'}),
})(CountView);