import React, { ReactNode, FC, memo } from 'react';
import { useField, FieldMetaState } from 'react-final-form';
import css from './styles.module.css';

interface ErrorRenderCondition<T = any> {
    (x: FieldMetaState<T>): boolean;
}

const defaultErrorRenderCondition: ErrorRenderCondition = ({ error, touched }) => touched && error;

interface TextareaProps {
    name: string;
    placeholder?: string;
    maxlength?: number;
    rows?: number;
    errorRenderCondition?: ErrorRenderCondition;
}
export const Textarea: FC<TextareaProps> = memo(
    ({
        name,
        placeholder,
        maxlength = 300,
        rows = 10,
        errorRenderCondition = defaultErrorRenderCondition,
    }) => {
        const { input, meta } = useField(name);

        return (
            <>
                <textarea
                    maxLength={maxlength}
                    rows={rows}
                    className={css.textarea}
                    placeholder={placeholder}
                    {...input}
                />
                {errorRenderCondition(meta) && <div className={css.error}>{meta.error}</div>}
            </>
        );
    },
);

interface TextInputProps {
    name: string;
    errorRenderCondition?: ErrorRenderCondition;
}

export const TextInput: FC<TextInputProps> = memo(
    ({ name, errorRenderCondition = defaultErrorRenderCondition }) => {
        const { input, meta } = useField(name);

        return (
            <div className={css.textInput}>
                <input className={css.textInput} type='text' {...input} />
                {errorRenderCondition(meta) && <div className={css.error}>{meta.error}</div>}
            </div>
        );
    },
);

export type Option<T = any> = {
    name: ReactNode;
    value: T;
};

interface SelectProps {
    name: string;
    options: Option[];
    errorRenderCondition?: ErrorRenderCondition;
}

export const Select: FC<SelectProps> = memo(
    ({ name, options, errorRenderCondition = defaultErrorRenderCondition }) => {
        const { input, meta } = useField(name);

        return (
            <div className={css.selectContainer}>
                <select {...input} className={css.select}>
                    {options.map(({ value, name }) => (
                        <option key={value} value={value}>
                            {name}
                        </option>
                    ))}
                </select>
                {errorRenderCondition(meta) && <div className={css.error}>{meta.error}</div>}
            </div>
        );
    },
);
