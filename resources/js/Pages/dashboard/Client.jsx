import React, { useState } from 'react';
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  Home,
  MessageSquare,
  FileText,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronRight,
  Palette,
  Clock,
  CheckCircle,
  Calendar,
  Star,
  Heart,
  Filter,
  ChevronDown,
  Plus,
  Eye,
  Image,
  Download,
  ArrowRight,
  Inbox
} from 'lucide-react';

const ClientDashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

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
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
                  Client Name
                </h2>
                <p className="text-xs text-gray-500 truncate">
                  client@example.com
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
                  className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                    activeTab === 'overview'
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
                  className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                    activeTab === 'commissions'
                      ? 'bg-purple-50 text-purple-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('commissions')}
                >
                  <Palette className="h-5 w-5 mr-3" />
                  My Commissions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                    activeTab === 'messages'
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
                  className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                    activeTab === 'favorites'
                      ? 'bg-purple-50 text-purple-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('favorites')}
                >
                  <Heart className="h-5 w-5 mr-3" />
                  Favorite Artists
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                    activeTab === 'payments'
                      ? 'bg-purple-50 text-purple-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveTab('payments')}
                >
                  <CreditCard className="h-5 w-5 mr-3" />
                  Payment History
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
                    Completed Projects
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
              Request Commission
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
                  placeholder="Search artists..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>

              <button className="p-2 text-gray-500 hover:text-gray-900 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="border-l border-gray-200 h-8 mx-2"></div>

              <div className="flex items-center">
                <button className="flex items-center focus:outline-none">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Page Title and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
              <p className="mt-1 text-gray-600">Track your commissions and discover new artists.</p>
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
                  {/* Number will be added later */}
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  <span>{/* Data will be added later */}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm font-medium">Pending Approvals</h3>
                <div className="bg-amber-100 rounded-full p-2">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">
                  {/* Number will be added later */}
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  <span>{/* Data will be added later */}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm font-medium">Favorite Artists</h3>
                <div className="bg-red-100 rounded-full p-2">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">
                  {/* Number will be added later */}
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  <span>{/* Data will be added later */}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-500 text-sm font-medium">Completed Projects</h3>
                <div className="bg-green-100 rounded-full p-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">
                  {/* Number will be added later */}
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  <span>{/* Data will be added later */}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Sections */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Active Commissions */}
            <div className="xl:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-semibold text-gray-900">Active Commissions</h2>
                <div className="flex space-x-2">
                  <button className="text-xs px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">All</button>
                  <button className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200">In Progress</button>
                  <button className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200">Review</button>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {/* Commission items will be added here later */}
                <div className="p-6 flex items-center justify-center">
                  <p className="text-gray-500 text-sm">Waiting for data...</p>
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Upcoming Reviews */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Pending Reviews</h2>
                  <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                    {/* Number will be added later */}
                  </div>
                </div>
                <div className="p-6">
                  {/* Review items will be added here later */}
                  <div className="flex items-center justify-center py-4">
                    <p className="text-gray-500 text-sm">Waiting for data...</p>
                  </div>

                  <div className="mt-6">
                    <a href="#" className="text-sm text-purple-600 font-medium hover:text-purple-800 flex items-center justify-center">
                      View all pending reviews
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Messages Preview */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Recent Messages</h2>
                  <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    {/* Number will be added later */}
                  </div>
                </div>
                <div className="p-6">
                  {/* Message items will be added here later */}
                  <div className="flex items-center justify-center py-4">
                    <p className="text-gray-500 text-sm">Waiting for data...</p>
                  </div>

                  <div className="mt-6">
                    <a href="#" className="text-sm text-purple-600 font-medium hover:text-purple-800 flex items-center justify-center">
                      Go to inbox
                      <Inbox className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recently Completed */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Recently Completed Projects</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Portfolio items will be added here later */}
                <div className="flex items-center justify-center p-12 border border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500 text-sm">No projects yet</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="text-sm text-purple-600 font-medium hover:text-purple-800 inline-flex items-center">
                  View all completed projects
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Recommended Artists */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold text-gray-900">Recommended Artists</h2>
              <a href="#" className="text-sm text-purple-600 font-medium hover:text-purple-800">
                Browse all artists
              </a>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Artist cards will be added here later */}
                <div className="flex items-center justify-center p-12 border border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500 text-sm">Loading recommendations...</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboardPage;
