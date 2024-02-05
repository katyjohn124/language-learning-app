
import React, { useState } from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Bard_Generated_Image.jpg'
import '../common/iconfont.css'




const Header = () => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');

    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const handleSearchChange = (event) => setSearchTerm(event.target.value);

    const performSearch = () => {
        // 搜索逻辑，可能需要调用API或更新状态
        console.log('Searching for:', searchTerm, 'with filter:', filter);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <NavLink to="/">
                    <img src={logo} alt='logo' />
                </NavLink>
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
                    <button className={styles.dropdownBtn} onClick={toggleDropdown}>
                        {/* <span className="iconfont icon-RectangleCopy1"></span> */}
                    </button>
                    <input type='text' placeholder='请搜索相关帖子...' value={searchTerm} onChange={handleSearchChange} />
                    <button className={styles.searchIcon} onClick={performSearch}>
                        <span className="iconfont icon-RectangleCopy"></span>
                    </button>
                    <div className={`${styles.dropdownContent} ${showDropdown ? styles.show : ''}`}>
                        <a href="/" onClick={(e) => { e.preventDefault(); setFilter('hot'); }}>热帖</a>
                        <a href="/" onClick={(e) => { e.preventDefault(); setFilter('new'); }}>新帖</a>
                    </div>
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
