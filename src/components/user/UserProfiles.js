// 1

// import React, { useState, useEffect, useRef } from 'react';
// import './UserProfiles.css';




// const UserProfiles = ({ username }) => {
//     const [question, setQuestion] = useState('');
//     const [conversation, setConversation] = useState([]);
//     const endOfMessagesRef = useRef(null);
//     const [isLoading, setIsLoading] = useState(false);


//     const quickSuggestions = [
//         '可理解性输入假说是什么?',
//         '输入多少个小时才能达到目标语言的b1——b2水平?',
//         '口语怎么练习，推荐哪些平台?',
//         'Feedback(我需要大家的反馈来完善这个网站...)'
//     ];

//     const handleNewQuestion = async (questionText) => {
//         if (!questionText.trim()) return;
//         // 开始请求时设置加载状态为 true
//         setIsLoading(true);
//         const newMessage = { type: 'user', text: questionText };
//         setConversation([...conversation, newMessage]);

//         try {

//             const response = await fetch('http://localhost:3001/api/generate-text', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ prompt: questionText })
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const aiMessage = { type: 'ai', text: data.text };
//             setConversation([...conversation, aiMessage]);
//         } catch (error) {
//             console.error('Fetch error:', error);
//             const errorMessage = { type: 'ai', text: 'Sorry, I am unable to fetch the answer right now.' };
//             setConversation([...conversation, errorMessage]);
//         } finally {
//             // 请求完成后设置加载状态为 false
//             setIsLoading(false);
//         }
//     };


//     const addQuickSuggestion = (suggestion) => {
//         setQuestion(suggestion);
//     };


//     useEffect(() => {
//         endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [conversation]);

//     return (
//         <div className="chat-container">
//             <div className="chat-header">
//                 <span className="logo">Fluency AI</span>
//                 <span className="welcome-message">Hi ~ {username}</span>
//             </div>
//             <div className="quick-suggestions">
//                 {quickSuggestions.map((suggestion, index) => (
//                     <button
//                         key={index}
//                         className="suggestion-button"
//                         onClick={() => addQuickSuggestion(suggestion)}
//                         aria-label={`Use quick suggestion: ${suggestion}`}
//                     >
//                         {suggestion}
//                     </button>
//                 ))}
//             </div>
//             <div className="chat-body">
//                 {conversation.map((message, index) => (
//                     <div key={index} className={`message ${message.type}`} tabIndex={0}>
//                         {message.text}
//                     </div>
//                 ))}
//                 <div ref={endOfMessagesRef}></div>
//             </div>
//             <div className="chat-footer">
//                 <input
//                     type="text"
//                     className="message-input"
//                     placeholder="Type your message..."
//                     value={question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleNewQuestion(question)}
//                     aria-label="Type your message here"
//                 />
//                 <button className="send-button" onClick={() => handleNewQuestion(question)} aria-label="Send message">
//                     {isLoading ? 'Loading...' : 'Send'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default UserProfiles;




// 2

import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MDEditor from "@uiw/react-md-editor";
import InputBox from "./InputBox";




import "./UserProfiles.css";
// import logo from "../assets/img/gemini-small.png";


const API_KEY = "AIzaSyBMTnL6NavVdndNYxAojbwNnTaM9PFnGR8";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const Header = () => {
    return (
        <div className="header">
            <h1 id="chat-header">

                <b style={{ marginLeft: 5 }}>Fluency AI</b>
            </h1>
            <small>Hi~</small>
        </div>
    );
};

const UserProfiles = () => {
    const chatContainerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Auto-scroll to the bottom of the chat container when new messages are added
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    const sendMessage = async (inputText) => {
        if (!inputText) {
            return;
        }

        // Update messages with the user message
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: inputText, sender: "user", timestamp: new Date() },
        ]);

        setLoading(true);

        try {
            const result = await model.generateContent(inputText);
            const text = result.response.text();

            // Check if the response is code before updating messages
            const isCode = text.includes("```");

            // Update messages with the AI response
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: text,
                    sender: "ai",
                    timestamp: new Date(),
                    isCode, // Add a flag to identify code snippets
                },
            ]);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("generateContent error: ", error);
        }
    };

    return (
        // <div className={`chat-window`}>
        //     <Header />
        //     <div className="chat-container" ref={chatContainerRef}>
        //         {messages.map((message, index) => (
        //             <div
        //                 key={index}
        //                 className={`message ${message.sender === "user" ? "user" : "ai"}`}
        //             >
        //                 {message.isCode ? (
        //                     <MDEditor.Markdown
        //                         source={message.text}
        //                         style={{ whiteSpace: "pre-wrap" }}
        //                     />
        //                 ) : (
        //                     <>
        //                         <p className="message-text">{message.text}</p>
        //                         <span
        //                             className={`time ${message.sender === "user" ? "user" : "ai"
        //                                 }`}
        //                         >
        //                             {message.timestamp
        //                                 ? dayjs(message.timestamp).format("DD.MM.YYYY HH:mm:ss")
        //                                 : ""}
        //                         </span>
        //                     </>
        //                 )}
        //             </div>
        //         ))}
        //     </div>
        //     <InputBox sendMessage={sendMessage} loading={loading} />
        // </div>
        <div className="gemini-pro-container">
            <aside className="chat-history">
                <div className="history-entry selected">会话 #1</div>
                <div className="history-entry">会话 #2</div>

            </aside>

            <section className="chat-window">
                <div className="chat-header">
                    <span className="header-title">Gemini Pro</span>
                    <button className="toggle-history-button">+</button>

                </div>

                <div className="chat-messages-container" ref={chatContainerRef}>
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.sender === "user" ? "user" : "ai"}`}
                        >
                            {message.isCode ? (
                                <MDEditor.Markdown
                                    source={message.text}
                                    style={{ whiteSpace: "pre-wrap" }}
                                />
                            ) : (
                                <>
                                    <p className="message-text">{message.text}</p>
                                    <span
                                        className={`time ${message.sender === "user" ? "user" : "ai"
                                            }`}
                                    >
                                        {message.timestamp
                                            ? dayjs(message.timestamp).format("DD.MM.YYYY HH:mm:ss")
                                            : ""}
                                    </span>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <div className="chat-input-box">
                    <InputBox sendMessage={sendMessage} loading={loading} />
                </div>
            </section>
        </div>



    );
};

export default UserProfiles;
