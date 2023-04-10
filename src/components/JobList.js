import React from 'react';
import JobItem from './JobItem';
import { ListGroup } from 'react-bootstrap';

function JobList({ jobs, onDeleteJob, onStatusChange, onUpdateJob }) {
    return (
        <ListGroup>
            {jobs.map((job) => (
                <JobItem key={job.id} job={job} onDeleteJob={onDeleteJob} onStatusChange={onStatusChange} onUpdateJob={onUpdateJob} />
            ))}
        </ListGroup>
    );
}

export default JobList;
