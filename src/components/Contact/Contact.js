import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., sending the data to a server)
    console.log('Form submitted:', formData);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Contact Us
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph textAlign="center">
        Have questions or feedback? Fill out the form below to get in touch!
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Subject"
            variant="outlined"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <TextField
            label="Message"
            variant="outlined"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>

      {/* Optional: Contact Information Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Contact Information</Typography>
        <Typography variant="body1">Email: info@example.com</Typography>
        <Typography variant="body1">Phone: +1 (555) 123-4567</Typography>
        {/* Add more contact information as needed */}
      </Box>
    </Container>
  );
};

export default Contact;
