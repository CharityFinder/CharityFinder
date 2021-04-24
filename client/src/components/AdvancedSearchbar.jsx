import { InputGroup, FormControl, Form } from "react-bootstrap";

export const AdvancedSearchbar = ({ changeHandler }) => {
  let states = [ "State", "AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"];

  const generateOptions = () => {
    return states.map((state) => {
      return <option key={state}> {state} </option>;
    });
  };

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
        as="select"
        defaultValue="State"
        aria-label="State"
        name="state"
        aria-describedby="basic-addon2"
      >
        {generateOptions()}
      </FormControl>
    </InputGroup>
  );
};
