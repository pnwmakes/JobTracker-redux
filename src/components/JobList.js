import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import moment from 'moment';
import JobItem from './JobItem';

const JobList = () => {
    const jobs = useSelector((state) => state.jobs);
    const searchTerm = useSelector((state) => state.search.searchTerm);

    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        setFilteredJobs(filterJobs(jobs, searchTerm));
    }, [jobs, searchTerm]);

    const filterJobs = (jobs, searchTerm) => {
        return jobs.filter((job) => {
            const searchTermLower = searchTerm.toLowerCase();
            const titleMatch = !searchTerm || (job.title && job.title.toLowerCase().includes(searchTermLower));
            const companyMatch = !searchTerm || (job.company && job.company.toLowerCase().includes(searchTermLower));
            const locationMatch = !searchTerm || (job.location && job.location.toLowerCase().includes(searchTermLower));
            const descriptionMatch = !searchTerm || (job.description && job.description.toLowerCase().includes(searchTermLower));
            const statusMatch = !searchTerm || (job.status && job.status.toLowerCase().includes(searchTermLower));
            const dateMatch = !searchTerm || moment(job.appliedDate, 'MM/DD/YYYY').format('MM/DD/YYYY').toLowerCase().includes(searchTermLower);

            return (
                titleMatch &&
                companyMatch &&
                locationMatch &&
                descriptionMatch &&
                statusMatch &&
                dateMatch
            );
        });
    };

    return (
        <ListGroup>
            {filteredJobs.map((job) => (
                <JobItem key={job.id} job={job} />
            ))}
        </ListGroup>
    );
}

export default JobList;









