import React, { useState } from 'react';
import {
    ArrowLeft,
    ArrowRight,
    MessageSquare,
    Paperclip,
    Send,
    Calendar,
    DollarSign,
    Clock,
    CheckCircle,
    FileText,
    Image,
    Download,
    MoreHorizontal,
    ThumbsUp,
    AlertCircle,
    Plus,
    Trash2
} from 'lucide-react';

const CommissionView = ({ commission }) => {
    console.log(commission);
    const [activeTab, setActiveTab] = useState('overview');
    const [replyText, setReplyText] = useState('');


    // Function to determine status badge style
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending-approval':
                return 'bg-yellow-100 text-yellow-800';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800';
            case 'revisions':
                return 'bg-orange-100 text-orange-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Function to determine status text
    const getStatusText = (status) => {
        switch (status) {
            case 'pending-approval':
                return 'Pending Approval';
            case 'in-progress':
                return 'In Progress';
            case 'revisions':
                return 'Revisions Requested';
            case 'completed':
                return 'Completed';
            default:
                return 'Unknown Status';
        }
    };

    // Get current milestone
    const currentMilestone = commission.milestones.find(m => !m.completed);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
                        {/* Back Navigation */}
                        <div className="flex items-center">
                            <a href="#" className="text-gray-600 hover:text-purple-600 flex items-center mr-6">
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Commissions
                            </a>
                            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                                Commission: {commission.title}
                            </h1>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(commission.status)}`}>
                                {getStatusText(commission.status)}
                            </span>
                            <span className="text-sm text-gray-500">ID: {commission.id}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Title (visible on small screens) */}
            <div className="sm:hidden bg-white p-4 border-b border-gray-100">
                <h1 className="text-lg font-bold text-gray-900">
                    {commission.title}
                </h1>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Main Commission Content - Left Column */}
                        <div className="w-full lg:w-2/3 space-y-6">
                            {/* Tabs */}
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="border-b border-gray-100">
                                    <nav className="flex">
                                        <button
                                            className={`px-6 py-4 font-medium text-sm relative ${activeTab === 'overview'
                                                    ? 'text-purple-600'
                                                    : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                            onClick={() => setActiveTab('overview')}
                                        >
                                            Overview
                                            {activeTab === 'overview' && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                                            )}
                                        </button>
                                        <button
                                            className={`px-6 py-4 font-medium text-sm relative ${activeTab === 'messages'
                                                    ? 'text-purple-600'
                                                    : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                            onClick={() => setActiveTab('messages')}
                                        >
                                            Messages
                                            {activeTab === 'messages' && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                                            )}
                                        </button>
                                        <button
                                            className={`px-6 py-4 font-medium text-sm relative ${activeTab === 'files'
                                                    ? 'text-purple-600'
                                                    : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                            onClick={() => setActiveTab('files')}
                                        >
                                            Files
                                            {activeTab === 'files' && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                                            )}
                                        </button>
                                        <button
                                            className={`px-6 py-4 font-medium text-sm relative ${activeTab === 'milestones'
                                                    ? 'text-purple-600'
                                                    : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                            onClick={() => setActiveTab('milestones')}
                                        >
                                            Milestones
                                            {activeTab === 'milestones' && (
                                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                                            )}
                                        </button>
                                    </nav>
                                </div>

                                {/* Tab Content */}
                                <div className="p-6">
                                    {/* Overview Tab */}
                                    {activeTab === 'overview' && (
                                        <div className="space-y-6">
                                            {/* Current Stage Banner */}
                                            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-purple-800">Current Stage: {commission.stage.charAt(0).toUpperCase() + commission.stage.slice(1)}</h3>
                                                    <p className="text-purple-600 text-sm">Progress: {commission.progress}% complete</p>
                                                </div>
                                                <div className="mt-4 sm:mt-0">
                                                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium">
                                                        Approve Stage
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Commission Description */}
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                                                <p className="text-gray-700">{commission.description}</p>
                                            </div>

                                            {/* Latest Preview */}
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-2">Latest Preview</h3>
                                                <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
                                                    <div className="max-w-xl">
                                                        <img
                                                            src="/api/placeholder/600/400"
                                                            alt="Latest artwork preview"
                                                            className="rounded-lg shadow-md w-full h-auto"
                                                        />
                                                        <div className="mt-2 text-center">
                                                            <p className="text-sm text-gray-500">elf-ranger-lineart.jpg • Uploaded May 22, 2024</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quick Actions */}
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-2">Quick Actions</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <button className="bg-green-50 text-green-700 px-4 py-3 rounded-lg border border-green-100 hover:bg-green-100 transition-colors flex items-center justify-center font-medium">
                                                        <ThumbsUp className="w-5 h-5 mr-2" />
                                                        Approve Current Work
                                                    </button>
                                                    <button className="bg-purple-50 text-purple-700 px-4 py-3 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors flex items-center justify-center font-medium">
                                                        <MessageSquare className="w-5 h-5 mr-2" />
                                                        Request Revision
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Revision Information */}
                                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                                <h3 className="font-semibold text-gray-900 mb-2">Revision Information</h3>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-gray-700">Revisions Used: {commission.revisions}/{commission.revisionsAllowed}</p>
                                                        <p className="text-sm text-gray-500 mt-1">Revision requests should be clear and specific</p>
                                                    </div>
                                                    <div className="flex">
                                                        {[...Array(commission.revisionsAllowed)].map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className={`w-3 h-8 mx-0.5 rounded-sm ${i < commission.revisions ? 'bg-purple-300' : 'bg-gray-200'
                                                                    }`}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Messages Tab */}
                                    {activeTab === 'messages' && (
                                        <div className="space-y-6">
                                            {/* Message list */}
                                            <div className="space-y-6">
                                                {commission.messages.map((message) => (
                                                    <div key={message.id} className="flex">
                                                        <div className="flex-shrink-0 mr-4">
                                                            <img
                                                                src={message.avatar}
                                                                alt={message.name}
                                                                className="w-10 h-10 rounded-full"
                                                            />
                                                        </div>
                                                        <div className="flex-grow">
                                                            <div className="flex items-center justify-between">
                                                                <h3 className="font-semibold text-gray-900">
                                                                    {message.name}
                                                                    <span className="text-xs font-normal text-gray-500 ml-2">
                                                                        {message.sender === 'artist' ? '(Artist)' : '(Client)'}
                                                                    </span>
                                                                </h3>
                                                                <span className="text-xs text-gray-500">{message.timestamp}</span>
                                                            </div>
                                                            <p className="text-gray-700 mt-1">{message.content}</p>

                                                            {/* Attachments */}
                                                            {message.attachments.length > 0 && (
                                                                <div className="mt-3">
                                                                    <p className="text-xs text-gray-500 mb-2">Attachments:</p>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {message.attachments.map((attachment) => (
                                                                            <div
                                                                                key={attachment.id}
                                                                                className="border border-gray-200 rounded-lg overflow-hidden flex flex-col"
                                                                            >
                                                                                <div className="w-32 h-24 overflow-hidden">
                                                                                    <img
                                                                                        src={attachment.thumbnail}
                                                                                        alt={attachment.name}
                                                                                        className="w-full h-full object-cover"
                                                                                    />
                                                                                </div>
                                                                                <div className="p-2 bg-gray-50">
                                                                                    <p className="text-xs text-gray-700 truncate">{attachment.name}</p>
                                                                                    <div className="flex justify-end mt-1">
                                                                                        <button className="text-purple-600 hover:text-purple-700">
                                                                                            <Download className="w-4 h-4" />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Message Input */}
                                            <div className="border-t border-gray-100 pt-6">
                                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                                    <textarea
                                                        placeholder="Type your message here..."
                                                        className="w-full p-4 resize-none focus:outline-none min-h-32"
                                                        value={replyText}
                                                        onChange={(e) => setReplyText(e.target.value)}
                                                    ></textarea>
                                                    <div className="flex items-center justify-between p-3 bg-gray-50 border-t border-gray-100">
                                                        <div className="flex space-x-2">
                                                            <button className="p-2 text-gray-500 hover:text-purple-600 rounded-full hover:bg-gray-100">
                                                                <Paperclip className="w-5 h-5" />
                                                            </button>
                                                            <button className="p-2 text-gray-500 hover:text-purple-600 rounded-full hover:bg-gray-100">
                                                                <Image className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium flex items-center">
                                                            <Send className="w-4 h-4 mr-2" />
                                                            Send Message
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Files Tab */}
                                    {activeTab === 'files' && (
                                        <div className="space-y-6">
                                            {/* File Upload Area */}
                                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                                                <div className="flex flex-col items-center">
                                                    <Paperclip className="w-10 h-10 text-gray-400 mb-2" />
                                                    <h3 className="font-semibold text-gray-900 mb-1">Drag and drop files here</h3>
                                                    <p className="text-sm text-gray-500 mb-4">or</p>
                                                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium">
                                                        Browse Files
                                                    </button>
                                                    <p className="text-xs text-gray-500 mt-4">
                                                        Supported formats: JPG, PNG, PSD, AI (Max: 50MB)
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Files by Stage */}
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="font-semibold text-gray-900">All Files</h3>
                                                    <div className="flex space-x-2">
                                                        <button className="text-sm text-gray-600 hover:text-purple-600">
                                                            Filter
                                                        </button>
                                                        <button className="text-sm text-gray-600 hover:text-purple-600">
                                                            Download All
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* File Cards */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                    {commission.files.map((file) => (
                                                        <div key={file.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                                                            <div className="h-32 bg-gray-100 relative">
                                                                <img
                                                                    src={file.thumbnail}
                                                                    alt={file.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                                <div className="absolute top-2 right-2">
                                                                    <button className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-100">
                                                                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                                                    </button>
                                                                </div>
                                                                <div className="absolute bottom-2 left-2">
                                                                    <span className="bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                                                        {file.stage.charAt(0).toUpperCase() + file.stage.slice(1)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="p-3">
                                                                <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                                                                <div className="flex items-center justify-between mt-2">
                                                                    <span className="text-xs text-gray-500">{file.date}</span>
                                                                    <button className="text-purple-600 hover:text-purple-700">
                                                                        <Download className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Milestones Tab */}
                                    {activeTab === 'milestones' && (
                                        <div className="space-y-6">
                                            {/* Active Milestone */}
                                            {currentMilestone && (
                                                <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-8">
                                                    <h3 className="text-purple-800 font-semibold mb-1">Current Milestone</h3>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-gray-900 font-medium">{currentMilestone.title}</p>
                                                            <p className="text-sm text-gray-600">{currentMilestone.description}</p>
                                                        </div>
                                                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium">
                                                            Approve
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Milestone Timeline */}
                                            <div className="relative">
                                                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                                                {commission.milestones.map((milestone, index) => (
                                                    <div key={index} className="flex mb-6 last:mb-0">
                                                        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center relative z-10">
                                                            {milestone.completed ? (
                                                                <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
                                                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
                                                                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-grow ml-4">
                                                            <div className={`p-4 rounded-lg ${milestone.completed
                                                                    ? 'bg-green-50 border border-green-100'
                                                                    : 'bg-white border border-gray-200'
                                                                }`}>
                                                                <div className="flex items-center justify-between">
                                                                    <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                                                                    <span className={`text-sm ${milestone.completed ? 'text-green-600' : 'text-gray-500'
                                                                        }`}>
                                                                        {milestone.date}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>

                                                                {milestone.completed && (
                                                                    <div className="mt-2 flex items-center text-sm text-green-600">
                                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                                        Completed
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Commission Details Sidebar - Right Column */}
                        <div className="w-full lg:w-1/3 space-y-6">
                            {/* Commission Info Card */}
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <h2 className="font-semibold text-lg text-gray-900 mb-4">Commission Details</h2>

                                    {/* Contract Details */}
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <div className="bg-purple-100 p-2 rounded-full mr-3">
                                                <DollarSign className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Price</p>
                                                <p className="font-semibold text-gray-900">${commission.price}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="bg-purple-100 p-2 rounded-full mr-3">
                                                <Calendar className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Due Date</p>
                                                <p className="font-semibold text-gray-900">{commission.timeline.dueDate}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="bg-purple-100 p-2 rounded-full mr-3">
                                                <Clock className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Estimated Completion</p>
                                                <p className="font-semibold text-gray-900">{commission.timeline.estimatedCompletion}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="bg-purple-100 p-2 rounded-full mr-3">
                                                <FileText className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Revision Allowance</p>
                                                <p className="font-semibold text-gray-900">{commission.revisions} of {commission.revisionsAllowed} used</p>
                                            </div>
                                        </div>

                                        <div className="pt-4 mt-4 border-t border-gray-100">
                                            <h3 className="font-medium text-gray-900 mb-3">Usage Rights</h3>
                                            <p className="text-sm text-gray-600 mb-2">Commercial usage allowed: <span className="font-medium">No</span></p>
                                            <p className="text-sm text-gray-600">Copyright transfer: <span className="font-medium">No</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Client Info Card */}
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <h2 className="font-semibold text-lg text-gray-900 mb-4">Client Information</h2>
                                    <div className="flex items-center">
                                        <img
                                            src={commission.client.avatar}
                                            alt={commission.client.name}
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-900">{commission.client.name}</h3>
                                            <div className="flex items-center mt-1">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className={`w-4 h-4 ${i < Math.floor(commission.client.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-500 ml-1">{commission.client.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        <button className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors text-sm font-medium">
                                            View Profile
                                        </button>
                                        <button className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium">
                                            Message
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Artist Info Card */}
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <h2 className="font-semibold text-lg text-gray-900 mb-4">Artist Information</h2>
                                    <div className="flex items-center">
                                        <img
                                            src={commission.artist.avatar}
                                            alt={commission.artist.name}
                                            className="w-12 h-12 rounded-full mr-4"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-900">{commission.artist.name}</h3>
                                            <div className="flex items-center mt-1">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className={`w-4 h-4 ${i < Math.floor(commission.artist.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-500 ml-1">{commission.artist.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        <button className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors text-sm font-medium">
                                            View Profile
                                        </button>
                                        <button className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium">
                                            Message
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Card */}
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden border-t-4 border-purple-600">
                                <div className="p-6">
                                    <h2 className="font-semibold text-lg text-gray-900 mb-4">Actions</h2>
                                    <div className="space-y-3">
                                        <button className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-500 transition-colors font-medium flex items-center justify-center">
                                            <CheckCircle className="w-5 h-5 mr-2" />
                                            Approve Current Stage
                                        </button>
                                        <button className="w-full bg-orange-50 text-orange-700 px-4 py-3 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors font-medium flex items-center justify-center">
                                            <AlertCircle className="w-5 h-5 mr-2" />
                                            Request Revision
                                        </button>
                                        <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                                            <Plus className="w-5 h-5 mr-2" />
                                            Add Extra Payment
                                        </button>
                                        <button className="w-full bg-red-50 text-red-700 px-4 py-3 rounded-lg border border-red-100 hover:bg-red-100 transition-colors font-medium flex items-center justify-center">
                                            <Trash2 className="w-5 h-5 mr-2" />
                                            Cancel Commission
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Help & Support Card */}
                            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                                <div className="p-6">
                                    <h2 className="font-semibold text-gray-900 mb-2">Need Help?</h2>
                                    <p className="text-sm text-gray-600 mb-4">
                                        If you have any questions or issues with this commission, our support team is here to help.
                                    </p>
                                    <a
                                        href="#"
                                        className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center"
                                    >
                                        Contact Support
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommissionView;
