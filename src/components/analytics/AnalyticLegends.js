import { Box, Typography } from '@material-ui/core';
import React from 'react';

export const AnalyticLegends = ({ payload }) => {
  const duplicatedPayload = payload.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.dataKey === item.dataKey)
  );
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        pb: 2,
        gap: '.5rem'
      }}
    >
      {duplicatedPayload.map((ele, index) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '.3rem'
          }}
          key={index}
        >
          <Box sx={{ height: 11, width: 15, background: ele.color }} />
          <Typography
            sx={{
              fontSize: '14px',
              color: ele.color
            }}
          >
            {ele.value}
          </Typography>
        </Box>
      ))}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '.3rem'
        }}
      >
        <hr
          style={{
            borderTop: '2px dotted black',
            width: 15
          }}
        />
        <Typography
          sx={{
            fontSize: '14px',
            color: 'black'
          }}
        >
          users baseline
        </Typography>
      </Box>
    </Box>
  );
};
