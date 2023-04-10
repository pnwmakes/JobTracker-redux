import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';

const jobSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    company: Yup.string().required('Company is required'),
    location: Yup.string().required('Location is required'),
    description: Yup.string().required('Description is required'),
    appliedDate: Yup.date().required('Applied date is required'),
});

const AddJobModal = ({ show, onHide, onAddJob }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{ title: '', company: '', location: '', description: '', appliedDate: new Date() }}
                    validationSchema={jobSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        onAddJob({ ...values });
                        resetForm();
                        setSubmitting(false);
                        onHide();
                    }}
                >
                    {({ handleSubmit, isSubmitting, setFieldValue, values }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Field as={Form.Control} type="text" name="title" />
                                <ErrorMessage name="title" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Company</Form.Label>
                                <Field as={Form.Control} type="text" name="company" />
                                <ErrorMessage name="company" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Location</Form.Label>
                                <Field as={Form.Control} type="text" name="location" />
                                <ErrorMessage name="location" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Field as="textarea" rows={3} name="description" className="form-control" />
                                <ErrorMessage name="description" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Applied Date</Form.Label>
                                <DatePicker
                                    selected={values.appliedDate}
                                    onChange={(date) => setFieldValue('appliedDate', date)}
                                    className="form-control"
                                />
                                <ErrorMessage name="appliedDate" component="div" className="text-danger" />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                Add Job
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default AddJobModal;

