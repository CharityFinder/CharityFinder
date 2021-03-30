import React from 'react'
import { Form } from "react-bootstrap";

export const Checkbox = ({inputLabel, inputOnChange}) => {
  return (
    // <Form.Check 
    //   type='checkbox'
    //   id='default-checkbox'
    //   label={inputLabel}
    //   name={inputLabel}
    //   onChange={inputOnChange}
    //   style={{backgroundColor: "red",}}
    // />
    
    <Form.Check className="mx-auto" type="checkbox" id='default-checkbox' style={{textAlign: "left"}}>
      <Form.Check.Input  type="checkbox" name={inputLabel} onChange={inputOnChange} />
      <Form.Check.Label> {inputLabel} </Form.Check.Label>
    </Form.Check>
  )
}
