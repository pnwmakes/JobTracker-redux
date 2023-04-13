import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import moment from 'moment';
import Navigation from './components/Navigation';
import JobList from './components/JobList';
import AddJobModal from './components/AddJobModal';
import { addJob, deleteJob, updateJob, updateJobStatus } from './redux/jobSlice';
import { setSearchTerm } from './redux/searchSlice';

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

  const filteredJobs = jobs.filter((job) => {
    const searchTermLower = searchTerm.toLowerCase();
    const appliedDateLower = moment(job.appliedDate, 'MM/DD/YYYY').format('MM/DD/YYYY').toLowerCase();
    const isSearchTermDate = moment(searchTermLower, 'MM/DD/YYYY', true).isValid();
    const isAppliedDateMatch = appliedDateLower.includes(searchTermLower);

    return (
      job.title.toLowerCase().includes(searchTermLower) ||
      job.company.toLowerCase().includes(searchTermLower) ||
      job.location.toLowerCase().includes(searchTermLower) ||
      job.description.toLowerCase().includes(searchTermLower) ||
      job.status.toLowerCase().includes(searchTermLower) ||
      (isSearchTermDate && isAppliedDateMatch)
    );
  });

  return (
    <div className="App">
      <Navigation onAddJob={handleAddJob} onSearchChange={handleSearchChange} />
      <header className="header">
        <h1>Jobs Applied To</h1>
      </header>
      <Container className="job-list-container">
        <JobList
          jobs={filteredJobs}
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










