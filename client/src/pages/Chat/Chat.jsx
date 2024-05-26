import React, { useState, useEffect } from "react";
import AIService from "../../service/AIService";
import cl from "./Chat.module.css"; 

export const Chat = () => {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);

    const sendMessage = async () => {
        if (!message.trim()) return;
        const data = await AIService.sendMessage(message);
        setConversation([...data]);
        setMessage('');
    };

    const loadData = async () => {
        const { data } = await AIService.getChat();
        setConversation([...data])
      };
    
      useEffect(() => {
        loadData();
      }, []);

    return (
        <div className={cl.root}>
            <div className={cl.chatbox}>
                {conversation.map((msg, index) => (
                    <div key={index} className={`${cl.message} ${msg.role === 'user' ? cl.user : cl.assistant}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className={cl.inputs}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className={cl.inputText}
                />
                <button onClick={sendMessage} className={cl.sendButton}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
