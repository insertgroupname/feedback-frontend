import { Card, Divider, Box, Typography } from '@material-ui/core';
import moment from 'moment';

const SoundDetail = (props) => {
  const soundDetail = props.sound || {
    video_len: 0,
    total_words: 0,
    hestiation_: {
      total_count: 0
    },
    silence: {
      total_silence: 0
    }
  };
  const formatted = (secs) => {
    let secondToFormat = moment.utc(secs * 1000).format('mm:ss');
    return secondToFormat;
  };

  return (
    <Card {...props}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ height: '100%' }}
      >
        <Box
          sx={{
            height: '25%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
          }}
        >
          <Typography variant="body1" color="primary">
            Silences
          </Typography>
          <Typography variant="h3">
            {Math.floor(soundDetail.silence.total_silence)} s
          </Typography>
        </Box>
        <Divider flexItem />
        <Box
          sx={{
            height: '25%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
          }}
        >
          <Typography variant="body1" color="primary">
            Total Time
          </Typography>
          <Typography variant="h3">
            {formatted(soundDetail.video_len)} mins
          </Typography>
        </Box>
        <Divider flexItem />
        <Box
          sx={{
            height: '25%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
          }}
        >
          <Typography variant="body1" color="primary">
            Filler per Minute
          </Typography>
          <Typography variant="h3">
            {(
              (60 * soundDetail.hestiation_.total_count) /
              soundDetail.video_len
            ).toFixed(2)}{' '}
            fillers per minute
          </Typography>
        </Box>
        <Divider flexItem />
        <Box
          sx={{
            height: '25%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
          }}
        >
          <Typography variant="body1" color="primary">
            Total Word
          </Typography>
          <Typography variant="h3">{soundDetail.total_words} words</Typography>
        </Box>
        <Divider flexItem />
      </Box>
    </Card>
  );
};

export default SoundDetail;
