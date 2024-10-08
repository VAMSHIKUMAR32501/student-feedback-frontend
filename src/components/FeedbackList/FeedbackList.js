import React from 'react';
import './FeedbackList.css';

const FeedbackList = ({ feedbacks }) => {
  return (
    <div className="feedback-list">
      {feedbacks.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        feedbacks.map((feedback, index) => (
          <div key={index} className="feedback-item">
            <h5>{feedback.courseName} - {feedback.instructorName}</h5>
            <p>Rating: {feedback.rating} / 5</p>
            <p>Comments: {feedback.comments}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FeedbackList;
