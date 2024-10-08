import React, { useState } from 'react';
import FeedbackForm from '../../components/FeedbackForm/FeedbackForm';
import FeedbackList from '../../components/FeedbackList/FeedbackList';
import FeedbackResults from '../../components/FeedbackResults/FeedbackResults';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [results, setResults] = useState({}); // Placeholder for results

  const handleNewFeedback = (newFeedback) => {
    setFeedbacks([...feedbacks, newFeedback]);
  };

  return (
    <div className="feedback-page">
      <FeedbackForm onFeedbackSubmit={handleNewFeedback} />
      <FeedbackList feedbacks={feedbacks} />
      <FeedbackResults results={results} />
    </div>
  );
};

export default FeedbackPage;
