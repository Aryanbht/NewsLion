import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export default class App extends Component {
  render() {
    // Define an array of categories for which to create routes
    const categories = [
      "general",
      "business",
      "entertainment",
      "health",
      "science",
      "sports",
      "technology"
    ];

    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            {/* Redirect root path "/" to "/general" */}
            <Route path="/" element={<Navigate to="/general" replace />} />
            {categories.map((category) => (
              <Route
                key={category}
                path={`/${category}`}
                element={<News key={category} pageSize={6} country="in" category={category} />}
              />
            ))}
            {/* Redirect all other paths to "/general" */}
            <Route path="*" element={<Navigate to="/general" replace />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
