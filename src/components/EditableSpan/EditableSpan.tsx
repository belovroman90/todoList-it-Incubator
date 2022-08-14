import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import s from './EditableSpan.module.css';

type EditableSpanProps = {
    title: string
    setEditTitle: (title: string) => void
    classTodoList?: string
}

export const EditableSpan: FC<EditableSpanProps> = ({classTodoList, title, ...props}) => {

    const [titleInput, setTitleInput] = useState(title)
    const [editMode, setEditMode] = useState(false)

    function onEditMode() {
        setEditMode(true)
    }

    function offEditMode() {
        titleInput.trim() &&
        setEditMode(false)
        props.setEditTitle(titleInput)
    }

    function onEnter(e: KeyboardEvent<HTMLInputElement>) {
        e.key === 'Enter' && offEditMode();
    }

    function changeTitleInput(e: ChangeEvent<HTMLInputElement>) {
        setTitleInput(e.currentTarget.value)
    }

    const classTitle = classTodoList ? classTodoList : s.title

    return (
        editMode ? <input
                className={s.input}
                value={titleInput}
                autoFocus
                onBlur={offEditMode}
                onChange={changeTitleInput}
                onKeyPress={onEnter}
            /> :
            <span
                className={classTitle}
                onDoubleClick={onEditMode}
            >{title}</span>
    );
};