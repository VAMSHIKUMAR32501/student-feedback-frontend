import React from 'react';
import './FeedbackResults.css';

const FeedbackResults = ({ feedbacks }) => {
  const calculateAverageRating = () => {
    if (feedbacks.length === 0) return 0;
    const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    return (totalRating / feedbacks.length).toFixed(2);
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="feedback-results">
      <h5>Average Rating: {averageRating} / 5</h5>
      {feedbacks.length === 0 ? (
        <p>No feedback available to analyze.</p>
      ) : (
        <p>Total Feedback Submitted: {feedbacks.length}</p>
      )}
    </div>
  );
};

export default FeedbackResults;
