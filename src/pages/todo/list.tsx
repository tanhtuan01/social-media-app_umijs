import { apiTodo } from '@/api/todo';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

interface ListToDoProps {
    onRefresh: false;
}

const ListToDo: React.FC<ListToDoProps> = ({ onRefresh }) => {
    const todoAPI = apiTodo();
    const deleteTODO = todoAPI.deleteTodo
    const getTodo = todoAPI.getTodo;
    const update = todoAPI.updateTodo;

    const [todoList, setTodoList] = useState([]);
    const [error, setError] = useState(false);
    const listTodoRef = useRef(null);

    const [todo, setTodo] = useState({});
    const [modalDeleteTodo, setModalDeleteTodo] = useState(false);

    const [modalUpdateTodo, setModalUpdateTodo] = useState(false);

    const [taskType, setTaskType] = useState('Personal')
    const [taskPriority, setTaskPriority] = useState('Important');
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');


    const [taskStartTime, setTaskStartTime] = useState('');
    const [taskEndTime, setTaskEndTime] = useState('');
    const [taskStartTimeClick, setTaskStartTimeClick] = useState(false);
    const [taskEndTimeClick, setTaskEndTimeClick] = useState(false);

    useEffect(() => {
        fetchTodoList();
    }, [onRefresh]);

    const [idTodelete, setIdTodelete] = useState('')
    const [idTodoUpdate, setIdTodoUpdate] = useState('')

    const fetchTodoList = async () => {
        try {
            const data = await todoAPI.list();
            setTodoList(data);
        } catch (error) {
            setError(true);
        }
    };

    async function deleteATODO(todoid: string) {
        const deletes = await deleteTODO(todoid)
        console.log("deleteATODO", deletes)
        if (typeof deletes === 'string') {
            toast.error('Delete todo failed')
        } else {
            fetchTodoList();
            toast.success('Delete todo successfully')
        }
    }

    async function getTodoByUser(id: string) {
        const data = await getTodo(id)
        setTodo(data)
        setTaskType(data.type)
        setTaskName(data.name)
        setTaskDescription(data.description)
        setTaskEndTime(formatDate(data.endDate))
        setTaskStartTime(formatDate(data.startDate))
        console.log("getTodo", todo)
    }


    function updateTodo(todoid: string) {
        setModalUpdateTodo(true)
        console.log(todoid);
        setIdTodoUpdate(todoid)
        getTodoByUser(todoid)
    }

    function deleteTodo(todoid: string) {
        setModalDeleteTodo(true)
        setIdTodelete(todoid)
    }

    function confirmDeleteTodo() {
        deleteATODO(idTodelete)
        setModalDeleteTodo(false)

    }


    const checkEndTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskEndTimeClick(true)
        setTaskEndTime(formatDate(event.target.value));
    };

    const checkStartTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskStartTimeClick(true)
        setTaskStartTime(formatDate(event.target.value));
    };


    async function updateTODO(id: string, todo: object) {
        const result = await update(id, todo);

        if (typeof result === 'string') {
            toast.error('Update todo failed');
        } else {
            setModalUpdateTodo(false);
            fetchTodoList();
            toast.success('Update todo successfully');
        }
    }

    useEffect(() => {
        fetchTodoList();
    }, []);



    function confirmUpdateTodo() {

        if (!taskStartTime && taskStartTimeClick && new Date(taskStartTime)) {
            toast.error('Task start time is not valid');
            return
        }
        else if (!taskEndTime && taskEndTimeClick && new Date(taskEndTime)) {
            toast.error('Task end time is not valid');
            return
        }
        else if (taskStartTime && taskEndTime && new Date(taskEndTime) <= new Date(taskStartTime)) {
            toast.error('Task end time is must be later than task start time');
            return
        }

        const newtodo = {
            name: taskName,
            description: taskDescription,
            taskPriority: taskPriority,
            startDate: taskStartTime,
            endDate: taskEndTime,
            type: taskType,
        }

        updateTODO(idTodoUpdate, newtodo)
        console.log("updateTodo", newtodo)
        fetchTodoList()
    }

    const formatDate = (date: string) => {
        return format(date, 'yyyy-MM-dd')
    }

    return (
        <div>


            {/* <ToastContainer autoClose={3000} /> */}

            <h2>Your Todo List ({todoList.length})</h2>
            <a href="todo">Create new</a>
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
                                <h2>Confirm delete</h2>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure to delete this?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="cancel-button btn" onClick={() => setModalDeleteTodo(false)}>Cancel</button>
                                <button className="delete-button btn" onClick={() => confirmDeleteTodo()}>Delete</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {modalUpdateTodo && (
                <div id="modal" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="close-button" onClick={() => setModalUpdateTodo(false)}>&times;</span>
                            <h2>Update todo</h2>
                        </div>
                        <div className="modal-body">
                            <p>Change any info you want?</p>
                        </div>
                        <div className="modal-form">
                            <form action="">
                                <div className='type-priority'>
                                    <div className="form-group">
                                        <label htmlFor="">Task Type</label>
                                        <select name="" id="" value={taskType} onChange={event => setTaskType(event.target.value)}>
                                            <option value="Personal">Personal</option>
                                            <option value="Work">Work</option>
                                            <option value="Study">Study</option>
                                            <option value="Family">Family</option>
                                            <option value="Healthy">Healthy</option>
                                            <option value="Entertainment">Entertainment</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Home">Home</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Task Priority</label>
                                        <select name="" id="" value={taskPriority} onChange={(event) => setTaskPriority(event.target.value)}>
                                            <option value="Important">Important</option>
                                            <option value="Normal">Normal</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Task Name</label>
                                    <input type="text" name="" id="" value={taskName} onChange={(event) => setTaskName(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Task Description</label>
                                    <textarea name="" id="" value={taskDescription} onChange={(event) => setTaskDescription(event.target.value)}></textarea>
                                </div>
                                <div className="time">
                                    <div className="form-group">
                                        <label htmlFor="">Start time</label>
                                        <input type="date" name="" id="" value={taskStartTime} onChange={(event) => {
                                            checkStartTime(event);
                                        }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">End time</label>
                                        <input type="date" name="" id="" value={taskEndTime} onChange={(event) => {
                                            checkEndTime(event);
                                        }} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-button btn" onClick={() => setModalUpdateTodo(false)}>Cancel</button>
                            <button className="delete-button btn" onClick={() => confirmUpdateTodo()}>Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListToDo;