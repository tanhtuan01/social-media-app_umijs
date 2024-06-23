import { useEffect, useState } from 'react';
import '../../assets/base.less'
import '../../assets/todo/style.less'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { format } from 'date-fns';

import { apiTodo } from '@/api/todo';
const apiTodoList = { apiTodo }

export default function ToDoHomePage() {

    const [taskType, setTaskType] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskStartTime, setTaskStartTime] = useState('');
    const [taskEndTime, setTaskEndTime] = useState('');
    const [taskStartTimeClick, setTaskStartTimeClick] = useState(false);
    const [taskEndTimeClick, setTaskEndTimeClick] = useState(false);
    const [twoDateValid, setTwoDateValid] = useState(false);

    function submitCreateTodo() {
        console.log('Form submitted');
        if (!twoDateValid) {
            toast.error('Form is not valid');
        }
        const data = apiTodoList

        console.log('data:', data);
    }

    const checkDate = (date: string) => {
        return format(date, 'yyyy-MM-dd')
    }

    const checkEndTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskEndTimeClick(true)
        setTaskEndTime(checkDate(event.target.value));
    };

    const checkStartTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskStartTimeClick(true)
        setTaskStartTime(checkDate(event.target.value));
    };

    useEffect(() => {
        console.log('Task start time:', taskStartTime);
        console.log('Task end time:', taskEndTime);

        if (!taskStartTime && taskStartTimeClick && new Date(taskStartTime)) {
            toast.error('Task start time is not valid');
            setTwoDateValid(false)
        }
        if (!taskEndTime && taskEndTimeClick && new Date(taskEndTime)) {
            toast.error('Task end time is not valid');
            setTwoDateValid(false)
        }
        if (taskStartTime && taskEndTime && new Date(taskEndTime) <= new Date(taskStartTime)) {
            toast.error('Task end time is must be later than task start time');
            setTwoDateValid(false)
        }
    }, [taskStartTime, taskEndTime]);

    return (
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
                                <select name="" id="" value={taskPriority} onChange={event => setTaskPriority(event.target.value)}>
                                    <option value="">Important</option>
                                    <option value="">Normal</option>
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

    )
}