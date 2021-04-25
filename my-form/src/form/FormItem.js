
import React, {useContext, useEffect} from 'react';
import FormContext from './FormContext.js';



class FormItem  extends React.Component {

    static contextType = FormContext;

    constructor(props){
        super(props);
    }
    
    componentDidMount() {
        console.log('----DID mount', this.props.name);
        this.logoutIntance = this.context.register(this);
    }

    componentWillUnmount() {
        this.logoutIntance && this.logoutIntance();
    }

    
    onValueChange = () => {
        this.forceUpdate();
    }

    render() {
        const formInstance = this.context;
        const {children, name} = this.props;
        console.log('render---name ', name);
        const elm = React.cloneElement(children, {
            onChange: (e) => {
                console.log('onchange--name', name);
                formInstance.setFieldsValue({[name]: e.target.value});
            },
            value: formInstance.getFieldValue(name) || ''
        }) 
        return elm
    }
}
export default FormItem;