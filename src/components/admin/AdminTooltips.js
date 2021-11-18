import { Box, Typography } from '@material-ui/core';
import React from 'react';

export const AdminTooltips = ({ active, payload }) => {
  const mapPayloadName = (name) => {
    switch (name) {
      case 'disfluencyPerTotalWord':
        return 'Disfluency per Total Word';
      case 'disfluencyPerVideoDuration':
        return 'Disfluency per Video Duration';
      case 'silencePerVideoDuration':
        return 'Silence per Video Duration';
      case 'disfluencyPerSilence':
        return 'Disfluency per Silence';
      default:
        return name;
    }
  };

  const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';

  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          p: 1,
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(0, 0, 0, .54)'
        }}
      >
        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', pb: 1 }}>
          {payload[0].payload.datetime}
        </Typography>
        {payload.map((ele, index) => (
          <Typography key={index} sx={{ fontSize: '14px', color: ele.color }}>
            {ele.name === 'wpm' ? 'WPM' : capitalize(mapPayloadName(ele.name))}:{' '}
            {ele.value}
          </Typography>
        ))}
      </Box>
    );
  }

  return null;
};
