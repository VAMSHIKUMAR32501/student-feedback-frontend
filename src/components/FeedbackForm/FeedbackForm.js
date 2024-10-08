import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = ({ onSubmit }) => {
  const [courseName, setCourseName] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = { courseName, instructorName, rating: parseInt(rating), comments };
    onSubmit(newFeedback);
    
    // Reset form fields
    setCourseName('');
    setInstructorName('');
    setRating(0);
    setComments('');
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <div>
        <label>Course Name:</label>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Instructor Name:</label>
        <input
          type="text"
          value={instructorName}
          onChange={(e) => setInstructorName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Rating (0 to 5):</label>
        <input
          type="number"
          value={rating}
          min="0"
          max="5"
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Additional Comments:</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default FeedbackForm;
