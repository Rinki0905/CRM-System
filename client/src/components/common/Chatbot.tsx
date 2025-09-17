import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useSelector((state: RootState) => state.auth);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const token = user?.token;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/chatbot`,
                { message: input },
                config
            );
            
            const aiMessage: Message = { sender: 'ai', text: response.data.reply };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error('Chatbot error:', error);
            const errorMessage: Message = { sender: 'ai', text: 'Sorry, I am having trouble connecting.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
                {}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </button>

            {isOpen && (
                <div className="fixed bottom-20 right-5 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
                    <div className="p-3 bg-blue-600 text-white font-bold rounded-t-lg">AI Assistant</div>
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                         {isLoading && <div className="text-left"><span className="inline-block p-2 rounded-lg bg-gray-200">...</span></div>}
                    </div>
                    
                    {}
                    <div className="p-2 border-t flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-1 w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ask something..."
                        />
                        <button 
                            onClick={handleSend}
                            disabled={isLoading || input.trim() === ''}
                            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                        >
                            {}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;