import React, { useState } from 'react';
// import './FeedbackFormCreator.css';

const FeedbackFormCreator = ({ onFeedbackDataUpdate }) => {
  const [course, setCourse] = useState('');
  const [instructor, setInstructor] = useState('');
  const [questions, setQuestions] = useState(['']);

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      course,
      instructor,
      questions,
    };
    onFeedbackDataUpdate(newFeedback);
    setCourse('');
    setInstructor('');
    setQuestions(['']);
  };

  return (
    <form className="feedback-form-creator" onSubmit={handleSubmit}>
      <input
        type="text"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        placeholder="Course Name"
        required
      />
      <input
        type="text"
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
        placeholder="Instructor Name"
        required
      />
      {questions.map((question, index) => (
        <input
          key={index}
          type="text"
          value={question}
          onChange={(e) => handleQuestionChange(index, e.target.value)}
          placeholder={`Question ${index + 1}`}
          required
        />
      ))}
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
      <button type="submit">Create Feedback Form</button>
    </form>
  );
};

export default FeedbackFormCreator;
