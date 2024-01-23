import React from 'react';

const AITools = () => {
    // 假设的AI工具数据
    const tools = [
        {
            id: 1,
            name: '工具名称1',
            description: '工具介绍...',
            method: '使用方法...'
        },
        // ...更多工具
    ];

    return (
        <div className="ai-tools">
            {tools.map(tool => (
                <div key={tool.id} className="tool">
                    <h3>{tool.name}</h3>
                    <p>{tool.description}</p>
                    <p>{tool.method}</p>
                </div>
            ))}
        </div>
    );
};

export default AITools;
