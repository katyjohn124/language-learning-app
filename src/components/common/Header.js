// Header.js

import React from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <NavLink to="/">LOGO</NavLink>
            </div>
            <nav className={styles.nav}>
                <NavLink
                    to="/discussionboard"
                    className={({ isActive }) => isActive ? styles.active : undefined}
                >
                    社区讨论
                </NavLink>
                <NavLink
                    to="/learningcategory"
                    className={({ isActive }) => isActive ? styles.active : undefined}
                >
                    学习功能
                </NavLink>
                <div className={styles.search}>
                    <input type='text' placeholder='请搜索相关帖子...' />
                </div>
                <NavLink
                    to="/userprofiles"
                    className={({ isActive }) => isActive ? styles.active : undefined}
                >
                    AI助手
                </NavLink>
            </nav>
        </header>
    )
}

export default Header;
