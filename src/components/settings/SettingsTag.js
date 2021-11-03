import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Chip
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const SettingsTag = (props) => {
  const [tags, setTags] = useState([
    {
      id: 1,
      value: 'Rehearsal'
    },
    {
      id: 2,
      value: 'Presentation'
    },
    {
      id: 3,
      value: 'Public Speaking'
    }
  ]);
  const [showInput, setShowInput] = useState(false);
  const [inputValues, setInputValues] = useState({
    tag: ''
  });

  const handleChange = (event) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value
    });
  };

  const showInputHandler = () => {
    setShowInput(true);
  };

  const closeInputHandler = () => {
    setShowInput(false);
    setInputValues({
      tag: ''
    });
  };

  const addTagHandler = () => {
    setTags((prev) => [
      ...prev,
      {
        id: Math.random(),
        value: inputValues.tag
      }
    ]);
    setInputValues({
      tag: ''
    });
  };

  const deleteTagHandler = (tagId) => () => {
    setTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="To create your own video categorize"
          title="Add New Tag"
        />
        <Divider />
        <CardContent>
          {tags.map((tag) => {
            return (
              <Chip
                key={tag.id}
                color="primary"
                sx={{ m: 0.5 }}
                label={tag.value}
                onDelete={deleteTagHandler(tag.id)}
              />
            );
          })}
          {showInput ? (
            <IconButton
              color="primary"
              aria-label="close"
              onClick={closeInputHandler}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              aria-label="open"
              onClick={showInputHandler}
            >
              <AddIcon />
            </IconButton>
          )}
          {showInput && (
            <TextField
              fullWidth
              label="New Tag"
              margin="normal"
              name="tag"
              onChange={handleChange}
              type="text"
              value={inputValues.tag}
              variant="outlined"
            />
          )}
        </CardContent>
        {showInput && (
          <>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={addTagHandler}
              >
                Add
              </Button>
            </Box>
          </>
        )}
      </Card>
    </form>
  );
};

export default SettingsTag;
