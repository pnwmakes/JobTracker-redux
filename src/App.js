import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JobList from './components/JobList';
import AddJobModal from './components/AddJobModal';
import { Navbar, Container, Button, FormControl } from 'react-bootstrap';
import './App.css';
import { addJob, deleteJob, updateJob, updateJobStatus, addNote } from './redux/jobSlice';
import { setSearchTerm } from './redux/searchSlice';

const Navigation = ({ onAddJob, onSearchChange }) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand className="mr-auto ml-3">My Job Tracker</Navbar.Brand>
      <Button className="calendar-btn mr-3" variant="outline-light">Calendar</Button>
      <FormControl
        type="text"
        placeholder="Search"
        className="mr-sm-2 search-input"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Button className="add-job-btn mr-3 ml-3 border-dark text-dark" variant="outline-success" onClick={handleShowModal}>Add Job</Button>
      <AddJobModal show={showModal} onHide={handleCloseModal} onAddJob={onAddJob} />
    </Navbar>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const handleDeleteJob = (jobId) => {
    dispatch(deleteJob(jobId));
  };

  const handleAddJob = (job) => {
    dispatch(addJob(job));
  };

  const handleStatusChange = (jobId, newStatus) => {
    dispatch(updateJobStatus({ jobId, newStatus }));
  };

  const handleAddNote = (jobId, newNote) => {
    dispatch(addNote({ jobId, newNote }));
  };

  const handleUpdateJob = (updatedJob) => {
    dispatch(updateJob(updatedJob));
  };

  const handleSearchChange = (searchValue) => {
    dispatch(setSearchTerm(searchValue));
  };

  const filteredJobs = jobs.filter((job) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchTermLower) ||
      job.company.toLowerCase().includes(searchTermLower) ||
      job.location.toLowerCase().includes(searchTermLower) ||
      job.description.toLowerCase().includes(searchTermLower) ||
      job.status.toLowerCase().includes(searchTermLower)
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
      </Container>
    </div>
  );
};

export default App;








