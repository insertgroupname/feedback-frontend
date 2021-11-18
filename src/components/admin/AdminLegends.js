import { Box, Typography } from '@material-ui/core';
import React from 'react';

export const AdminLegends = ({ payload }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        pb: 2,
        gap: '.5rem',
        flexWrap: 'wrap'
      }}
    >
      {payload.map((ele, index) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '.3rem'
          }}
          key={index}
        >
          <hr
            style={{
              borderTop: `2px solid ${ele.color}`,
              width: 15
            }}
          />
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
    </Box>
  );
};
