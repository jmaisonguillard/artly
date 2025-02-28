import React from 'react';

const RecentMessages = ({ recent_messages }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Recent Messages</h2>
            </div>
            <div className="p-6">
                <ul className="space-y-4">
                    {recent_messages.map((message) => (
                        <li key={`${message.type}-${message.id}`} className="flex items-start gap-4 min-w-0">
                            <img
                                src={message.sender.avatar}
                                alt={message.sender.name}
                                className="w-10 h-10 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900 truncate">{message.sender.name}</p>
                                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{message.created_at_human}</span>
                                </div>
                                <p className="text-sm text-gray-600 truncate">{message.content}</p>
                                {message.type === 'commission' && (
                                    <p className="text-xs text-purple-600 truncate">
                                        Re: {message.commission.title}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};


export default RecentMessages;
