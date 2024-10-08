import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const windowHeight = window.innerHeight;
      const mouseY = e.clientY;

      // Check if the mouse is within 150px of the bottom of the screen
      if (windowHeight - mouseY < 150) {
        setIsFooterVisible(true);
      } else {
        setIsFooterVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <footer className={`footer ${isFooterVisible ? 'footer-visible' : ''}`}>
      <p>&copy; {new Date().getFullYear()} Student Feedback System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
