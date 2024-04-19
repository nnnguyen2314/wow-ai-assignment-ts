import {current, createSlice} from '@reduxjs/toolkit';
import {get} from "lodash";
import {ITodoState} from '../misc/interfaces';

export const stateKey = 'todo';

const initialState = {
    list: [],
    loading: false,
    message: ''
};

export const todoSlice = createSlice({
    name: stateKey,
    initialState,
    reducers:{
        addTodo: (state: ITodoState, action) => {
            const currentState = current(state);
            let currentList = [...currentState?.list] || initialState.list;
            const newTask = action?.payload;
            state.list.push({...newTask, ...{id: currentList.length + 1}});
            state.message = 'Task was added successfully!';
        },
        updateTodo: (state: ITodoState, action) => {
            state.list.map((item) => {
                if(item.id === action?.payload?.id) {
                    item = {item, ...action?.payload};
                }
                return item;
            });
            state.message = 'Task was updated successfully!';
        },
        removeTodo: (state: ITodoState, action) => {
            const currentState = current(state);
            const currentList = [...currentState?.list] || initialState.list;
            state.list = currentList.filter((e) => e.id !== action?.payload);
            state.message = 'Task was removed successfully!';
        },
        markAsCompleted: (state: ITodoState, action) => {
            state.list.map((item) => {
                if(item.id === action?.payload) {
                    item.completed = !item.completed;
                }
                return item;
            });
            state.message = 'Task was updated successfully!';
        }

    },
});

export const getTodoState = (state: ITodoState) => {
    const todoState = get(state, stateKey, initialState);
    const todoList = get(todoState, 'list', initialState.list || []);
    const loading = get(todoState, 'loading', initialState.loading);
    const message = get(todoState, 'message', initialState.message);

    return {
        todoList,
        loading,
        message
    };
};

export const {
    addTodo,
    updateTodo,
    removeTodo,
    markAsCompleted
} = todoSlice.actions;
export default todoSlice.reducer;