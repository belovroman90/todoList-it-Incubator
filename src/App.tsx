import React, {useState} from 'react';
import s from './App.module.css';
import {TodoList} from "./components/TodoList";
import {v1} from "uuid";
import {AddItem} from "./components/AddItem";

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

function App() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const [todoLists, setTodoList] = useState<TodoListsType>([
        {id: todoListId_1, title: "What to learn", filter: "All"},
        {id: todoListId_2, title: "What to read", filter: "All"},
    ])
    const [tasks, setTasks] = useState<TasksType>({
        [todoListId_1]: [
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Native JavaScript", isDone: false},
            {id: v1(), title: "TypeScript", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Достоевский", isDone: false},
            {id: v1(), title: "Толстой", isDone: false},
            {id: v1(), title: "Горький", isDone: false},
        ],
    });

    const changeFilter = (todoListId: string, filter: FilterType) => {
        setTodoList(todoLists.map(el => el.id === todoListId ? {...el, filter} : el));
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {id: newTodoListId, title, filter: "All"}
        setTodoList([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodoListId]: []})
    }
    const removeTodoList = (todoListId: string) => {
        setTodoList(todoLists.filter(el => el.id !== todoListId));
        delete tasks[todoListId];
    }

    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => el.id !== taskId)});
    }
    const addTask = (todoListId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]});
    }
    const changeTaskStatus = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(el => el.id === taskId
                ? {...el, isDone} : el)
        });
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

export default App;