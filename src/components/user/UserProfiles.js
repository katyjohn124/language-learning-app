import React, { useState, useEffect, useRef } from 'react';
import './UserProfiles.css';




const UserProfiles = ({ username }) => {
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState([]);
    const endOfMessagesRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);


    const quickSuggestions = [
        '可理解性输入假说是什么?',
        '输入多少个小时才能达到目标语言的b1——b2水平?',
        '口语怎么练习，推荐哪些平台?',
        'Feedback(我需要大家的反馈来完善这个网站...)'
    ];

    const handleNewQuestion = async (questionText) => {
        if (!questionText.trim()) return;
        // 开始请求时设置加载状态为 true
        setIsLoading(true);
        const newMessage = { type: 'user', text: questionText };
        setConversation([...conversation, newMessage]);

        try {

            const response = await fetch('/api/openai/generate-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: questionText })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = { type: 'ai', text: data.text };
            setConversation([...conversation, aiMessage]);
        } catch (error) {
            console.error('Fetch error:', error);
            const errorMessage = { type: 'ai', text: 'Sorry, I am unable to fetch the answer right now.' };
            setConversation([...conversation, errorMessage]);
        } finally {
            // 请求完成后设置加载状态为 false
            setIsLoading(false);
        }
    };


    const addQuickSuggestion = (suggestion) => {
        setQuestion(suggestion);
    };


    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                <span className="logo">Fluency AI</span>
                <span className="welcome-message">Hi ~ {username}</span>
            </div>
            <div className="quick-suggestions">
                {quickSuggestions.map((suggestion, index) => (
                    <button
                        key={index}
                        className="suggestion-button"
                        onClick={() => addQuickSuggestion(suggestion)}
                        aria-label={`Use quick suggestion: ${suggestion}`}
                    >
                        {suggestion}
                    </button>
                ))}
            </div>
            <div className="chat-body">
                {conversation.map((message, index) => (
                    <div key={index} className={`message ${message.type}`} tabIndex={0}>
                        {message.text}
                    </div>
                ))}
                <div ref={endOfMessagesRef}></div>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    className="message-input"
                    placeholder="Type your message..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleNewQuestion(question)}
                    aria-label="Type your message here"
                />
                <button className="send-button" onClick={() => handleNewQuestion(question)} aria-label="Send message">
                    {isLoading ? 'Loading...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default UserProfiles;
