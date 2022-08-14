import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodoListAC} from "./todolists-reducer";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE'
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'

export type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>
export type AddTaskAT = ReturnType<typeof AddTaskAC>
export type ChangeTaskTitleAT = ReturnType<typeof ChangeTaskTitleAC>
export type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>
export type AddTodoListAT = ReturnType<typeof AddTodoListAC>

type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskTitleAT | ChangeTaskStatusAT | AddTodoListAT

export const tasksReducer = (tasks: TasksType, action: ActionsType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...tasks, [action.todoListID]: tasks[action.todoListID].filter(t => action.taskID !== t.id)}
        case "ADD-TASK":
            return {
                ...tasks,
                [action.todoListID]: [...tasks[action.todoListID], {id: v1(), title: action.title, isDone: false}]
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case "ADD-TODOLIST":
            return {
                ...tasks, [action.todoListID]: []
            }
        default:
            return tasks
    }
}

export const RemoveTaskAC = (todoListID: string, taskID: string) => {
    return {type: REMOVE_TASK, todoListID, taskID} as const
}
export const AddTaskAC = (todoListID: string, title: string) => {
    return {type: ADD_TASK, todoListID, title} as const
}
export const ChangeTaskTitleAC = (todoListID: string, taskID: string, title: string) => {
    return {type: CHANGE_TASK_TITLE, todoListID, taskID, title} as const
}
export const ChangeTaskStatusAC = (todoListID: string, taskID: string, isDone: boolean) => {
    return {type: CHANGE_TASK_STATUS, todoListID, taskID, isDone} as const
}