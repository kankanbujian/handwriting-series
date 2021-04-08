import {  Input, Button } from 'antd';
import Form from './form/Form';

const FormItem = Form.Item;

const FormPage = (props) => {
    return <Form onFinish={(e) =>{
        console.log(e)
    }}>
        <FormItem name='name' label='姓名'>
            <Input />
        </FormItem>
        <FormItem name='age' label='年级'>
            <Input />
        </FormItem>
        <Button htmlType='submit'>提交</Button>
    </Form>
}

export default FormPage;