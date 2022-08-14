import {TasksType} from "../App";
import {AddTaskAC, ChangeTaskStatusAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";
import {AddTodoListAC} from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {
    const startState: TasksType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };

    const action = RemoveTaskAC("todolistId2", '2');

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    });

})

test('correct task should be added to correct array', () => {
    const startState: TasksType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };

    const action = AddTaskAC("todolistId2", 'juice');

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('bread');
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const startState: TasksType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };

    const action = ChangeTaskStatusAC("todolistId2", '2', false);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('milk');
    expect(endState["todolistId2"][1].isDone).toBe(false);
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };

    const action = AddTodoListAC('new todoList');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('ids should be equals', () => {
    // const startTasksState: TasksStateType = {};
    // const startTodolistsState: Array<TodolistType> = [];
    //
    // const action = addTodolistAC("new todolist");
    //
    // const endTasksState = tasksReducer(startTasksState, action)
    // const endTodolistsState = todolistsReducer(startTodolistsState, action)
    //
    // const keys = Object.keys(endTasksState);
    // const idFromTasks = keys[0];
    // const idFromTodolists = endTodolistsState[0].id;
    //
    // expect(idFromTasks).toBe(action.todolistId);
    // expect(idFromTodolists).toBe(action.todolistId);
});
