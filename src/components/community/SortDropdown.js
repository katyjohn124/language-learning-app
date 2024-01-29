
import React from 'react';

const SortDropdown = ({ onSortChange }) => {
    return (
        <select onChange={(e) => onSortChange(e.target.value)}>
            <option value="popular">热门帖子</option>
            <option value="newest">最新发布的帖子</option>
            {/* 更多排序选项 */}
        </select>
    );
};

export default SortDropdown;
