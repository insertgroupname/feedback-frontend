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
  Chip,
  Typography
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { addStopword, deleteStopword } from 'src/redux/actions/settingsActions';

const SettingsStopword = (props) => {
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const { stopwords } = settingState;
  const [showInput, setShowInput] = useState(false);
  const [inputValues, setInputValues] = useState({
    stopword: ''
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
      stopword: ''
    });
  };

  const addStopwordHandler = () => {
    const newStopword = inputValues.stopword;
    const newStopwords = stopwords.concat(newStopword);
    dispatch(addStopword(newStopwords));
    setInputValues({
      stopword: ''
    });
  };

  const deleteStopwordHandler = (deleteStop) => () => {
    const newStopwords = stopwords.filter(
      (stopword) => stopword !== deleteStop
    );
    dispatch(deleteStopword(newStopwords));
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="To create your own disfluency detection"
          title="Add New Stopword"
        />
        <Divider />
        <CardContent>
          {stopwords.length === 0 && (
            <Typography sx={{ display: 'inline' }} variant="body1">
              You don't have any stopword yet. You can add it by clicked add
              button
            </Typography>
          )}
          {stopwords.map((stopword, index) => {
            return (
              <Chip
                key={index}
                color="primary"
                sx={{ m: 0.5 }}
                label={stopword}
                onDelete={deleteStopwordHandler(stopword)}
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
              label="New Stopword"
              margin="normal"
              name="stopword"
              onChange={handleChange}
              type="text"
              value={inputValues.stopword}
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
                onClick={addStopwordHandler}
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

export default SettingsStopword;
