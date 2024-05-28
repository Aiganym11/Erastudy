import React, { useState, useEffect } from "react";
import AIService from "../../service/AIService";
import cl from "./Chat.module.css"; 
import LoadingSpinner from './LoadingSpinner';

export const Chat = () => {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;
        setIsLoading(true);
        try {
            const data = await AIService.sendMessage(message);
            setConversation(data);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
            setMessage('');
        }
    };

    const loadData = async () => {
        setIsLoading(true);
        try {
            const { data } = await AIService.getChat();
            setConversation(data);
        } catch (error) {
            console.error("Error loading chat:", error);
        } finally {
            setIsLoading(false);
        }
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
                {isLoading && (
                    <div className={cl.loadingContainer}>
                        <LoadingSpinner />
                    </div>
                )}
            </div>
            <div className={cl.inputs}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className={cl.inputText}
                    disabled={isLoading}
                />
                <button onClick={sendMessage} className={cl.sendButton} disabled={isLoading}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
