import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import moment from 'moment';
import JobItem from './JobItem';

const JobList = ({ onDeleteJob, onUpdateJob, onStatusChange }) => {
    const jobs = useSelector((state) => state.jobs);
    const searchTerm = useSelector((state) => state.search.searchTerm);

    const filterJobs = (jobs, searchTerm) => {
        const searchTermLower = searchTerm.toLowerCase();
        return jobs.filter((job) => {
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
    };

    const filteredJobs = filterJobs(jobs, searchTerm);

    return (
        <ListGroup>
            {filteredJobs.map((job) => (
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
};

export default JobList;


