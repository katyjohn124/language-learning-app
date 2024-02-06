// SearchResult.js
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './SearchResult.module.css';
import '../community/iconfont.css';

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const [searchResultsData, setSearchResultsData] = useState([]);
    const navigate = useNavigate(); // 添加这行来获取navigate函数

    // 提取URL查询参数
    const searchTerm = searchParams.get('keyword');
    const sortFilter = searchParams.get('sort');

    useEffect(() => {
        // 发起请求到后端API
        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/community/search?keyword=${encodeURIComponent(searchTerm)}&sort=${sortFilter}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSearchResultsData(data); // 存储搜索结果
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };
        fetchSearchResults();
    }, [searchTerm, sortFilter]); // 当搜索词或排序变化时重新发起请求

    // 添加一个函数用于处理帖子点击事件
    const handlePostClick = (id) => {
        navigate(`/posts/${id}/post-detail`); // 使用帖子ID导航到帖子详情页
    };

    return (
        <div className={styles['search-results']}>
            {searchResultsData.length === 0 ? (
                <div>No results found</div>
            ) : (
                searchResultsData.map((result) => (
                    // 为每个搜索结果项添加点击事件处理器
                    <div key={result.id} className={styles['search-result-item']} onClick={() => handlePostClick(result.id)}>
                        <h3>{result.title}</h3>
                        <p>{result.content}</p>
                        <p>
                            <i className="iconfont icon-aixin" /> {result.likes}
                        </p>
                        <p>
                            <i className="iconfont icon-pinglun" />
                            {result.comments_count}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchResult;
