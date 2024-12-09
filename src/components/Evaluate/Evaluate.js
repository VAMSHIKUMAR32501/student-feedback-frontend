import React, { useState } from 'react';
  // Use two levels up ('../../')


const Evaluate = () => {
  const [evaluation, setEvaluation] = useState({
    subject: '',
    rating: '',
    comments: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluation((prevEvaluation) => ({
      ...prevEvaluation,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitFeedback(evaluation);
      console.log('Evaluation submitted successfully:', response);
      // Show success message or redirect
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      // Show error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Subject:
        <input type="text" name="subject" value={evaluation.subject} onChange={handleChange} />
      </label>
      <label>
        Rating:
        <select name="rating" value={evaluation.rating} onChange={handleChange}>
          <option value="very good">Very Good</option>
          <option value="good">Good</option>
          <option value="average">Average</option>
          <option value="bad">Bad</option>
        </select>
      </label>
      <label>
        Comments:
        <textarea name="comments" value={evaluation.comments} onChange={handleChange} />
      </label>
      <button type="submit">Submit Evaluation</button>
    </form>
  );
};

export default Evaluate;
