import React from 'react'
import { Form } from "react-bootstrap";

export const Checkbox = ({inputLabel, inputOnChange}) => {
  return (
    <Form.Check 
      type='checkbox'
      id='default-checkbox'
      label={inputLabel}
      name={inputLabel}
      onChange={inputOnChange}
    />
  )
}
