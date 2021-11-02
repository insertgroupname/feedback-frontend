import { TextField, MenuItem, Box, Chip } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const FormSelect = (props) => {
  return (
    <TextField
      fullWidth
      select
      name="tags"
      id="tags"
      variant="outlined"
      label="Tags"
      margin="normal"
      SelectProps={{
        multiple: true,
        value: props.tags,
        onChange: props.handleFieldChange,
        renderValue: (selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                variant="outlined"
                onDelete={(event) => props.handleDelete(event, value)}
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Box>
        )
      }}
    >
      <MenuItem value="rehearsal">Rehearsal</MenuItem>
      <MenuItem value="presentation">Presentation</MenuItem>
      <MenuItem value="publicSpeaking">Public Speaking</MenuItem>
    </TextField>
  );
};
export default FormSelect;
