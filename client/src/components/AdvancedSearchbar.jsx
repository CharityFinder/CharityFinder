import { InputGroup, FormControl, Button } from "react-bootstrap";

export const AdvancedSearchbar = ({ changeHandler }) => {
  return (

      <InputGroup
        onChange={changeHandler}
        className="mx-auto"
        style={{ width: "50%" }}
      >
        <FormControl
          placeholder="City"
          aria-label="City"
          name="city"
          aria-describedby="basic-addon2"
        />
        <FormControl
          placeholder="State"
          aria-label="State"
          name="state"
          aria-describedby="basic-addon2"
        />
      </InputGroup>
  );
};
