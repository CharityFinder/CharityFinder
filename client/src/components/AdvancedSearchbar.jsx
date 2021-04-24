import { InputGroup, FormControl, Button } from "react-bootstrap";

export const AdvancedSearchbar = ({ changeHandler }) => {
  return (
    <div>
      <InputGroup
        className="mx-auto"
        style={{ width: "50%", paddingTop: 30 }}
      >
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

      <InputGroup
        onChange={changeHandler}
        className="mx-auto"
        style={{ width: "50%", paddingTop: 30 }}
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
    </div>
  );
};
