// import {}
import { Input } from "_antd@4.15.0@antd"

const 


const Form = ({children, ...rest}) => {

    
    return <div>
    {children}
    </div>
}




const Item = ({children, ...props}) => {

    
    return <div>
        {children}
    </div>
}
Form.Item = Item;
export default Form;