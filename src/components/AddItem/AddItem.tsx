import React, {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, KeyboardEvent, useState} from 'react';
import s from "./AddItem.module.css";

type DefaultInputType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputType & {
    addItem?: (title: string) => void
    classAddItem?: string
}

const AddItem: FC<InputPropsType> = ({className, classAddItem, addItem, ...props}) => {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        error && setError(false);
    }

    const onClickAddItem = () => {
        addItem && title.trim() !== "" ? addItem(title) : setError(true)
        setTitle("")
    }

    const onClickEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onClickAddItem();
    }

    const errorTitle = error ? "ERROR! Write a symbol!" : "write your word";

    const classErrorTitle = error ? s.errorTitle : '';
    const classErrorInput = error ? s.errorInput : s.input;

    return (
        <div className={classAddItem}>
            <span className={classErrorTitle}>{errorTitle}</span>
            <div className={s.inputButton}>
                <input
                    value={title}
                    className={`${classErrorInput} ${className}`}
                    onChange={onChangeInput}
                    onKeyPress={onClickEnter}
                />
                <button onClick={onClickAddItem}>+</button>
            </div>
        </div>
    );
}

export const AddItemMemo = React.memo(AddItem)