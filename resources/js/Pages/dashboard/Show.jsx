import React, { useState, useEffect, useRef } from 'react';
import {
    ChevronRight,
    Palette,
    Clock,
    DollarSign,
    CheckCircle,
    Filter,
    Plus,
} from 'lucide-react';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import DashboardLayout from './layout/DashboardLayout';
import LatestReviewsDashboard from './components/LatestReviews';
import ActivityFeed from './components/ActivityFeed';
import RecentMessages from './components/RecentMessages';

const DashboardPage = ({ user, commissions, commissions_pagination, active_commission_count, this_month_earnings, completed_projects_count, pending_reviews_count, upcoming_deadlines, recent_messages, latest_reviews, activity_feed }) => {
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

    return (
        <DashboardLayout user={user}>
            {/* Page Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-gray-600">Welcome back! Here's what's happening with your commissions.</p>
                </div>
                <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
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
                                Showing <span className="font-medium text-gray-900">{commissions_pagination.to}</span> of <span className="font-medium text-gray-900">{commissions_pagination.total}</span> projects
                            </p>
                        </div>
                    </div>
                </div>

                <UpcomingDeadlines deadlines={upcoming_deadlines} />
            </div>

            {/* Bottom Sections */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
                <RecentMessages recent_messages={recent_messages} />


                {/* Recent Reviews */}
                <LatestReviewsDashboard reviews={latest_reviews} />

                {/* Activity Feed */}
                <ActivityFeed activity_feed={activity_feed} />
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;
