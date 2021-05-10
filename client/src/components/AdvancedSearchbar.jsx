import { InputGroup, FormControl } from "react-bootstrap";
import { STATE_ABBREVIATIONS } from "../utils/constants";

export const AdvancedSearchbar = ({ changeHandler }) => {
  const generateOptions = () => {
    return STATE_ABBREVIATIONS.map((state) => {
      return <option key={state}> {state} </option>;
    });
  };

  return (
    <InputGroup
      onChange={changeHandler}
      className="mx-auto"
      style={{
        width: "50%",
        borderRadius: "1rem",
      }}
    >
      <FormControl
        placeholder="City"
        aria-label="City"
        name="city"
        aria-describedby="basic-addon2"
        style={{
          border: "1px solid var(--primary)",
        }}
      />
      <FormControl
        as="select"
        defaultValue="State"
        aria-label="State"
        name="state"
        aria-describedby="basic-addon2"
        style={{
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
      >
        {generateOptions()}
      </FormControl>
    </InputGroup>
  );
};
