import React, { useState } from 'react';
import {
  Star,
  StarHalf,
  ArrowRight,
  Flag,
  Reply,
  ChevronRight
} from 'lucide-react';

const LatestReviewsDashboard = ({ reviews = [] }) => {
  // State for tracking expanded reviews (for mobile view)
  const [expandedReviews, setExpandedReviews] = useState({});

  // Function to toggle expanded state of a review
  const toggleReviewExpansion = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  // Function to render star ratings
  const renderStars = (rating, size = 'md') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    // Size classes for stars
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };

    const className = `${sizeClasses[size]} text-yellow-400`;

    // Render full stars
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className={`${className} fill-current`} />);
    }

    // Render half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className={`${className} fill-current`} />);
    }

    // Render empty stars
    for (let i = stars.length + 1; i <= 5; i++) {
      stars.push(<Star key={`empty-${i}`} className={`${className} text-gray-200`} />);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Latest Reviews</h2>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {reviews.map(review => (
            <div key={review.id} className="p-6">
              <div className="flex items-start">
                {/* Client Avatar */}
                <div className="flex-shrink-0 mr-4">
                  {review.client.avatar ? (
                    <img
                      src={review.client.avatar}
                      alt={review.client.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-medium text-lg">
                        {review.client.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Review Content */}
                <div className="flex-grow">
                  {/* Header with name and commission */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center flex-wrap">
                      <h3 className="font-medium text-gray-900">{review.client.name}</h3>
                      <span className="text-gray-500 text-sm ml-2">
                        for <a href="#" className="text-purple-600 hover:text-purple-700">
                          {review.commission.title.length > 30
                            ? `${review.commission.title.substring(0, 30)}...`
                            : review.commission.title}
                        </a>
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {review.createdAtFormatted}
                    </span>
                  </div>

                  {/* Main Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {Math.round(review.rating).toFixed(1)}
                    </span>
                  </div>

                  {/* Review Text */}
                  {review.content && (
                    <div className="mb-3">
                      <p className="text-gray-700 text-sm">
                        {expandedReviews[review.id] || review.content.length <= 150
                          ? review.content
                          : `${review.content.substring(0, 150)}...`}
                      </p>
                      {review.content.length > 150 && (
                        <button
                          onClick={() => toggleReviewExpansion(review.id)}
                          className="text-purple-600 hover:text-purple-700 text-xs mt-1 font-medium"
                        >
                          {expandedReviews[review.id] ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Category Ratings */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                    {review.communication_rating && (
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">Communication:</span>
                        <div className="flex">
                          {renderStars(review.communication_rating, 'sm')}
                        </div>
                      </div>
                    )}

                    {review.quality_rating && (
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">Quality:</span>
                        <div className="flex">
                          {renderStars(review.quality_rating, 'sm')}
                        </div>
                      </div>
                    )}

                    {review.timeliness_rating && (
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">Timeliness:</span>
                        <div className="flex">
                          {renderStars(review.timeliness_rating, 'sm')}
                        </div>
                      </div>
                    )}

                    {review.value_rating && (
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">Value:</span>
                        <div className="flex">
                          {renderStars(review.value_rating, 'sm')}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Artist Response or Response Button */}
                  {review.artist_response ? (
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start">
                        <Reply className="text-gray-400 w-4 h-4 mt-0.5 mr-2" />
                        <div>
                          <div className="flex items-center">
                            <p className="text-xs font-medium text-gray-700">Your Response</p>
                            <span className="text-xs text-gray-500 ml-2">
                              {review.artist_response_formatted}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">
                            {expandedReviews[`response-${review.id}`] || review.artist_response.length <= 100
                              ? review.artist_response
                              : `${review.artist_response.substring(0, 100)}...`}
                          </p>
                          {review.artist_response.length > 100 && (
                            <button
                              onClick={() => setExpandedReviews(prev => ({
                                ...prev,
                                [`response-${review.id}`]: !prev[`response-${review.id}`]
                              }))}
                              className="text-purple-600 hover:text-purple-700 text-xs mt-1 font-medium"
                            >
                              {expandedReviews[`response-${review.id}`] ? 'Show less' : 'Read more'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
            <Star className="text-purple-600 w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Reviews Yet</h3>
          <p className="text-gray-500 mb-4">Completed commissions will show client reviews here</p>
          <a
            href="#"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            View Commission Tips
            <ArrowRight className="ml-1 w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
};

export default LatestReviewsDashboard;
