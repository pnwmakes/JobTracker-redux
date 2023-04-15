import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import moment from 'moment';
import Navigation from './components/Navigation';
import JobList from './components/JobList';
import AddJobModal from './components/AddJobModal';
import { addJob, deleteJob, updateJob, updateJobStatus } from './redux/jobSlice';
import { setSearchTerm } from './redux/searchSlice';
import './App.css';


const App = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const handleDeleteJob = (jobId) => {
    dispatch(deleteJob(jobId));
  };

  const handleAddJob = (job) => {
    const formattedJob = {
      ...job,
      appliedDate: moment(job.appliedDate).format('MM/DD/YYYY'),
    };
    dispatch(addJob(formattedJob));
  };

  const handleStatusChange = (jobId, newStatus) => {
    dispatch(updateJobStatus({ jobId, newStatus }));
  };

  const handleUpdateJob = (updatedJob) => {
    dispatch(updateJob(updatedJob));
  };

  const handleSearchChange = (searchValue) => {
    dispatch(setSearchTerm(searchValue));
  };

  return (
    <div className="App">
      <Navigation onAddJob={handleAddJob} onSearchChange={handleSearchChange} />
      <header className="header">
        <h1>Jobs Applied To</h1>
      </header>
      <Container className="job-list-container">
        <JobList
          onDeleteJob={handleDeleteJob}
          onStatusChange={handleStatusChange}
          onUpdateJob={handleUpdateJob}
        />
        <AddJobModal onAddJob={handleAddJob} />
      </Container>
    </div>
  );
};

export default App;













