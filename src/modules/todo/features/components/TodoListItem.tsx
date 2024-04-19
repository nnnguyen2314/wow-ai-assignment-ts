import React from 'react';
import {Tooltip, List, Button, Popconfirm, Switch, message, Space} from 'antd';
import {CloseOutlined, CheckOutlined, EditOutlined} from '@ant-design/icons';
import {ITodoItemProps} from "../../misc/interfaces";
import QueueAnim from 'rc-queue-anim';
import dayjs from "dayjs";

const TodoListItem = (props: ITodoItemProps) => {
    const { todo, onRemoveTodo, onCompletedToggle, onEditTodo } = props;
    return (
        <QueueAnim leaveReverse delay={400} className="queue-simple" type={['right', 'left']}>
            <List.Item
                actions={[
                    <Tooltip
                        title={todo.completed ? 'Mark as uncompleted' : 'Mark as completed'}
                    >
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            onChange={() => {
                                onCompletedToggle(todo.id || 0);
                                message.success('Status updated!');
                            }}
                            defaultChecked={todo.completed}
                        />
                    </Tooltip>,
                    <Popconfirm
                        title="Are you sure you want to delete?"
                        onConfirm={() => {
                            onRemoveTodo(todo.id || 0);
                            message.success('Task removed!');
                        }}
                    >
                        <Tooltip title="Delete task">
                            <Button shape="circle" danger size="small" icon={<CloseOutlined />} />
                        </Tooltip>
                    </Popconfirm>,
                    <Tooltip title="Edit task">
                        <Button shape="circle" size="small" icon={<EditOutlined />} onClick={() => {
                            onEditTodo(todo);
                        }} />
                    </Tooltip>
                ]}
                className="list-item"
                key={todo.id}
            >
                <List.Item.Meta
                    title={todo.title}
                    description={
                        <div>
                            <p>
                                <Space>
                                    <label>Started Date:</label>
                                    <label>{dayjs(todo.startedDate).format('YYYY/MM/DD')}</label>
                                </Space>
                            </p>
                            <p>
                                {todo.description}
                            </p>
                        </div>
                    }
                />
            </List.Item>
        </QueueAnim>
    );
};

export default TodoListItem;