import { Box, Typography } from '@material-ui/core';
import React from 'react';

export const AnalyticTooltips = ({ active, payload, userBaseline }) => {
  if (active && payload && payload.length) {
    const duplicatedPayload = payload.filter(
      (item, index, self) =>
        index === self.findIndex((i) => i.name === item.name)
    );

    const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';

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
          {payload[0].payload.videoName} (#{payload[0].payload.videoUUID})
        </Typography>
        {duplicatedPayload.map((ele, index) => (
          <Typography key={index} sx={{ fontSize: '14px', color: ele.color }}>
            {ele.name === 'wpm' ? 'WPM' : capitalize(ele.name)}:{' '}
            {ele.name === 'wpm' ? `${ele.value} wpm` : `${ele.value}%`}{' '}
            {ele.name === 'disfluency' && ele.payload.totalDisfluency
              ? `(${ele.payload.totalDisfluency} words)`
              : ''}
            {ele.name === 'word' && ele.payload.totalWord
              ? `(${ele.payload.totalWord} words)`
              : ''}
          </Typography>
        ))}
        <Typography sx={{ fontSize: '14px' }}>
          All users average: {userBaseline}
          {payload[0].name === 'wpm' ? ' wpm' : '%'}
        </Typography>
      </Box>
    );
  }

  return null;
};
