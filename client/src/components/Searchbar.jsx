import { InputGroup, FormControl, Button } from "react-bootstrap";

export const Searchbar = ({ changeHandler }) => {
  return (
    <InputGroup className="mx-auto" style={{ width: "50%", paddingTop: 30 }}>
      <FormControl
        placeholder="Search for a Charity"
        aria-label="Search for a Charity"
        name="search"
        aria-describedby="basic-addon2"
        onChange={changeHandler}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" type="submit">
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};
