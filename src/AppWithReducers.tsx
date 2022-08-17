import React, {useReducer} from 'react';
import s from './App.module.css';
import {TodoList} from "./components/TodoList/TodoList";
import {v1} from "uuid";
import {AddItem} from "./components/AddItem/AddItem";
import {
    AddTodoListAC,
    ChangeFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./reducers/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

    const removeTodoList = (todoListId: string) => {
        dispatch(RemoveTodoListAC(todoListId))
    }
    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action)
    }
    const changeTodoListTitle = (todoListId: string, title: string) => {
        dispatch(ChangeTodoListTitleAC(todoListId, title))
    }
    const changeFilter = (todoListId: string, filter: FilterType) => {
        dispatch(ChangeFilterAC(todoListId, filter))
    }

    const removeTask = (todoListId: string, taskId: string) => {
        dispatch(RemoveTaskAC(todoListId, taskId))
    }
    const addTask = (todoListId: string, title: string) => {
        dispatch(AddTaskAC(todoListId, title))
    }
    const changeTaskTitle = (todoListId: string, taskId: string, title: string) => {
        dispatch(ChangeTaskTitleAC(todoListId, taskId, title))
    }
    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todoListId, taskId, isDone))
    }

    const todoListsComponents = todoLists.map(tl => {

        let filterTasks;
        switch (tl.filter) {
            case "Active":
                filterTasks = tasks[tl.id].filter(el => !el.isDone);
                break;
            case "Completed":
                filterTasks = tasks[tl.id].filter(el => el.isDone);
                break;
            default:
                filterTasks = tasks[tl.id];
                break;
        }

        return (
            <TodoList
                tasks={filterTasks}
                todoList={tl}
                key={tl.id}

                changeFilter={changeFilter}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (
        <div className={s.app}>
            <AddItem
                classAddItem={s.inputContainer}
                addItem={addTodoList}
            />
            {todoListsComponents}
        </div>
    );
}