import { Box, Card } from '@material-ui/core';
import AnalyticItems from './AnalyticItems';

const AnalyticDetails = (props) => {
  const { analyticDetails, sx } = props;
  return (
    <Card sx={sx}>
      <Box
        sx={{
          display: 'flex',
          pt: 3,
          px: 4,
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {analyticDetails.map((analyticDetail, index, arr) => (
          <AnalyticItems
            key={analyticDetail.label}
            label={analyticDetail.label}
            value={analyticDetail.value}
            index={index}
            arr={arr}
          />
        ))}
      </Box>
    </Card>
  );
};

export default AnalyticDetails;
