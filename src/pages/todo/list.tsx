import { apiTodo } from '@/api/todo';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ListToDo = () => {
    const todoAPI = apiTodo();
    const deleteTODO = todoAPI.deleteTodo
    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState(false);
    const listTodoRef = useRef(null);

    const [modalDeleteTodo, setModalDeleteTodo] = useState(false);

    useEffect(() => {
        fetchTodoList();
    }, []);

    const [idTodelete, setIdTodelete] = useState('')

    const fetchTodoList = async () => {
        try {
            const data = await todoAPI.list();
            setTodoList(data);
        } catch (error) {
            setError(true);
        }
    };

    function deleteATODO(todoid: string) {
        const deletes = deleteTODO(todoid)
        if (typeof deletes === 'string') {
            toast.success('Delete todo successfully')
        } else {
            toast.error('Delete todo failed')
        }
    }

    function updateTodo(todoid: string) {
        console.log(todoid);
    }

    function deleteTodo(todoid: string) {
        setModalDeleteTodo(true)
        setIdTodelete(todoid)
    }

    function confirmDeleteTodo() {
        deleteATODO(idTodelete)
        setModalDeleteTodo(false)

    }


    const formatDate = (date: string) => {
        return format(date, 'yyyy-MM-dd')
    }

    return (
        <div>


            <ToastContainer />

            <h2>Your Todo List ({todoList.length})</h2>
            {error && <p>Lỗi khi tải danh sách công việc</p>}
            {todoList.length > 0 ?
                (
                    <div className='list-todo'>
                        {todoList.map((todo) => (
                            <div className='item' key={todo._id}>
                                <div className="name">
                                    {todo.name || 'No Name'}
                                </div>
                                <div className="desc">
                                    {todo.description || 'No Description'}
                                </div>
                                <div className="date">
                                    <span>
                                        Start: {formatDate(todo.startDate)}
                                    </span>
                                    &nbsp;
                                    <span>
                                        End:  {formatDate(todo.endDate)}
                                    </span>
                                </div>
                                <div className="button">
                                    <a onClick={() => {
                                        updateTodo(todo._id)
                                    }} className='btn'><EditOutlined /></a>
                                    <a onClick={() => {
                                        deleteTodo(todo._id)
                                    }} className='btn'><DeleteOutlined /></a>
                                </div>
                            </div>
                        ))}
                    </div>
                )
                :
                (<p>Không có công việc nào</p>)
            }
            {
                modalDeleteTodo && (
                    <div id="modal" className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <span className="close-button" onClick={() => setModalDeleteTodo(false)}>&times;</span>
                                <h2>Xác nhận xoá</h2>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xoá?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="cancel-button btn" onClick={() => setModalDeleteTodo(false)}>Hủy</button>
                                <button className="delete-button btn" onClick={() => confirmDeleteTodo()}>Xoá</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ListToDo;