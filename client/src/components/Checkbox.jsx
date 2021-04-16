import { Form } from "react-bootstrap";

export const Checkbox = ({inputLabel, inputOnChange}) => {
  return (
    <Form.Check className="mx-auto" type="checkbox" id={'default-checkbox-' + inputLabel} style={{textAlign: "left"}} >
      <Form.Check.Input  type="checkbox" name={inputLabel} onChange={inputOnChange} />
      <Form.Check.Label> {inputLabel} </Form.Check.Label>
    </Form.Check>
  )
}
