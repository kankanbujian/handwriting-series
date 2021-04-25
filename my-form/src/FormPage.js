import {  Input, Button } from 'antd';
import Form from './form/index.js';
import React, {useRef, useEffect} from 'react';

const FormItem = Form.Item;

  
const CustomizeInput = ({value = "", ...props}) => (
    <div style={{padding: 10}}>
        <Input style={{outline: "none"}} value={value} {...props} />
    </div>
);
  


const FormPage = (props) => {
    const [formInstance]  = Form.useForm();
    console.log('formInstance--', formInstance);
    useEffect(() => {
        formInstance.setFieldsValue({
            age: '10',
            name: 'zhangsan'
        })
    }, [])

    return <Form form={formInstance} onFinish={(e) =>{
        console.log(e)
    }}>
        <FormItem name='name' label='姓名'>
            <input/>
        </FormItem>
        <FormItem name='age' label='年级'>
            <input/>
        </FormItem>
        <Button htmlType='submit'>提交</Button>
    </Form>
}

export default FormPage;