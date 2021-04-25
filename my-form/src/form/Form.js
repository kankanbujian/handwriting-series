import React, {useEffect} from 'react';
import FormContext from './FormContext';
import useForm from './useForm';


const Form = ({children, form,  onFinish, onFinishFailed, ...rest}) => {
    const [formInstance] = useForm(form);


    useEffect(() => {
        formInstance.createCallback({
            onFinish,
            onFinishFailed
        })
    }, []);

    return <form onSubmit={(event) => {
            event.preventDefault();
            formInstance.submit();
        }}>
        <FormContext.Provider value={formInstance} >
            <div>
                {children}
            </div>
        </FormContext.Provider>
    </form>
}

export default Form;