import { MenuItem } from "@mui/material";
import React from "react";

const Select = (props) => {
  const { label } = props;
  const [value, setValue] = useState("");

  const handleChange = () => {};
  return (
    <Box mt={3} width="100%">
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          <MenuItem></MenuItem>
          <MenuItem>Option2</MenuItem>
          <MenuItem>Option3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
