import {v1} from 'uuid';
import {FilterType, TodoListsType} from "../App";
import {
    AddTodoListAC,
    ChangeFilterAT,
    ChangeTodoListTitleAT,
    RemoveTodoListAT,
    todoListsReducer
} from "./todolists-reducer";

test('correct todoList should be removed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    const startState: TodoListsType = [
        {id: todoListID1, title: "What to learn", filter: "All"},
        {id: todoListID2, title: "What to buy", filter: "All"},
    ]

    function RemoveTodoListAC(id: string): RemoveTodoListAT {
        return {
            type: 'REMOVE-TODOLIST',
            todoListID: id,
        }
    }

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListID2)
})

test('correct todoList should be added', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let newTodoListTitle = "New TodoList"

    const startState: TodoListsType = [
        {id: todoListID1, title: "What to learn", filter: "All"},
        {id: todoListID2, title: "What to buy", filter: "All"},
    ]

    // function AddTodoListAC(title: string): AddTodoListAT {
    //     return {
    //         type: "ADD-TODOLIST",
    //         todoListID: 'id',
    //         title,
    //     }
    // }

    const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})

test('correct todoList should change its name', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let newTodoListTitle = "New TodoList"

    const startState: TodoListsType = [
        {id: todoListID1, title: "What to learn", filter: "All"},
        {id: todoListID2, title: "What to buy", filter: "All"},
    ]

    function ChangeTodoListTitleAC(id: string, title: string): ChangeTodoListTitleAT {
        return {
            type: 'CHANGE-TODOLIST-TITLE',
            todoListID: id,
            title,
        }
    }

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todoListID2, newTodoListTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter of todolist should be changed', () => {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let newFilter: FilterType = "Completed"

    const startState: TodoListsType = [
        {id: todoListID1, title: "What to learn", filter: "All"},
        {id: todoListID2, title: "What to buy", filter: "All"},
    ]

    function ChangeFilterAC(id: string, filter: FilterType): ChangeFilterAT {
        return {
            type: 'CHANGE-TODOLIST-FILTER',
            todoListID: id,
            filter,
        }
    }

    const endState = todoListsReducer(startState, ChangeFilterAC(todoListID2, newFilter))

    expect(endState[0].filter).toBe("All")
    expect(endState[1].filter).toBe(newFilter)
})