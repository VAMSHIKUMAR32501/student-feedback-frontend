import React from 'react';
import { AppBar, Toolbar, IconButton, Button, Typography, Container, Grid, Card, CardContent, Box } from '@mui/material';
import { BookOpen, MessageSquare, BarChart3, ClipboardCheck, Shield, ArrowRight, GraduationCap, Mail, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    title: 'Collect Feedback',
    description: 'Students can easily provide feedback on courses and instructors.',
    icon: MessageSquare,
  },
  {
    title: 'Real-Time Analytics',
    description: 'Access detailed reports to gain valuable insights for improvement.',
    icon: BarChart3,
  },
  {
    title: 'Personalized Evaluations',
    description: 'Customized evaluations to support each student\'s growth and needs.',
    icon: ClipboardCheck,
  },
  {
    title: 'Secure & Confidential',
    description: 'Data privacy and security are prioritized to protect student information.',
    icon: Shield,
  },
];

const Home = ({ toggleDarkMode }) => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div>
      {/* Header */}
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <BookOpen />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Feedback System
          </Typography>
          <Button color="inherit" variant="outlined" sx={{ marginLeft: 2 }} onClick={handleLogin}>
            Login
          </Button>
          <Button color="inherit" variant="contained" sx={{ marginLeft: 1 }} onClick={handleRegister}>
            Register
          </Button>
          <Button color="inherit" onClick={toggleDarkMode} sx={{ marginLeft: 2 }}>
            Theme
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container sx={{ py: 6 }} maxWidth="lg">
        <Box textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Empowering Student Feedback for
            <span style={{ background: 'linear-gradient(to right, #2196F3, #00BCD4)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              {' Better Learning'}
            </span>
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            Efficiently collect, analyze, and respond to student feedback to enhance the learning experience.
          </Typography>
          <Button variant="contained" sx={{ mr: 2 }} onClick={handleGetStarted}>
            Get Started
          </Button>
          <Button variant="outlined">Learn More</Button>
        </Box>
      </Container>

      {/* Features Section */}
      <Container id="features" sx={{ py: 6 }} maxWidth="lg">
        <Typography variant="h5" gutterBottom textAlign="center">
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    <feature.icon size={40} />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Container id="about" sx={{ py: 6 }} maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              We're dedicated to transforming the educational experience through meaningful feedback.
              Our platform bridges the gap between students and educators, fostering a collaborative
              learning environment that promotes growth and understanding.
            </Typography>
            <Button variant="outlined" endIcon={<ArrowRight />}>
              Learn More About Us
            </Button>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <GraduationCap size={200} />
          </Grid>
        </Grid>
      </Container>

      {/* Contact Section */}
      <Container id="contact" sx={{ py: 6 }} maxWidth="lg">
        <Typography variant="h5" gutterBottom textAlign="center">
          Get in Touch
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph textAlign="center">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </Typography>
        <Box display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" startIcon={<Mail />}>
            Contact Us
          </Button>
          <Button variant="outlined" startIcon={<Users />}>
            Support
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      {/* <Footer /> Use the updated Footer component here */}
    </div>
  );
};

export default Home;
