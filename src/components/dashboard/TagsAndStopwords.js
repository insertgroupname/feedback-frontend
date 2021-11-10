import { useSelector } from 'react-redux';
import { Box, Typography, Chip } from '@material-ui/core';

const TagsAndStopwords = () => {
  const itemDetailState = useSelector((state) => state.itemDetail);
  const { item } = itemDetailState;
  const tags = item && item.tags ? item.tags : [];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
        gap: '.5rem'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '.5rem'
        }}
      >
        <Typography variant="body1">Tags:</Typography>
        {tags.map((tag) => (
          <Chip label={tag} color="primary" />
        ))}
      </Box>
      <Typography variant="body1">Stopwords:</Typography>
    </Box>
  );
};

export default TagsAndStopwords;
