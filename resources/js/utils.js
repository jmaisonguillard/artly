// Function to determine days remaining
export const getDaysRemaining = (dueDateString) => {
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
  export const getFormattedDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    const dueDate = new Date(dateString);
    return dueDate.toLocaleDateString('en-US', options);
  };

  // Function to get formatted time
  export const getFormattedTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    const dueDate = new Date(dateString);
    return dueDate.toLocaleTimeString('en-US', options);
  };

  // Function to determine badge color based on days remaining
  export const getDeadlineBadgeColor = (daysRemaining, priority) => {
    if (daysRemaining < 0) return 'bg-red-100 text-red-800'; // Overdue
    if (daysRemaining === 0) return 'bg-red-100 text-red-800'; // Due today
    if (daysRemaining <= 1) return 'bg-red-100 text-red-800'; // Within 1 day
    if (daysRemaining <= 3) return 'bg-orange-100 text-orange-800'; // Within 3 days
    if (priority === 'high') return 'bg-orange-100 text-orange-800'; // High priority
    return 'bg-green-100 text-green-800'; // More than 3 days
  };

  // Function to determine text for days remaining
  export const getDaysRemainingText = (daysRemaining) => {
    if (daysRemaining < 0) return 'Overdue';
    if (daysRemaining === 0) return 'Due today';
    if (daysRemaining === 1) return 'Tomorrow';
    return `${daysRemaining} days left`;
  };
