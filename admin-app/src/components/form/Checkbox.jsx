import React from 'react';
import { Form } from 'react-bootstrap';

export const Checkbox = ({ label, ...otherProps }) => {
  return <Form.Check label={label} id={`inline-${label}`} {...otherProps} />;
};
