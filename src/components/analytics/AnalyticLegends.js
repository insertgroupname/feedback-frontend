import { Box, Typography } from '@material-ui/core';
import React from 'react';

export const AnalyticLegends = ({ payload }) => {
  if (payload) {
    const duplicatedPayload = payload.filter(
      (item, index, self) =>
        index === self.findIndex((i) => i.dataKey === item.dataKey)
    );

    const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';

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
              {ele.value === 'wpm' ? 'WPM' : capitalize(ele.value)}
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
            All Users Average
          </Typography>
        </Box>
      </Box>
    );
  }
  return null;
};
