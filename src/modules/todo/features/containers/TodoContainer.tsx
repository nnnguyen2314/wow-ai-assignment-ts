import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Tooltip, Button, Drawer, message, Space} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useTodoService from '../../hooks/useTodoService';
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";
import {ITodo} from "../../misc/interfaces";
import TodoListStatusFilter from "../components/TodoListStatusFilter";

const TodoContainer = () => {
    const {
        selector,
        handleAddTodo,
        handleRemoveTodo,
        handleUpdateTodo,
        handleCompletedToggle } = useTodoService();
    const [isAddingNewTask, setIsAddingNewTask] = useState(false);
    const [editingTask, setEditingTask] = useState<ITodo>();
    const [todoList, setTodoList] = useState<ITodo[]>(selector.todoList);

    useEffect(() => {
        setTodoList(selector.todoList);
    }, [selector]);

    const onEditTask = (todo: ITodo) => {
        setEditingTask(todo);
        setIsAddingNewTask(true);
    }
    const onOpenNewTaskAdding = () => {
        setIsAddingNewTask(true);
    };
    const onCloseNewTaskAdding = () => {
        setIsAddingNewTask(false);
    };

    const onFilterChanged = (selectedFilterValues: any[]) => {
        let originalList = selector.todoList as ITodo[];
        let filteredList: ITodo[] = [];

        if (!selectedFilterValues || selectedFilterValues.length <= 0) {
            setTodoList(selector.todoList);
        } else {
            originalList.forEach((todo) => {
                if (selectedFilterValues.filter((fv) => {
                    return fv === todo.completed;
                }).length > 0) {
                    filteredList.push(todo);
                }
            });
            setTodoList(filteredList);
        }
    }

    return (
        <div>
            <Row
                justify="center"
                align="middle"
                gutter={[0, 20]}
                className="todos-container"
            >
                <Col
                    xs={{ span: 23 }}
                    sm={{ span: 20 }}
                    md={{ span: 20 }}
                    lg={{ span: 16 }}
                    xl={{ span: 12 }}
                >
                    <Card
                        title={<h2>Todo List</h2>}
                        extra={
                            <Space size="middle">
                                <TodoListStatusFilter onFilterChanged={onFilterChanged} />
                                <Tooltip title="Add new task">
                                    <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={onOpenNewTaskAdding} />
                                </Tooltip>
                            </Space>
                        }
                    >
                        <TodoList
                            todoList={todoList}
                            onRemoveTodo={handleRemoveTodo}
                            onCompletedToggle={handleCompletedToggle}
                            onEditTodo={onEditTask}
                        />
                    </Card>
                </Col>
            </Row>
            <Drawer
                title="Add new task"
                placement="right"
                closable={false}
                onClose={onCloseNewTaskAdding}
                open={isAddingNewTask}
                key="right"
            >
                <AddTodoForm todo={editingTask} onFormSubmit={(todo) => {
                    if (editingTask) {
                        handleUpdateTodo(todo);
                    }
                    handleAddTodo(todo);
                    onCloseNewTaskAdding();
                    message.success('Task added successfully!')
                }} />
            </Drawer>
        </div>
    );
};

export default TodoContainer;