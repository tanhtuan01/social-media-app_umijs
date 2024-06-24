import { apiTodo } from '@/api/todo';
import React, { useEffect, useState } from 'react';

const ListToDo = () => {
    const todoAPI = apiTodo();
    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchTodoList = async () => {
            try {
                const data = await todoAPI.list();
                setTodoList(data);
            } catch (error) {
                setError(true);
            }
        };
        fetchTodoList();
    }, []);

    return (
        <div>
            <h3>Your Todo List ({todoList.length})</h3>
            {error && <p>Lỗi khi tải danh sách công việc</p>}
            {todoList.length > 0 ? (
                <ul>
                    {todoList.map((todo) => (
                        <div key={todo.id}>{todo.name || 'No Name'} {todo.description || 'No Description'}</div>
                    ))}
                </ul>
            ) : (
                <p>Không có công việc nào</p>
            )}
        </div>
    );
};

export default ListToDo;