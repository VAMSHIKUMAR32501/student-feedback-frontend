import React from 'react';
import './FeedbackAnalytics.css';

const FeedbackAnalytics = ({ feedbackData }) => {
  const calculateAverageRatings = (feedbacks) => {
    if (feedbacks.length === 0) return [];
    const questionCount = feedbacks[0].questions.length;
    const totalRatings = Array(questionCount).fill(0);
    const responseCounts = Array(questionCount).fill(0);

    feedbacks.forEach((feedback) => {
      feedback.ratings.forEach((rating, index) => {
        totalRatings[index] += rating;
        responseCounts[index] += 1;
      });
    });

    return totalRatings.map((total, index) => (responseCounts[index] ? (total / responseCounts[index]).toFixed(2) : 0));
  };

  const averageRatings = calculateAverageRatings(feedbackData);

  return (
    <div className="feedback-analytics">
      <h4>Feedback Summary</h4>
      {feedbackData.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <div>
          <h5>Average Ratings per Question:</h5>
          <ul>
            {averageRatings.map((avgRating, index) => (
              <li key={index}>
                <strong>Question {index + 1}:</strong> {avgRating} / 5
              </li>
            ))}
          </ul>

          <h5>Detailed Feedback:</h5>
          {feedbackData.map((feedback, index) => (
            <div key={index} className="feedback-item">
              <h5>{feedback.course}</h5>
              <p><strong>Instructor:</strong> {feedback.instructor}</p>
              <strong>Responses:</strong>
              <ul>
                {feedback.ratings.map((rating, i) => (
                  <li key={i}>Question {i + 1}: {rating} / 5</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackAnalytics;
