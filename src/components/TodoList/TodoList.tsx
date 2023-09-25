import {FC, memo, useCallback, useMemo} from 'react';
import s from './Todolist.module.css'
import {FilterType, TaskType, TodoListType} from "../../AppWithReducers";
import {EditableSpanMemo} from "../EditableSpan/EditableSpan";
import {AddItemMemo} from "../AddItem/AddItem";
import {useDispatch} from "react-redux";
import {AddTaskAC} from "../../reducers/tasks-reducer";
import {ChangeFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "../../reducers/todolists-reducer";
import {TaskMemo} from "../Task/Task";

type TodoListPropsType = {
    tasks: Array<TaskType>
    todoList: TodoListType
}

const TodoList: FC<TodoListPropsType> = ({todoList, tasks, ...props}) => {

    const dispatch = useDispatch()

    const removeTodoList = useCallback(() => dispatch(RemoveTodoListAC(todoList.id)), [todoList.id])

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(ChangeTodoListTitleAC(todoList.id, title))
    }, [todoList.id])

    const onClickChangeFilter = useCallback((filter: FilterType) => {
        return function () {
            dispatch(ChangeFilterAC(todoList.id, filter))
        }
    }, [todoList.id])

    const addTask = useCallback((title: string) => dispatch(AddTaskAC(todoList.id, title)), [todoList.id])

    const classActiveAll = todoList.filter === "All" ? s.active : '';
    const classActiveActive = todoList.filter === "Active" ? s.active : '';
    const classActiveCompleted = todoList.filter === "Completed" ? s.active : '';

    const filterTasks = useMemo(() => {
        let tasksFiltered;
        switch (todoList.filter) {
            case "Active":
                return tasksFiltered = tasks.filter(el => !el.isDone)
            case "Completed":
                return tasksFiltered = tasks.filter(el => el.isDone)
            default:
                return tasksFiltered = tasks
        }
    }, [tasks, todoList.filter])

    const tasksListItems = filterTasks.length

        ? filterTasks.map(el => {
            return (
                <TaskMemo
                    task={el}
                    todoList={todoList}
                    key={el.id}
                />)
        })
        : <span>write a task</span>

    return (
        <div className={s.container}>
            <div className={s.titleButton}>
                <EditableSpanMemo
                    title={todoList.title}
                    setEditTitle={changeTodoListTitle}
                    classTodoList={s.todoListTitle}
                />
                <button className={s.tlDelButton}
                        onClick={removeTodoList}
                >del
                </button>
            </div>
            <AddItemMemo
                addItem={addTask}
            />
            <ul className={s.tasksUl}>
                {tasksListItems}
            </ul>
            <div>
                <button
                    className={classActiveAll}
                    onClick={onClickChangeFilter('All')}>All
                </button>
                <button
                    className={classActiveActive}
                    onClick={onClickChangeFilter('Active')}>Active
                </button>
                <button
                    className={classActiveCompleted}
                    onClick={onClickChangeFilter('Completed')}>Completed
                </button>
            </div>
        </div>
    )
}

export const TodoListMemo = memo(TodoList)