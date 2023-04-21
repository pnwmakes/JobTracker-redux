import React from 'react';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import JobList from './components/JobList';
import AddJobModal from './components/AddJobModal';
import './App.css';

const App = () => {

  return (
    <div className="App">
      <Navigation />
      <header className="header">
        <h1>Jobs Applied To</h1>
      </header>
      <Container className="job-list-container">
        <JobList />
        <AddJobModal />
      </Container>
    </div>
  );
};

export default App;












