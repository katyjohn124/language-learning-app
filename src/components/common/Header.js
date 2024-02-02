import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
const Header = () => {
    return (
        <header>
            <div className='logo'>
                <NavLink to="/"></NavLink>
            </div>
            <nav className='nav'>
                <NavLink
                    to="/discussionboard"
                    className={({ isActive }) => isActive ? 'active' : undefined}
                >
                    社区讨论
                </NavLink>
                <NavLink
                    to="/learningcategory"
                    className={({ isActive }) => isActive ? 'active' : undefined}
                >
                    学习功能
                </NavLink>
                <div className='search'>搜索区</div>
                <NavLink
                    to="/userprofiles"
                    className={({ isActive }) => isActive ? 'active' : undefined}
                >
                    AI助手
                </NavLink>
            </nav>

        </header>
    )
}

export default Header