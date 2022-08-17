import {v1} from 'uuid';
import {FilterType, TodoListsType} from "../AppWithReducers";
import {
    AddTodoListAC, ChangeFilterAC,
    ChangeTodoListTitleAC, RemoveTodoListAC,
    RemoveTodoListAT,
    todoListsReducer
} from "./todolists-reducer";

let todoListID1: string
let todoListID2: string
let startState: TodoListsType

beforeEach(() => {
    todoListID1 = v1()
    todoListID2 = v1()
    startState = [
        {id: todoListID1, title: "What to learn", filter: "All"},
        {id: todoListID2, title: "What to buy", filter: "All"}
    ]
})

test('correct todoList should be removed', () => {

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
})

test('correct todoList should be added', () => {

    let newTodoListTitle = "New TodoList"

    const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})

test('correct todoList should change its name', () => {

    let newTodoListTitle = "New TodoList"

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todoListID2, newTodoListTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterType = "Completed"

    const endState = todoListsReducer(startState, ChangeFilterAC(todoListID2, newFilter))

    expect(endState[0].filter).toBe("All")
    expect(endState[1].filter).toBe(newFilter)
})