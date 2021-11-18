import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from '@material-ui/core';

const AdminBaseLine = () => {
  return (
    <Card>
      <CardHeader
        subheader="To show your addtional baseline to the user"
        title="Add New Baseline"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: '100%'
          }}
        >
          <Typography>You don't have any addtional baseline yet</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdminBaseLine;
