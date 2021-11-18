import { Box, Typography } from '@material-ui/core';
import React from 'react';

export const AdminTooltips = ({ active, payload, userBaseline }) => {
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
          {payload[0].payload.createDate}
        </Typography>
        {payload.map((ele, index) => (
          <Typography key={index} sx={{ fontSize: '14px', color: ele.color }}>
            {ele.name}: {ele.value}
          </Typography>
        ))}
      </Box>
    );
  }

  return null;
};
