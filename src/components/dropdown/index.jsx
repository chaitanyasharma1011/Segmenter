import styled from "@emotion/styled";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { v4 } from "uuid";

const CustomSelect = styled(FormControl, {
  shouldForwardProp: (props) => props !== "inputStyles",
})(({ inputStyles }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    // width: 350,
    width: "100%",
    "& fieldset": {
      borderColor: "black",
    },
  },
  ...inputStyles,
}));

const AppSelect = ({
  id = v4(),
  sx = {},
  label = null,
  error = false,
  helperText = "",
  options,
  name,
  value,
  onChange,
  disabled = false,
  className = "",
  rerender = false,
}) => (
  <div className={`w-full ${className}`}>
    <CustomSelect sx={sx} error={error} size="small" disabled={disabled}>
      <InputLabel>
        <span className="font-inter text-sm">{label}</span>
      </InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 250,
            },
          },
        }}
      >
        {options.map(({ _id, description, option }) => (
          <MenuItem value={option} key={_id}>
            <span className="font-inter text-sm text-[#3d3d3d]">
              {description}
            </span>
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </CustomSelect>
  </div>
);

export default AppSelect;

// AppSelect.defaultProps = {
//   sx: {},
//   error: false,
//   helperText: "",
//   options: [],
// };
// AppSelect.propTypes = {
//   sx: PropTypes.oneOfType([
//     PropTypes.object,
//     PropTypes.func,
//   ]),
//   id: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   error: PropTypes.bool,
//   helperText: PropTypes.node,
//   options: PropTypes.array,
// };
// export default AppSelect;
