import React, {ChangeEvent, useCallback} from 'react'
import s from "../Task/Task.module.css"
import {EditableSpanMemo} from "../EditableSpan/EditableSpan"
import {TaskType, TodoListType} from "../../AppWithReducers";
import {FC} from "react";
import {useDispatch} from "react-redux";
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "../../reducers/tasks-reducer";

type TaskPropsType = {
    todoList: TodoListType
    task: TaskType
}

const Task: FC<TaskPropsType> = ({todoList, task, ...props}) => {

    const dispatch = useDispatch()

    const onClickRemoveTask = useCallback(() => dispatch(RemoveTaskAC(todoList.id, task.id)), [todoList.id, task.id])

    const onChangeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ChangeTaskStatusAC(todoList.id, task.id, e.currentTarget.checked))}, [todoList.id, task.id])

    const changeTaskTitle = useCallback((title: string) => dispatch(ChangeTaskTitleAC(todoList.id, task.id, title))
        , [todoList.id, task.id])

    const classChecked = `${task.isDone ? s.taskChecked : ''} ${s.tasksLi}`

    return (
        <li key={task.id} className={classChecked}>
            <div className={s.checkTitle}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={onChangeTaskStatus}/>
                <EditableSpanMemo
                    title={task.title}
                    setEditTitle={changeTaskTitle}
                />
            </div>
            <button onClick={onClickRemoveTask}>DEL</button>
        </li>
    )
}

export const TaskMemo = React.memo(Task)