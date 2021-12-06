import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateItemDetailBaseline } from 'src/redux/actions/baselineActions';
import {
  openUpdateFailModal,
  openUpdateSuccessModal
} from 'src/redux/actions/modalActions';

const AdminBaseLine = () => {
  const baselineState = useSelector((state) => state.baseline);
  const { baseline, isLoading, error } = baselineState;

  const dispatch = useDispatch();
  const wpmRange = baseline ? baseline.WPMrange : [];

  const initialTotal = baseline ? baseline.acceptableDisfluencyPerMinut : 0;

  const [total, setTotal] = useState(initialTotal);

  const handleChange = (e) => {
    setTotal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateItemDetailBaseline({
        WPMrange: wpmRange,
        acceptableDisfluencyPerMinut: total
      })
    );
    if (error) {
      dispatch(openUpdateFailModal());
    } else {
      dispatch(openUpdateSuccessModal());
    }
  };

  return (
    <Card>
      <CardHeader
        subheader="Current acceptable disfluency per minute baseline"
        title="Adjust Acceptable Disfluency Per Minute"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: '100%'
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography>Acceptable Disfluency Per Minute</Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: '.5rem'
                }}
              >
                <TextField
                  variant="outlined"
                  label="Total Disfluency"
                  size="small"
                  value={total}
                  onChange={handleChange}
                  required
                />
                <Button
                  disabled={isLoading}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Update
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdminBaseLine;
