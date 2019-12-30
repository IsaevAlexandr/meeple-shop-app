import React from 'react';
import css from './styles.module.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
    <div className={css.container}>
        <header className={css.header}>Header</header>
        <main className={css.main}>{children}</main>
        <footer className={css.footer}>Footer</footer>
    </div>
);

export default Layout;
