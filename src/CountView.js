import React, {Component} from 'react';
import {connect} from 'react-redux';


class CountView extends Component {
    render() {
        console.log('props---', this.props);

        return <div>
            it is a countView
            <p>{this.props.count}</p>
            <p>dsadsa</p>
            <button onClick={() => {
                this.props.dispatch({
                    type: 'add'
                })
            }}>add</button>
            
            <button onClick={() => {
                this.props.dispatch({
                    type: 'minus'
                })
            }}>minus</button>
        </div>
    }
}

const mapStateToProps = (state) => {
    console.log('state--', state);
    return ({
        count:state
    })
}

export default connect(mapStateToProps)(CountView);