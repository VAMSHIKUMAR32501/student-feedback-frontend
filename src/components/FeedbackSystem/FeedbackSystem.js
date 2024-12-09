import React, { useState } from 'react';
import ManageQuestionnaire from './ManageQuestionnaire';
import FeedbackForm from './FeedbackForm';

const FeedbackSystem = () => {
  const [selectedCriteria, setSelectedCriteria] = useState('');
  const [criteriaList, setCriteriaList] = useState([
    { id: 'criteria1', text: 'Criteria 1' },
    { id: 'criteria2', text: 'Criteria 2' },
  ]);
  const [questionsByCriteria, setQuestionsByCriteria] = useState({
    criteria1: [
      { id: 'q1', text: 'Question 1 for Criteria 1' },
      { id: 'q2', text: 'Question 2 for Criteria 1' },
    ],
    criteria2: [
      { id: 'q3', text: 'Question 1 for Criteria 2' },
      { id: 'q4', text: 'Question 2 for Criteria 2' },
    ],
  });
  const [ratingLegend, setRatingLegend] = useState({
    five: 'Strongly Agree',
    four: 'Agree',
    three: 'Neutral',
    two: 'Disagree',
    one: 'Strongly Disagree',
  });

  const handleFeedbackSubmission = (criteria, feedback) => {
    console.log(`Feedback for ${criteria}:`, feedback);
    // Add logic to save feedback to the database
  };

  return (
    <div>
      <ManageQuestionnaire
        criteriaList={criteriaList}
        questionsByCriteria={questionsByCriteria}
        setQuestionsByCriteria={setQuestionsByCriteria}
        ratingLegend={ratingLegend}
        setRatingLegend={setRatingLegend}
      />

      <FeedbackForm
        selectedCriteria={selectedCriteria}
        questionsByCriteria={questionsByCriteria}
        ratingLegend={ratingLegend}
        onSubmitFeedback={handleFeedbackSubmission}
      />
    </div>
  );
};

export default FeedbackSystem;
