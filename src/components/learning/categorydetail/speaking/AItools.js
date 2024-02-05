import React from 'react';

const AITools = () => {
    // 假设的AI工具数据
    const tools = [
        {
            id: 1,
            name: '1.ChatGPT',
            description: '语言大模型鼻祖，使用它来改作文和英文日记很有用，毕竟写作和口语只差一步之遥，都属于输出一类；同时嫌口语外教课太贵的友友可以用GPT3.5来练简单的交流，有雅思备考需求的友友则需要升级plus用户，使用拿雅思口语题库训练过的GPT。',
            method: '使用方法就是学会阻止好语言逻辑再去询问，把问题的逻辑理清后，发给它，再让它回复出详细的步骤。例如，你好，我刚刚写完雅思作文，以下是我的作文...，请你帮我列出语言错误的地方，然后分别用简单句型和高级句型来重新写一遍...'
        },
        {
            id: 2,
            name: '2.Gemini Ultra',
            description: '谷歌旗下的大模型，据说2024年2月7日会正式发布，有实时视频功能，很期待。',
            method: '如果是我会拿来用在模拟英文面试，以及校准发音和张嘴程度，它实时的反馈其实挺有用。'
        },

    ];

    return (

        <div className="ai-tools">
            <h1>AI工具推荐</h1>
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
