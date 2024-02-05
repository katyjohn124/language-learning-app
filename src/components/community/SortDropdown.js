import React from 'react';

const SortDropdown = ({ onSortChange }) => {
    return (
        <select onChange={onSortChange} className="sort-dropdown">
            <option value="new">新帖子</option>
            <option value="hot">热帖</option>
        </select>
    );
};

export default SortDropdown;
