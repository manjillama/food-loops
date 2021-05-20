import React from 'react';
import { Form } from 'react-bootstrap';

export const TextArea = ({ handleChange, rows, label, ...otherProps }) => {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        as="textarea"
        rows={rows ? rows : 3}
        onChange={handleChange}
        {...otherProps}
      />
    </Form.Group>
  );
};
