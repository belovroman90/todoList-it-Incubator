import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import s from './Todolist.module.css'
import {FilterType, TaskType, TodoListType} from "../App";
import {AddItem} from "./AddItem";

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

    const onClickChangeFilter = (filter: FilterType) => {
        return function () {
            props.changeFilter(todoList.id, filter);
        }
    }
    const removeTodoList = () => props.removeTodoList(todoList.id);

    const addTask = (title: string) => props.addTask(todoList.id, title);

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

    return (
        <div className={s.container}>
            <div className={s.titleButton}>
                <h3>{todoList.title}</h3>
                <button className={s.tlDelButton}
                        onClick={removeTodoList}
                >del
                </button>
            </div>
            <AddItem
                addItem={addTask}
            />
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