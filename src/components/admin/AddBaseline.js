import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';

const AddBaseline = (props) => {
  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="To create a user average baselines"
          title="Add baselines"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xl={4} xs={6}>
              <Typography>Average Pace Baseline</Typography>
            </Grid>
            <Grid item lg={4} md={6} xl={4} xs={6}>
              <Typography>Total Disfluency Baseline</Typography>
            </Grid>
            <Grid item lg={4} md={6} xl={4} xs={6}>
              {/* <Typography>Average Pace Baseline</Typography> */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

export default AddBaseline;
