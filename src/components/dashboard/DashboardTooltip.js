import { Box, Typography } from '@material-ui/core';
import React from 'react';

export const DashboardTooltip = ({ active, payload, acceptable }) => {
  if (active && payload && payload.length) {
    const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';
    console.log(payload);
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
          {payload[0].payload.timestamp} mins
        </Typography>
        {payload.map((ele, index) => (
          <Typography key={index} sx={{ fontSize: '14px', color: ele.color }}>
            {ele.name === 'range'
              ? `Good Average Pace: ${ele.value.join(' to ')}`
              : `${capitalize(ele.name)}: ${
                  ele.name === 'disfluency'
                    ? ele.value + ' times'
                    : ele.value || ele.name === 'pace'
                    ? ele.value + ' wpm'
                    : ele.value
                }`}
          </Typography>
        ))}
        {acceptable && (
          <Typography sx={{ color: 'blue', fontSize: '14px' }}>
            Acceptable Disfluency: {acceptable} times
          </Typography>
        )}
      </Box>
    );
  }

  return null;
};
