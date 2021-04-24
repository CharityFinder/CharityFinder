import {
  InputGroup,
  FormControl,
  Button
} from "react-bootstrap";

export const Searchbar = ({changeHandler}) => {
  return (
    <InputGroup
      onChange={changeHandler}
      className="mx-auto"
      style={{ width: "50%", paddingTop: 30 }}
    >
      <FormControl
        placeholder="Search for a Charity"
        aria-label="Search for a Charity"
        aria-describedby="basic-addon2"
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" type="submit">
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};
