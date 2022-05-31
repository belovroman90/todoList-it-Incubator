import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import s from './Todolist.module.css'
import {FilterType, TaskType, TodoListType} from "../App";

type TodoListPropsType = {
    tasks: Array<TaskType>
    todoList: TodoListType
    changeFilter: (todoListId: string, filter: FilterType) => void
    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todoListId: string) => void
}

export const TodoList: FC<TodoListPropsType> = ({todoList, ...props}) => {

    const [error, setError] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState<string>('');

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
        error && setError(false);
    }
    const onClickAddTask = () => {
        taskTitle.trim() !== "" ? props.addTask(todoList.id, taskTitle) : setError(true);
        setTaskTitle("");
    }
    const onClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onClickAddTask();
    }
    const onClickChangeFilter = (filter: FilterType) => {
        return function () {
            props.changeFilter(todoList.id, filter);
        }
    }

    const classActiveAll = todoList.filter === "All" ? s.active : '';
    const classActiveActive = todoList.filter === "Active" ? s.active : '';
    const classActiveCompleted = todoList.filter === "Completed" ? s.active : '';

    const tasksListItems = props.tasks.length
        ? props.tasks.map(el => {

            const onClickRemoveTask = () => props.removeTask(todoList.id, el.id);
            const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(todoList.id, el.id, e.currentTarget.checked);
            };
            const classChecked = `${el.isDone ? s.taskChecked : ''} ${s.tasksLi}`;

            return (
                <li key={el.id} className={classChecked}>
                    <div className={s.checkTitle}>
                        <input type="checkbox" checked={el.isDone} onChange={onChangeTaskStatus}/>
                        <span>{el.title}</span>
                    </div>
                    <button onClick={onClickRemoveTask}>DEL</button>
                </li>
            )
        })
        : <span>write a task</span>;

    const errorTitle = error ? "ERROR! Write a symbol!" : "write your task";
    const classErrorTitle = error ? s.errorTitle : '';
    const classErrorInput = error ? s.errorInput : s.input;

    const removeTodoList = () => props.removeTodoList(todoList.id);


    return (
        <div className={s.container}>
            <div className={s.titleButton}>
                <h3>{todoList.title}</h3>
                <button className={s.tlDelButton}
                        onClick={removeTodoList}
                >del
                </button>
            </div>
            <span className={classErrorTitle}>{errorTitle}</span>
            <div>
                <input className={classErrorInput}
                       value={taskTitle}
                       onChange={onChangeInput}
                       onKeyPress={onClickEnter}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul className={s.tasksUl}>
                {tasksListItems}
            </ul>
            <div>
                <button
                    className={classActiveAll}
                    onClick={onClickChangeFilter('All')}>All
                </button>
                <button
                    className={classActiveActive}
                    onClick={onClickChangeFilter('Active')}>Active
                </button>
                <button
                    className={classActiveCompleted}
                    onClick={onClickChangeFilter('Completed')}>Completed
                </button>
            </div>
        </div>
    )
}