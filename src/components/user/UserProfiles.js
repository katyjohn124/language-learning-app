import React, { useEffect, useRef, useState } from 'react'
import gptLogo from '../../assets/chatgpt.svg'
import styles from './UserProfiles.module.css'
import addBtn from '../../assets/add-30.png'
import msgIcon from '../../assets/message.svg'
import home from '../../assets/home.svg'
import saved from '../../assets/bookmark.svg'
import rocket from '../../assets/rocket.svg'
import sendBtn from '../../assets/send.svg'
import userIcon from '../../assets/user-icon.png'
import gptImgLogo from '../../assets/chatgptLogo.svg'
import { useNavigate } from 'react-router-dom';
import modalStyles from './Modal.module.css';
import WeChatPay from '../../assets/17b32914e493fa51ee2478be8270598.jpg'


const UserProfiles = () => {
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [includeEmail, setIncludeEmail] = useState(false);


    const openFeedbackModal = () => setIsFeedbackModalOpen(true);
    const closeFeedbackModal = () => setIsFeedbackModalOpen(false);

    const openPaymentModal = () => setIsPaymentModalOpen(true);
    const closePaymentModal = () => setIsPaymentModalOpen(false);


    const navigate = useNavigate();
    const msgEnd = useRef(null)
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([
        {
            text: "Hi,I am ChatGPT,How can I help you?",
            isBot: true,
        }
    ])

    const handleHomeClick = () => {
        navigate('/discussionboard');
    }

    useEffect(() => {
        msgEnd.current.scrollIntoView()
    }, [messages])

    const handleSend = async () => {
        if (input.trim() === '') {
            return; // 如果输入为空，则不发送请求
        }

        const newMessages = [...messages, { text: input, isBot: false }];
        setMessages(newMessages);
        setInput(''); // 清空输入框

        try {
            const response = await fetch('http://localhost:3001/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: [{ role: "user", content: input }] }),
            });

            // 首先检查响应是否OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 获取响应文本
            const responseText = await response.text();
            console.log('Received response text:', responseText);

            if (responseText) {
                // 如果响应文本不为空，则尝试解析为JSON
                const data = JSON.parse(responseText);
                setMessages([...newMessages, { text: data.choices[0].message.content, isBot: true }]);
            } else {
                // 如果响应文本为空，则抛出错误
                console.error('Response text is empty.');
            }
        } catch (error) {
            console.error('Error in handleSend:', error);
            // 处理错误，可能是网络问题或JSON解析问题
            // 这里可以根据实际需求显示错误消息
        }
    };

    const handleEnter = async (e) => {
        if (e.key === 'Enter') await handleSend()


    }

    // const handleQuery = async (e) => {
    //     const text = e.target.value;
    //     setMessages([
    //         ...messages,
    //         {
    //             text,
    //             isBot: false
    //         },
    //     ])
    //     const res = await sendMsgToOpenAI(text)
    //     console.log(res)
    //     setMessages([
    //         ...messages,
    //         {
    //             text,
    //             isBot: false
    //         },
    //         {
    //             text: res,
    //             isBot: true
    //         },
    //     ])
    // }

    const handlePresetQuery = async (query) => {
        // 发送请求到后端，并将query作为消息内容
        const response = await fetch('http://localhost:3001/api/openai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [{ role: "user", content: query }] }),
        });
        const data = await response.json();
        if (data.choices) {
            // 将回复添加到messages数组中
            setMessages(messages => [...messages, { text: query, isBot: false }, { text: data.choices[0].message.content, isBot: true }]);
        }
    };


    const submitFeedback = async (e) => {
        e.preventDefault();

        // Send the feedback to your backend server
        try {
            const response = await fetch('http://localhost:3001/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    feedback,
                    includeEmail,
                    userEmail: includeEmail ? 'nongjuynu0425@gmail.com' : undefined,
                }),
            });

            if (response.ok) {
                // Handle successful feedback submission
                closeFeedbackModal();
                // Reset the feedback form
                setFeedback('');
                setIncludeEmail(false);
            } else {
                // Handle server errors
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Feedback submission error:', error);
        }
    };


    return (
        <div className={styles.App}>
            <div className={styles.sideBar}>
                <div className={styles.upperSide}>
                    <div className={`${styles.upperSideTop} ${styles.brandContainer}`}>
                        <img src={gptLogo} alt='Logo' className={styles.logo} />
                        <span className={styles.brand}>ChatGPT</span>
                    </div>
                    <button className={styles.midBtn} onClick={() => { window.location.reload() }}>
                        <img src={addBtn} alt='new chat' className={styles.addBtn} />
                        New Chat
                    </button>
                    <div className={styles.upperSideBottom}>
                        <button className={styles.query} onClick={() => handlePresetQuery('详细解释语言学习可理解性输入假说是什么？')}><img src={msgIcon} alt='Query' />可理解性输入假说是什么?</button>
                        <button className={styles.query} onClick={() => handlePresetQuery('输入多少个小时才能达到B1~B2水平?')}><img src={msgIcon} alt='Query' />输入多少个小时才能达到B1~B2水平?</button>
                        <button className={styles.query} onClick={() => handlePresetQuery('英语口语怎么练习？推荐哪些外教平台？')}><img src={msgIcon} alt='Query' />口语怎么练习?</button>
                    </div>
                </div>
                <div className={styles.lowerSide}>
                    <div className={styles.listItems} onClick={handleHomeClick}>
                        <img src={home} alt='Home' className={styles.listItemsImg} />Home
                    </div>
                    <div className={styles.listItems} onClick={openFeedbackModal}>
                        <img src={saved} alt='Feedback' className={styles.listItemsImg} />
                        Feedback
                    </div>

                    {isFeedbackModalOpen && (
                        <div className={modalStyles.backdrop}>
                            <div className={modalStyles.content}>
                                <h2>Feedback about ChatGPT</h2>
                                <form className={modalStyles.form} onSubmit={submitFeedback}>
                                    <textarea
                                        className={modalStyles.textarea}
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Write feedback about ChatGPT..."
                                    />
                                    <label className={modalStyles.label}>
                                        <input
                                            type="checkbox"
                                            checked={includeEmail}
                                            onChange={(e) => setIncludeEmail(e.target.checked)}
                                        />
                                        Include my email address
                                    </label>
                                    <button className={modalStyles.submitButton} type="submit">
                                        Send to author's email
                                    </button>
                                </form>
                                <button className={modalStyles.closeButton} onClick={closeFeedbackModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    )}


                    <div className={styles.listItems} onClick={openPaymentModal}>
                        <img src={rocket} alt='Buy me a coffee' className={styles.listItemsImg} />
                        Buy me a coffee
                    </div>

                    {isPaymentModalOpen && (
                        <div className={modalStyles.backdrop}>
                            <div className={modalStyles.paymentModalContent}>
                                <h2 className={modalStyles.paymentText}>Support My Work</h2>
                                <p className={modalStyles.paymentText}>如果你认可我的贡献，请买杯蜜雪冰城给我！</p>
                                <img src={WeChatPay} alt="WeChat Pay QR Code" className={modalStyles.paymentImage} />
                                <p className={modalStyles.paymentText}>Scan the QR code with WeChat to make a payment.</p>
                                <button className={modalStyles.closeButton} onClick={closePaymentModal}>Close</button>
                            </div>
                        </div>
                    )}


                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.chats}>
                    <div className={styles.chat}>
                        <img className={styles.chatImg} src={userIcon} alt='' /><p className={styles.txt}>Hi~</p>
                    </div>
                    {messages.map((message, i) =>
                        <div key={i} className={`${styles.chat} ${message.isBot ? styles.bot : ''}`}>
                            <img className={styles.chatImg} src={message.isBot ? gptImgLogo : userIcon} alt='' />
                            <p className={styles.txt}>
                                {message.text}
                            </p>
                        </div>
                    )}
                    <div ref={msgEnd} />
                </div>
                <div className={styles.chatFooter}>
                    <div className={styles.inp}>
                        <input type='text' placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e) => { setInput(e.target.value) }} />
                        <button className={styles.send} onClick={handleSend}><img src={sendBtn} alt='Send' /></button>
                    </div>
                    <p>ChatGPT can make mistakes. Consider checking important information.</p>
                </div>
            </div>
        </div>
    )
}

export default UserProfiles
