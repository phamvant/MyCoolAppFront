import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';

interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}

interface Request {
    id: number;
    sender: string;
    title: string;
    state: 'pending' | 'processing' | 'done';
    avatar: string;
    department: string;
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
    description: string;
    messages: Message[];
}

const RequestChat: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [newMessage, setNewMessage] = useState('');

    const [request] = useState<Request>({
        id: 1,
        sender: "John Doe",
        title: "Project Proposal Review",
        state: 'pending',
        avatar: "JD",
        department: "Engineering",
        priority: 'high',
        createdAt: "2024-03-15T10:30:00",
        description: "Need review for the new project proposal. The document includes budget estimates, timeline, and resource allocation plans.",
        messages: [
            { id: 1, sender: "John Doe", content: "Hey, can you review the latest project proposal?", timestamp: "2 mins ago" },
            { id: 2, sender: "Admin", content: "Sure, I'll take a look at it.", timestamp: "1 min ago" },
            { id: 3, sender: "John Doe", content: "Thanks! Looking forward to your feedback.", timestamp: "Just now" },
            { id: 4, sender: "Admin", content: "Sure, I'll take a look at it.", timestamp: "1 min ago" },
            { id: 5, sender: "Admin", content: "Sure, I'll take a look at it.", timestamp: "1 min ago" },
            { id: 6, sender: "Admin", content: "Sure, I'll take a look at it.", timestamp: "1 min ago" },
            { id: 7, sender: "Admin", content: "Sure, I'll take a look at it.", timestamp: "1 min ago" },

        ]
    });

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        // Add new message logic here
        setNewMessage('');
    };

    const getStateColor = (state: Request['state']) => {
        switch (state) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'done': return 'bg-green-100 text-green-800';
        }
    };

    const getPriorityColor = (priority: Request['priority']) => {
        switch (priority) {
            case 'low': return 'text-gray-600';
            case 'medium': return 'text-orange-600';
            case 'high': return 'text-red-600';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <button
                onClick={() => navigate('/requests')}
                className="p-6 flex items-center text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Requests
            </button>
            <div className="overflow-auto p-6 pt-0">
                <div className="h-full">

                    <div className="flex space-x-6 h-full">
                        {/* Request Information - Left Side */}
                        <div className="w-1/3 bg-white rounded-lg shadow-md p-6 overflow-y-auto">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-medium text-lg">{request.avatar}</span>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">{request.sender}</h2>
                                    <span className="text-gray-600">{request.department}</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{request.title}</h3>
                                    <p className="text-gray-600">{request.description}</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-500">Status</label>
                                        <span className={`ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStateColor(request.state)}`}>
                                            {request.state}
                                        </span>
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-500">Priority</label>
                                        <span className={`ml-3 font-medium ${getPriorityColor(request.priority)}`}>
                                            {request.priority.toUpperCase()}
                                        </span>
                                    </div>

                                    <div>
                                        <label className="text-sm text-gray-500">Created</label>
                                        <div className="text-gray-900">{formatDate(request.createdAt)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chat Section - Right Side */}
                        <div className="flex-1 bg-white rounded-lg shadow-md flex flex-col">
                            {/* Chat Header */}
                            <div className="p-4 border-b">
                                <h2 className="text-lg font-semibold">Chat History</h2>
                            </div>

                            {/* Chat Messages - Scrollable Area */}
                            <div className="flex-1 overflow-hidden">
                                <div className="h-full overflow-y-auto px-6 py-4">
                                    <div className="space-y-4">
                                        {request.messages.map(message => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.sender === 'Admin' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`max-w-[70%] rounded-lg px-4 py-2 ${message.sender === 'Admin'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    <div className="text-sm">{message.content}</div>
                                                    <div className={`text-xs mt-1 ${message.sender === 'Admin'
                                                        ? 'text-blue-100'
                                                        : 'text-gray-500'
                                                        }`}>
                                                        {message.timestamp}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Message Input - Fixed at Bottom */}
                            <div className="border-t p-4 bg-white">
                                <form onSubmit={handleSendMessage}>
                                    <div className="flex space-x-4">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type your message..."
                                            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <button
                                            type="submit"
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 flex items-center"
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RequestChat;
