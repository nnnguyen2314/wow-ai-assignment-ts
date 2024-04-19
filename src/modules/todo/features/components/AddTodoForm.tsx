import React, {useState} from 'react';
import { Form, Button, Input, DatePicker, DatePickerProps  } from 'antd';
import {ITodo} from "../../misc/interfaces";
import dayjs from 'dayjs';

const { TextArea } = Input;

interface IAddTodoFormProps {
    todo?: ITodo;
    onFormSubmit: (todo: ITodo) => void;
}

const AddTodoForm = (props: IAddTodoFormProps) => {
    const [form] = Form.useForm();
    const [startedDate, setStartedDate] = useState(dayjs());

    const onStartedDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        setStartedDate(dayjs(date));
    };

    const onFinish = () => {
        let task = {
            title: form.getFieldValue('title'),
            description: form.getFieldValue('description'),
            completed: false,
            startedDate: startedDate ? dayjs(startedDate) : dayjs()
        };

        if (props.todo) {
            task = {...task, ...{id: props.todo.id}};
        }

        props?.onFormSubmit(task);
        form.resetFields();
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            style={{ maxWidth: 600 }}
        >
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'This field is required' }]}
                initialValue={props?.todo ? props?.todo?.title : ''}
            >
                <Input placeholder="What needs to be done?" />
            </Form.Item>
            <Form.Item label="Start Date">
                <DatePicker defaultValue={props?.todo?.startedDate ? dayjs(props?.todo?.startedDate) : dayjs()} onChange={onStartedDateChange} />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                initialValue={props?.todo ? props?.todo?.description : ''}
            >
                <TextArea placeholder="What needs to be done?" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 6 }}>
                <Button type="primary" htmlType="submit" block>
                    Add
                </Button>
            </Form.Item>
        </Form>
    )
};

export default AddTodoForm;