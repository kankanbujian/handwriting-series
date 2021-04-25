import {useRef, Component} from 'react';

class FormStore {
    constructor() {
        this.formStore = {};
        this.entities = [];
        this.cbs = {};
    }

    register = (entity) => {
        this.entities.push(entity);
        return () => {
            this.entities.filter(_e => _e !== entity);
        }
    }

    createCallback = (cb) => {

    }

    submit = () => {
        if (false) {
            
        }
    }

    getFieldValue = (key) => {
        console.log('---getFieldValue--key', key);
        return this.formStore[key];
    }

    setFieldsValue = (newStore) => {
        this.formStore = {...this.formStore, ...newStore};
        for( let name in newStore) {
            this.entities.forEach(_entity => {
                if (_entity.props.name === name){
                    _entity.onValueChange();
                }
            });
        }
    }
    
    getFieldsValue = () => {
        return this.formStore;
    }

    getForm = () => {
        return {
            getFieldValue: this.getFieldValue,
            setFieldsValue: this.setFieldsValue,
            getFieldsValue: this.getFieldsValue,
            register: this.register,
            createCallback: this.createCallback,
            submit: this.submit
        }
    }
}

const useForm = function(form) {
    let formRef = useRef();

    if (!formRef.current) {
        if (form) {
            formRef.current = form;
        } else {
            const formStore = new FormStore();
            formRef.current = formStore.getForm();
        }
    }
    return [formRef.current]
    
}

export default useForm;