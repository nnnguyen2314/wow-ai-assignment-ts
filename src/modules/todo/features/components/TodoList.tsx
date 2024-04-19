import React from 'react';
import { List } from 'antd';
import {ITodo} from "../../misc/interfaces";
import TodoListItem from './TodoListItem';

interface ITodoListProps {
    todoList: ITodo[];
    onRemoveTodo: (id: number) => void;
    onCompletedToggle: (id: number) => void;
    onEditTodo: (todo: ITodo) => void;
}

const TodoList = (props: ITodoListProps) => {
    const { todoList, onRemoveTodo, onCompletedToggle, onEditTodo } = props;
    return (
        <List
            locale={{
                emptyText: "No any tasks available.",
            }}
            dataSource={todoList}
            renderItem={(todo) => (
                <TodoListItem
                    todo={todo}
                    onCompletedToggle={onCompletedToggle}
                    onRemoveTodo={onRemoveTodo}
                    onEditTodo={onEditTodo}
                />
            )}
            pagination={{
                position: 'bottom',
                pageSize: 10,
            }}
        />
    );
};

export default TodoList;