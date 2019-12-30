import React from 'react';
import css from './styles.module.css';
import cn from 'classnames';

const Pendable = ({ children, pending }: { children: React.ReactNode; pending: boolean }) => (
    <div className={cn(css.root, pending && css.spinner)}>{children}</div>
);

export default Pendable;
