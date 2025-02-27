import React, { useState, useEffect, useRef } from 'react';
import {
    Search,
    Bell,
    User,
    Menu,
    X,
    Home,
    MessageSquare,
    FileText,
    BarChart2,
    Settings,
    HelpCircle,
    ChevronRight,
    Palette,
    Clock,
    DollarSign,
    CheckCircle,
    Calendar,
    Star,
    TrendingUp,
    Filter,
    ArrowDown,
    ChevronDown,
    Plus,
    Users
} from 'lucide-react';
import { router } from '@inertiajs/react';

const DashboardPage = ({ user, children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getStatusColor = (status) => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800',
            in_progress: 'bg-blue-100 text-blue-800',
            review: 'bg-purple-100 text-purple-800',
            revision: 'bg-orange-100 text-orange-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };

    // Toggle sidebar visibility for mobile view
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile sidebar backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Sidebar Header */}
                    <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
                        <div className="text-2xl font-bold text-purple-600">Artly</div>
                        <button
                            className="lg:hidden text-gray-400 hover:text-gray-600"
                            onClick={toggleSidebar}
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center">
                            <img
                                src={user.avatar_url}
                                alt={user.display_name}
                                className="w-10 h-10 rounded-full mr-3 object-cover"
                            />
                            <div className="flex-1 min-w-0">
                                <h2 className="text-sm font-medium text-gray-900 truncate">
                                    {user.display_name}
                                </h2>
                                <p className="text-xs text-gray-500 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 overflow-y-auto">
                        <ul className="space-y-1">
                            <li>
                                <a
                                    href="#"
                                    className={`flex items-center px-4 py-3 text-sm rounded-lg ${activeTab === 'overview'
                                        ? 'bg-purple-50 text-purple-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setActiveTab('overview')}
                                >
                                    <Home className="h-5 w-5 mr-3" />
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`flex items-center px-4 py-3 text-sm rounded-lg ${activeTab === 'commissions'
                                        ? 'bg-purple-50 text-purple-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setActiveTab('commissions')}
                                >
                                    <Palette className="h-5 w-5 mr-3" />
                                    Commissions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`flex items-center px-4 py-3 text-sm rounded-lg ${activeTab === 'messages'
                                        ? 'bg-purple-50 text-purple-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setActiveTab('messages')}
                                >
                                    <MessageSquare className="h-5 w-5 mr-3" />
                                    Messages
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`flex items-center px-4 py-3 text-sm rounded-lg ${activeTab === 'clients'
                                        ? 'bg-purple-50 text-purple-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setActiveTab('clients')}
                                >
                                    <Users className="h-5 w-5 mr-3" />
                                    Clients
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`flex items-center px-4 py-3 text-sm rounded-lg ${activeTab === 'earnings'
                                        ? 'bg-purple-50 text-purple-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setActiveTab('earnings')}
                                >
                                    <DollarSign className="h-5 w-5 mr-3" />
                                    Earnings
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={`flex items-center px-4 py-3 text-sm rounded-lg ${activeTab === 'analytics'
                                        ? 'bg-purple-50 text-purple-700 font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    onClick={() => setActiveTab('analytics')}
                                >
                                    <BarChart2 className="h-5 w-5 mr-3" />
                                    Analytics
                                </a>
                            </li>
                        </ul>

                        <div className="mt-10">
                            <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Account
                            </p>
                            <ul className="mt-3 space-y-1">
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center px-4 py-3 text-sm rounded-lg text-gray-700 hover:bg-gray-100"
                                    >
                                        <FileText className="h-5 w-5 mr-3" />
                                        My Portfolio
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center px-4 py-3 text-sm rounded-lg text-gray-700 hover:bg-gray-100"
                                    >
                                        <Settings className="h-5 w-5 mr-3" />
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="flex items-center px-4 py-3 text-sm rounded-lg text-gray-700 hover:bg-gray-100"
                                    >
                                        <HelpCircle className="h-5 w-5 mr-3" />
                                        Help Center
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-gray-100">
                        <a
                            href="#"
                            className="flex items-center justify-center px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            New Commission Slot
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="h-20 px-6 flex items-center justify-between">
                        {/* Left side: Mobile menu button and breadcrumbs */}
                        <div className="flex items-center">
                            <button
                                type="button"
                                className="text-gray-600 hover:text-gray-900 lg:hidden"
                                onClick={toggleSidebar}
                            >
                                <Menu className="h-6 w-6" />
                            </button>

                            <div className="hidden sm:flex items-center ml-6">
                                <a href="#" className="text-gray-500 hover:text-gray-900">Dashboard</a>
                                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                                <span className="font-medium text-gray-900">Overview</span>
                            </div>
                        </div>

                        {/* Right side: Search and user actions */}
                        <div className="flex items-center space-x-4">
                            <div className="relative hidden md:block">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                            </div>

                            <button className="p-2 text-gray-500 hover:text-gray-900 relative">
                                <Bell className="h-6 w-6" />
                                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                            </button>

                            <div className="border-l border-gray-200 h-8 mx-2"></div>

                            <div className="relative" ref={dropdownRef}>
                                <button
                                    className="flex items-center focus:outline-none cursor-pointer"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <img
                                        src={user.avatar_url}
                                        alt={user.display_name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                                        <a
                                            href="/logout"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // Use Inertia to submit a post request to logout
                                                router.post('/logout', {}, {
                                                    onSuccess: () => setIsDropdownOpen(false)
                                                });
                                            }}
                                        >
                                            Logout
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
