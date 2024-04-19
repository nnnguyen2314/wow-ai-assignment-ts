export interface ITodoState {
    list: any[];
    loading: boolean;
    message: string;
}

export interface ITodo {
    id?: number;
    title: string;
    description?: string;
    completed: boolean;
    startedDate?: any;
}

export interface ITodoItemProps {
    todo: ITodo;
    onRemoveTodo: (id: number) => void;
    onCompletedToggle: (id: number) => void;
    onEditTodo: (todo: ITodo) => void;
}

export interface ITodoListFilterItem {
    label: string;
    value: any;
}

export interface ITodoListFilterProps {
    onFilterChanged: (selectedFilterItems: any) => void;
}