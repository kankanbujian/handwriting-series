import _Form from './Form.js';
import FormItem from './FormItem.js';
import useForm from './useForm.js';

const Form = _Form;
Form.useForm = useForm;
Form.Item = FormItem;

export default Form;