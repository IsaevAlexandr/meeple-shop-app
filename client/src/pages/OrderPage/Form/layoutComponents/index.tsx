import React, { ReactNode, FC, memo } from 'react';
import css from './styles.module.css';
import cn from 'classnames';

interface FormRowProps {
    children: ReactNode;
    className?: string;
}

export const FormRow: FC<FormRowProps> = memo(({ children, className }) => (
    <div className={cn(css.formFow, className)}>{children}</div>
));

interface LabelProps {
    text: ReactNode;
    children: ReactNode;
}

export const Label: FC<LabelProps> = memo(({ text, children }) => (
    <div className={css.labelContainer}>
        <label className={css.label}>
            <span>{text}</span>
            <div>{children}</div>
        </label>
    </div>
));

interface FormSectionProps {
    title: ReactNode;
    children: ReactNode;
}

export const FormSection: FC<FormSectionProps> = memo(({ title, children }) => (
    <div className={css.labelContainer}>
        <div>{title}</div>
        {children}
    </div>
));
