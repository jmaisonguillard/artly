import React, { useState, useEffect } from 'react';
import {
  Bell,
  MessageSquare,
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  Star,
  Image,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

const DashboardActivityFeed = ({ activity_feed }) => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  // Mock data - replace with actual API call in production
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setActivities(activity_feed);
      console.log(activity_feed);
      setLoading(false);
    }, 600);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'commission_update':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'message':
        return <MessageSquare className="w-4 h-4 text-green-500" />;
      case 'payment':
        return <DollarSign className="w-4 h-4 text-emerald-500" />;
      case 'milestone':
        return <CheckCircle className="w-4 h-4 text-purple-500" />;
      case 'review':
        return <Star className="w-4 h-4 text-yellow-500" />;
      case 'file_upload':
        return <Image className="w-4 h-4 text-indigo-500" />;
      case 'deadline':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'system':
        return <Bell className="w-4 h-4 text-gray-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-semibold text-gray-900">Recent Activity</h2>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-gray-100">
        {loading ? (
          <div className="p-6 text-center">
            <RefreshCw className="w-6 h-6 text-purple-600 animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-500">Loading activities...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="p-6 text-center">
            <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No recent activities</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className={`p-3 ${activity.unread ? 'bg-purple-50' : 'bg-white'} hover:bg-gray-50 transition-colors relative`}
            >
              {activity.unread && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
              )}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="ml-3 flex-grow min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900 text-sm truncate">{activity.title}</h3>
                    <div className="text-xs text-gray-500 ml-2 flex-shrink-0">{activity.timestamp_human}</div>
                  </div>
                  <p className="text-gray-600 text-xs mt-0.5 truncate">{activity.description}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardActivityFeed;
