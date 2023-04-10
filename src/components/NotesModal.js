import React from 'react';
import { Modal, Form, Button, FormControl } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const notesSchema = Yup.object().shape({
    noteText: Yup.string().required('Note is required'),
});

const NotesModal = ({ show, onHide, notes = [], onAddNote, onDeleteNote }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Job Notes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {notes.map((note) => (
                        <li key={note.id}>
                            {note.text}
                            <button onClick={() => onDeleteNote(note.id)}>X</button>
                        </li>
                    ))}
                </ul>
                <Formik
                    initialValues={{ noteText: '' }}
                    validationSchema={notesSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        onAddNote(values.noteText);
                        resetForm();
                        setSubmitting(false);
                    }}
                >
                    {({ handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Note</Form.Label>
                                <Field as={FormControl} rows={2} cols={30} type="text" name="noteText" />
                                <ErrorMessage name="noteText" component="div" className="text-danger" />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                Add Note
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default NotesModal;

