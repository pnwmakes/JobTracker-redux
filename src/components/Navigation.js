import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddJobModal from './AddJobModal';
import { Navbar, Button, FormControl } from 'react-bootstrap';
import { addJob } from '../redux/jobSlice';
import { setSearchTerm } from '../redux/searchSlice';
import moment from 'moment';

const Navigation = () => {
    const [showModal, setShowModal] = React.useState(false);
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.search.searchTerm);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleAddJob = (job) => {
        const formattedJob = {
            ...job,
            appliedDate: moment(job.appliedDate).format('MM/DD/YYYY')
        };
        dispatch(addJob(formattedJob));
    };


    const handleSearchChange = (searchValue) => {
        dispatch(setSearchTerm(searchValue));
    };

    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand className="mr-auto ml-3">My Job Tracker</Navbar.Brand>
            <Button className="calendar-btn mr-3" variant="outline-light">
                Calendar
            </Button>
            <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2 search-input search-input-flex"
                onChange={(e) => handleSearchChange(e.target.value)}
                value={searchTerm}
            />
            <Button
                className="add-job-btn mr-3 ml-3 border-dark text-dark"
                variant="outline-success"
                onClick={handleShowModal}
            >
                Add Job
            </Button>
            <AddJobModal show={showModal} onHide={handleCloseModal} onAddJob={handleAddJob} />
        </Navbar>
    );
};

export default Navigation;



