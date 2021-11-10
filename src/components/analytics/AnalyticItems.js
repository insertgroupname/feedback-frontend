import { Box, Divider, Typography } from '@material-ui/core';
const AnalyticItems = (props) => {
  const { label, value } = props;
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h5">{label}</Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
      <Divider />
    </>
  );
};

export default AnalyticItems;
