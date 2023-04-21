import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ListGroupItem, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import NotesModal from './NotesModal';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { deleteJob, updateJobStatus, addNote, updateJob } from '../redux/jobSlice';

const JobItem = ({ job }) => {
    const dispatch = useDispatch();
    const [showNotesModal, setShowNotesModal] = useState(false);

    const handleStatusChange = (newStatus) => {
        dispatch(updateJobStatus({ jobId: job.id, newStatus }));
    };

    const handleShowNotesModal = () => {
        setShowNotesModal(true);
    };

    const handleCloseNotesModal = () => {
        setShowNotesModal(false);
    };

    const handleAddNote = (noteText) => {
        const newNote = {
            id: uuidv4(),
            text: noteText,
        };

        dispatch(addNote({ jobId: job.id, newNote }));
    };

    const handleDeleteNote = (noteId) => {
        const updatedNotes = job.notes.filter((note) => note.id !== noteId);
        const updatedJob = {
            ...job,
            notes: updatedNotes,
        };

        dispatch(updateJob(updatedJob));
    };

    const handleDeleteJob = () => {
        dispatch(deleteJob(job.id));
    };

    return (
        <ListGroupItem className="job-item">
            <h4>{job.title || 'No title available'}</h4>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.description}</p>
            <p>Status: {job.status}</p>
            <p>Applied Date: {moment(job.appliedDate).format('MM/DD/YYYY')}</p>

            <div className="button-group">
                <DropdownButton
                    id={`status-dropdown-${job.id}`}
                    title="Update Status"
                    variant="success"
                    onSelect={handleStatusChange}
                    className="mr-2 update-status-button"
                >
                    <Dropdown.Item eventKey="No Answer">No Answer</Dropdown.Item>
                    <Dropdown.Item eventKey="Interview">Interview</Dropdown.Item>
                    <Dropdown.Item eventKey="Rejection">Rejection</Dropdown.Item>
                    <Dropdown.Item eventKey="Offer">Offer</Dropdown.Item>
                    <Dropdown.Item eventKey="Follow up">Follow up</Dropdown.Item>
                    <Dropdown.Item eventKey="waiting">Waiting</Dropdown.Item>
                </DropdownButton>
                <Button className="notes-button mr-2" variant="info" onClick={handleShowNotesModal}>
                    Notes
                </Button>
                <Button variant="danger" onClick={handleDeleteJob}>
                    Delete
                </Button>
            </div>
            <NotesModal
                show={showNotesModal}
                onHide={handleCloseNotesModal}
                notes={job.notes}
                onAddNote={handleAddNote}
                onDeleteNote={handleDeleteNote}
            />
        </ListGroupItem>
    );
};

export default JobItem;




