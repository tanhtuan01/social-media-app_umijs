import { useEffect, useRef, useState } from 'react';
import '../../assets/base.less'
import '../../assets/todo/style.less'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { format } from 'date-fns';
import { history } from 'umi';
import { apiTodo } from '@/api/todo';
import checkTokenFirst from '@/middleware/auth';
import ListToDo from './list';


export default function ToDoHomePage() {
    checkTokenFirst();
    const todoApi = apiTodo();
    const create = todoApi.create;

    const [taskType, setTaskType] = useState('Personal');
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('Important');
    const [taskStartTime, setTaskStartTime] = useState('');
    const [taskEndTime, setTaskEndTime] = useState('');
    const [taskStartTimeClick, setTaskStartTimeClick] = useState(false);
    const [taskEndTimeClick, setTaskEndTimeClick] = useState(false);
    const [twoDateValid, setTwoDateValid] = useState(false);

    function submitCreateTodo() {

        console.log('Form submitted');
        if (!twoDateValid) {
            toast.error('Form is not valid');
        } else {
            const todo = {
                name: taskName,
                description: taskDescription,
                taskPriority: taskPriority,
                startDate: taskStartTime,
                endDate: taskEndTime,
                type: taskType,
            }
            console.log('todo', todo);
            createTodo(todo)
        }

    }

    async function createTodo(todo: object) {
        const result = await create(todo);
        if (typeof result === 'string') {
            setTaskName('');
            setTaskDescription('');
            setTaskPriority('Important');
            setTaskStartTime('');
            setTaskEndTime('');
            setTaskType('Personal')
            toast.success('Create todo successfully');
            setTaskStartTimeClick(false)
            setTaskEndTimeClick(false)
        } else if (result.error) {
            toast.error(result.error);
        } else {
            toast.error('Create todo failed');
        }
    }

    const formatDate = (date: string) => {
        return format(date, 'yyyy-MM-dd')
    }

    const checkEndTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskEndTimeClick(true)
        setTaskEndTime(formatDate(event.target.value));
    };

    const checkStartTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskStartTimeClick(true)
        setTaskStartTime(formatDate(event.target.value));
    };


    useEffect(() => {
        // checkTokenFirst()

        if (!taskStartTime && taskStartTimeClick && new Date(taskStartTime)) {
            toast.error('Task start time is not valid');
            setTwoDateValid(false)
        }
        else if (!taskEndTime && taskEndTimeClick && new Date(taskEndTime)) {
            toast.error('Task end time is not valid');
            setTwoDateValid(false)
        }
        else if (taskStartTime && taskEndTime && new Date(taskEndTime) <= new Date(taskStartTime)) {
            toast.error('Task end time is must be later than task start time');
            setTwoDateValid(false)
        } else {
            setTwoDateValid(true)
        }




    }, [taskStartTime, taskEndTime, taskPriority, ListToDo]);

    return (

        <div className="row">
            <div className="post-blog">
                <div className='todo-page'>

                    <ToastContainer autoClose={3000} />
                    <div className="todo-nav">
                        <ul>
                            <li>
                                <a href="">List</a>
                            </li>

                        </ul>
                    </div>

                    <div className="form-add-todo">
                        <form action="">
                            <h1>
                                Create a new task
                            </h1>
                            <div className='type-priority'>
                                <div className="form-group">
                                    <label htmlFor="">Task type</label>
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
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="">Task Priority</label>
                                        <select name="" id="" value={taskPriority} onChange={(event) => setTaskPriority(event.target.value)}>
                                            <option value="Important">Important</option>
                                            <option value="Normal">Normal</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Task name</label>
                                <input type="text" name="" id="" placeholder='Enter your task name...' value={taskName} onChange={event => setTaskName(event.target.value)} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Description</label>
                                <textarea name="" id="" cols={50} rows={3} placeholder='Enter your task description' value={taskDescription} onChange={event => setTaskDescription(event.target.value)} ></textarea>
                            </div>


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

                            <button type='button' onClick={submitCreateTodo} className='btn btn-create-todo'>Create</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="todo">
                <ListToDo />
            </div>
        </div>





    )
}