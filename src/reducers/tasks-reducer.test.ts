import {TasksType, TodoListsType} from "../AppWithReducers";
import {AddTaskAC, AddTaskAT, ChangeTaskStatusAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, RemoveTodoListAC, todoListsReducer} from "./todolists-reducer";
import {v1} from "uuid";

let startState: TasksType = {}
let todolistId1: string
let todolistId2: string

beforeEach(() => {

    todolistId1 = v1()
    todolistId2 = v1()

    startState = {
        [todolistId1]: [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        [todolistId2]: [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = RemoveTaskAC(todolistId2, '2');

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        [todolistId1]: [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        [todolistId2]: [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });

})

test('correct task should be added to correct array', () => {

    const action: AddTaskAT = AddTaskAC(todolistId2, 'juice');

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2].length).toBe(4);
    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][0].title).toBe('bread');
    expect(endState[todolistId2][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {

    const action = ChangeTaskStatusAC(todolistId2, '2', false);

    const endState = tasksReducer(startState, action)

    expect(endState[todolistId2][1].title).toBe('milk');
    expect(endState[todolistId2][1].isDone).toBe(false);
})

test('new array should be added when new todolist is added', () => {

    const action = AddTodoListAC('new todoList');

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: TodoListsType = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
})

test('correct remove tasks of id removed todoLists', () => {

    const action = RemoveTodoListAC(todolistId1)
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistId2][0].id).toBe("1")
    expect(endState[todolistId1]).not.toBeDefined()
})