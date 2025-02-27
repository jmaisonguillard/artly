import React, { useState, useEffect } from 'react';
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
import { getDaysRemaining, getFormattedDate, getFormattedTime, getDeadlineBadgeColor, getDaysRemainingText } from '../../utils';
import UpcomingDeadlines from './components/UpcomingDeadlines';

const DashboardPage = ({ commissions, active_commission_count, this_month_earnings, completed_projects_count, pending_reviews_count, upcoming_deadlines }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
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
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-medium text-gray-900 truncate">
                  Artist Name
                </h2>
                <p className="text-xs text-gray-500 truncate">
                  artist@example.com
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

              <div className="relative">
                <button
                  className="flex items-center focus:outline-none cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add your logout logic here
                        console.log('Logout clicked');
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
          {/* Page Title and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-gray-600">Welcome back! Here's what's happening with your commissions.</p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm bg-purple-600 text-sm font-medium text-white hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                New Commission
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm font-medium">Active Commissions</h3>
                <div className="bg-purple-100 rounded-full p-2">
                  <Palette className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">
                  {active_commission_count}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm font-medium">Pending Reviews</h3>
                <div className="bg-amber-100 rounded-full p-2">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">
                  {pending_reviews_count}
                </div>
                <div className="mt-1 text-xs flex items-center text-gray-600">
                  <span>{/* Data will be added later */}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm font-medium">This Month Earnings</h3>
                <div className="bg-green-100 rounded-full p-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">
                  ${this_month_earnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm font-medium">Completed Projects</h3>
                <div className="bg-blue-100 rounded-full p-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">
                  {completed_projects_count}
                </div>
                <div className="mt-1 text-xs flex items-center text-gray-600">
                  <span>{/* Data will be added later */}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Sections */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Active Commissions */}
            <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Active Commissions</h2>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Project
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Deadline
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Progress
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                            Loading commissions...
                          </td>
                        </tr>
                      ) : commissions.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                            No active commissions found
                          </td>
                        </tr>
                      ) : (
                        commissions.map((commission) => (
                          <tr
                            key={commission.id}
                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => window.location.href = `/dashboard/commission/${commission.id}`}
                          >
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {commission.title}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {commission.commission_id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{commission.client.name}</div>
                              <div className="text-sm text-gray-500">{commission.client.email}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(commission.due_date).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(commission.due_date) < new Date() ? 'Overdue' : 'On time'}
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(commission.status)}`}>
                                {commission.status.replace(/[_-]/g, ' ').toUpperCase()}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-purple-600 h-2.5 rounded-full"
                                  style={{ width: `${commission.progress}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {commission.progress}% Complete
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-medium text-gray-900">5</span> of <span className="font-medium text-gray-900">12</span> projects
                  </p>
                  <a href="#" className="text-sm text-purple-600 font-medium hover:text-purple-800 flex items-center">
                    View all
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            <UpcomingDeadlines deadlines={upcoming_deadlines} />
          </div>

          {/* Bottom Sections */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            {/* Recent Messages */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Recent Messages</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {/* List items will be added later */}
                </ul>
                <div className="mt-6">
                  <a href="#" className="text-sm text-purple-600 font-medium hover:text-purple-800 flex items-center justify-center">
                    View all messages
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Latest Reviews</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {/* List items will be added later */}
                </ul>
                <div className="mt-6">
                  <a href="#" className="text-sm text-purple-600 font-medium hover:text-purple-800 flex items-center justify-center">
                    View all reviews
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Activity Feed</h2>
              </div>
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {/* List items will be added later */}
                  </ul>
                </div>
                <div className="mt-6">
                  <a href="#" className="text-sm text-purple-600 font-medium hover:text-purple-800 flex items-center justify-center">
                    View all activity
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
