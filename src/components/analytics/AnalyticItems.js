import { Box, Divider, Typography } from '@material-ui/core';
const AnalyticItems = (props) => {
  const { label, value, index, arr } = props;
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
      {arr.length - 1 === index ? null : <Divider />}
    </>
  );
};

export default AnalyticItems;
