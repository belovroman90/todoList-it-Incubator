import {FilterType, TodoListsType} from "../App";
import {v1} from "uuid";

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER'

export type RemoveTodoListAT = ReturnType<typeof RemoveTodoListAC>
export type AddTodoListAT = ReturnType<typeof AddTodoListAC>
export type ChangeTodoListTitleAT = ReturnType<typeof ChangeTodoListTitleAC>
export type ChangeFilterAT = ReturnType<typeof ChangeFilterAC>

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeFilterAT

export const todoListsReducer = (todoLists: TodoListsType, action: ActionType): TodoListsType => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => action.todoListID !== tl.id)
        case "ADD-TODOLIST":
            return [...todoLists, {id: action.todoListID, title: action.title, filter: "All"}]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoListID: string) => {
    return {type: REMOVE_TODOLIST, todoListID} as const
}
export const AddTodoListAC = (title: string) => {
    return {type: ADD_TODOLIST, todoListID: v1(), title} as const
}
export const ChangeTodoListTitleAC = (todoListID: string, title: string) => {
    return {type: CHANGE_TODOLIST_TITLE, todoListID, title} as const
}
export const ChangeFilterAC = (todoListID: string, filter: FilterType) => {
    return {type: CHANGE_TODOLIST_FILTER, todoListID, filter} as const
}