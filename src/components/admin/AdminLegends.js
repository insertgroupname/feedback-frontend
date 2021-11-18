import { Box, Typography } from '@material-ui/core';
import React from 'react';

export const AdminLegends = ({ payload }) => {
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
            {ele.value === 'wpm'
              ? 'WPM'
              : capitalize(mapPayloadName(ele.value))}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
