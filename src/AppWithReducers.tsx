import React, {useCallback} from 'react';
import s from './App.module.css';
import {TodoListMemo} from "./components/TodoList/TodoList";
import {
    AddTodoListAC,
    ChangeFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./reducers/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AddItemMemo} from "./components/AddItem/AddItem";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [todoListId: string]: Array<TaskType>
}
export type FilterType = "All" | "Active" | "Completed" | null
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type TodoListsType = Array<TodoListType>

export const AppWithReducers = () => {

    const todoLists = useSelector<AppRootStateType, TodoListsType>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodoListAC(title))
    }, [])

    const todoListsComponents = todoLists.map(tl => {
        return (
            <TodoListMemo
                tasks={tasks[tl.id]}
                todoList={tl}
                key={tl.id}
            />
        )
    })

    return (
        <div className={s.app}>
            <AddItemMemo
                classAddItem={s.inputContainer}
                addItem={addTodoList}
            />
            {todoListsComponents}
        </div>
    )
}