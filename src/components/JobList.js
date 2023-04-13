import React from 'react';
import JobItem from './JobItem';
import { ListGroup } from 'react-bootstrap';

function JobList({ jobs, onDeleteJob, onUpdateJob, onStatusChange }) {
    return (
        <ListGroup>
            {jobs.map((job) => (
                <JobItem
                    key={job.id}
                    job={job}
                    onDeleteJob={onDeleteJob}
                    onUpdateJob={onUpdateJob}
                    onStatusChange={onStatusChange}
                />
            ))}
        </ListGroup>
    );
}

export default JobList;

