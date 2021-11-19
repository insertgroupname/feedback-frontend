import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Typography,
  Chip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { addTag, deleteTag } from 'src/redux/actions/settingsActions';

const SettingsTag = (props) => {
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const { tags } = settingState;

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
    const newTag = inputValues.tag;
    const newTags = tags.concat(newTag);
    dispatch(addTag(newTags));
    setInputValues({
      tag: ''
    });
  };

  const deleteTagHandler = (deleteTagValue) => () => {
    const newTags = tags.filter((tag) => tag !== deleteTagValue);
    dispatch(deleteTag(newTags));
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
          {tags.length === 0 && (
            <Typography sx={{ display: 'inline' }} variant="body1">
              You don't have any tag yet. You can add it by clicked add button
            </Typography>
          )}
          {tags.map((tag, index) => (
            <Chip
              key={index}
              color="primary"
              sx={{ m: 0.5 }}
              label={tag}
              onDelete={deleteTagHandler(tag)}
            />
          ))}
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
