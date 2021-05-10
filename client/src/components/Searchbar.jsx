import { InputGroup, FormControl, Button } from "react-bootstrap";

export const Searchbar = ({ changeHandler }) => {
  return (
    <InputGroup
      className="mx-auto mb-3"
      style={{
        borderRadius: "1rem",
      }}
    >
      <FormControl
        style={{
          border: "1px solid var(--primary)",
        }}
        placeholder="Search for a Charity"
        aria-label="Search for a Charity"
        name="search"
        aria-describedby="basic-addon2"
        onChange={changeHandler}
      />
      <InputGroup.Append>
        <Button
          type="submit"
          style={{
            borderTopRightRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}
        >
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};
