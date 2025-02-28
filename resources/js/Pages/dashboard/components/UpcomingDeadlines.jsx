import React from 'react';
import {
  Calendar,
  ChevronRight,
  Clock,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

const UpcomingDeadlines = ({ deadlines }) => {
  // Function to determine days remaining
  const getDaysRemaining = (dueDateString) => {
    const dueDate = new Date(dueDateString);
    const today = new Date();

    // Set both dates to midnight for accurate day calculation
    today.setHours(0, 0, 0, 0);
    const dueDateMidnight = new Date(dueDate);
    dueDateMidnight.setHours(0, 0, 0, 0);

    // Calculate difference in days
    const diffTime = dueDateMidnight - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  // Function to get formatted date
  const getFormattedDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    const dueDate = new Date(dateString);
    return dueDate.toLocaleDateString('en-US', options);
  };

  // Function to get formatted time
  const getFormattedTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    const dueDate = new Date(dateString);
    return dueDate.toLocaleTimeString('en-US', options);
  };

  // Function to determine badge color based on days remaining
  const getDeadlineBadgeColor = (daysRemaining, priority) => {
    if (daysRemaining < 0) return 'bg-red-100 text-red-800'; // Overdue
    if (daysRemaining === 0) return 'bg-red-100 text-red-800'; // Due today
    if (daysRemaining <= 1) return 'bg-red-100 text-red-800'; // Within 1 day
    if (daysRemaining <= 3) return 'bg-orange-100 text-orange-800'; // Within 3 days
    if (priority === 'high') return 'bg-orange-100 text-orange-800'; // High priority
    return 'bg-green-100 text-green-800'; // More than 3 days
  };

  // Function to determine text for days remaining
  const getDaysRemainingText = (daysRemaining) => {
    if (daysRemaining < 0) return 'Overdue';
    if (daysRemaining === 0) return 'Due today';
    if (daysRemaining === 1) return 'Tomorrow';
    return `${daysRemaining} days left`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Upcoming Deadlines</h2>
        <div className="flex space-x-3">
          <button className="text-gray-400 hover:text-gray-500">
            <Calendar className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <ul className="space-y-4">
          {deadlines.map((item) => {
            const daysRemaining = getDaysRemaining(item.due_date);
            const badgeColor = getDeadlineBadgeColor(daysRemaining, item.priority);
            const daysText = getDaysRemainingText(daysRemaining);

            return (
              <li key={item.id} className="border border-gray-100 rounded-lg overflow-hidden">
                <div className="p-4 flex items-center">
                  {/* Left: Priority indicator */}
                  <div className={`w-1.5 self-stretch rounded-l mr-3 ${
                    item.priority === 'high' ? 'bg-red-500' :
                    item.priority === 'medium' ? 'bg-orange-400' : 'bg-green-500'
                  }`}></div>

                  {/* Middle: Deadline info */}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>
                          {getFormattedDate(item.due_date)} at {getFormattedTime(item.due_date)}
                        </span>
                      </div>
                      <span className="mx-2 text-gray-300">•</span>
                      <div className="text-xs text-gray-500">
                        Client: {item.client_name}
                      </div>
                    </div>
                  </div>

                  {/* Right: Status badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
                    {daysText}
                  </div>
                </div>
              </li>
            );
          })}

          {deadlines.length === 0 && (
            <li className="text-center py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-gray-900 font-medium">No upcoming deadlines</h3>
              <p className="text-gray-500 text-sm mt-1">You're all caught up!</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
