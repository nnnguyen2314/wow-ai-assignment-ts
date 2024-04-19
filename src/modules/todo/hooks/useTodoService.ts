import {useAppDispatch, useAppSelector} from '../../shared/hooks';
import {shallowEqual} from "react-redux";
import {useCallback} from "react";
import { addTodo, removeTodo, updateTodo, markAsCompleted, getTodoState } from "../store/todoSlice";
import {ITodo} from "../misc/interfaces";

const useTodoService = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector(getTodoState, shallowEqual);

    const handleAddTodo = useCallback((data: ITodo) => {
        return dispatch(addTodo(data));
    }, [dispatch]);

    const handleUpdateTodo = useCallback((data: ITodo) => {
        return dispatch(updateTodo(data));
    }, [dispatch]);

    const handleCompletedToggle = useCallback((id: number) => {
        return dispatch(markAsCompleted(id));
    }, [dispatch]);

    const handleRemoveTodo = useCallback((id: number) => {
        return dispatch(removeTodo(id));
    }, [dispatch]);

    return {
        selector,
        handleAddTodo,
        handleUpdateTodo,
        handleCompletedToggle,
        handleRemoveTodo
    }
};

export default useTodoService;