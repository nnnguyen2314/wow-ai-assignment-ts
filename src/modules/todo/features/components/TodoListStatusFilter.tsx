import React from 'react';
import { Space, Select } from 'antd';
import { ITodoListFilterProps } from "../../misc/interfaces";

const TodoListStatusFilter = (props: ITodoListFilterProps) => {
    const statusFilterData = [
        {
            label: 'Completed',
            value: true
        },
        {
            label: 'Pending',
            value: false
        }
    ];

    return (
        <Space>
            <label>Filter by:</label>
            <Select
                mode="multiple"
                style={{ minWidth: '150px', maxWidth: '200px' }}
                placeholder="Status"
                onChange={props.onFilterChanged}
                options={statusFilterData}
            />
        </Space>
    )

};
export default TodoListStatusFilter;