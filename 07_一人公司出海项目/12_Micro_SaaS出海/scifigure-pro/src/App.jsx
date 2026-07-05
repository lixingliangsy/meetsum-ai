import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FAQPage from './pages/FAQ';
import BlogPage from './pages/Blog';
import HomePage from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
