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
  Chip,
  Typography
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const SettingsStopword = (props) => {
  const [stopwords, setStopwords] = useState([]);
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
    setStopwords((prev) => [
      ...prev,
      {
        id: Math.random(),
        value: inputValues.stopword
      }
    ]);
    setInputValues({
      stopword: ''
    });
  };

  const deleteStopwordHandler = (stopwordId) => () => {
    setStopwords((prev) =>
      prev.filter((stopword) => stopword.id !== stopwordId)
    );
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
          {stopwords.map((stopword) => {
            return (
              <Chip
                key={stopword.id}
                color="primary"
                sx={{ m: 0.5 }}
                label={stopword.value}
                onDelete={deleteStopwordHandler(stopword.id)}
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
