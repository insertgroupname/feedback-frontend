import { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Card,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';
import LandingToolbar from '../components/landing/LandingToolbar';
import LandingCard from 'src/components/landing/LandingCard';
import { useDispatch, useSelector } from 'react-redux';
import LandingInitial from 'src/components/landing/LandingInitial';
import EditModal from '../components/modal/EditModal';
import ServerDown from './ServerDown';
import UploadModal from '../components/modal/UploadModal';
import HelpModal from '../components/modal/HelpModal';
import { openEditModal } from 'src/redux/actions/modalActions';
import { getFirstUUID } from 'src/utils/getFirstUUID';

const Landing = () => {
  const dispatch = useDispatch();

  const [tag, setTag] = useState('All');

  const handleChange = (event) => {
    setTag(event.target.value);
  };

  const openEditModalHandler = (videoUUID) => {
    dispatch(openEditModal(videoUUID));
  };

  const itemsState = useSelector((state) => state.items);
  const { isLoading: isItemLoading, items, error } = itemsState;

  const settingsState = useSelector((state) => state.settings);
  const { isLoading: isSettingLoading, username, tags } = settingsState;

  const selectedTag = items.map((item) => {
    return {
      ...item,
      selectedTag: item.tags.find((value) => {
        return value === tag;
      })
    };
  });

  let formatItem;

  if (tag !== 'All') {
    formatItem = selectedTag.filter((ele) => {
      return ele.selectedTag !== undefined;
    });
  } else {
    formatItem = items;
  }

  return (
    <>
      <Helmet>
        <title>Feedback | Landing</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          height: '100%'
        }}
      >
        {isItemLoading && isSettingLoading ? (
          <Box
            sx={{
              height: 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <ServerDown />
        ) : (
          <Container
            maxWidth={false}
            sx={{
              py: 3
            }}
          >
            <LandingToolbar username={username} itemLength={items.length} />
            <Card
              sx={{
                mt: 3,
                width: 'fit-content'
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <InputLabel id="filterTag">Filter Tag</InputLabel>
                <Select
                  labelId="filterTag"
                  id="filterTag"
                  value={tag}
                  onChange={handleChange}
                  autoWidth
                  label="Tag"
                >
                  <MenuItem value="All">All</MenuItem>
                  {tags.map((ele, index) => (
                    <MenuItem key={index} value={ele}>
                      {ele}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Card>
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {items.length > 0 ? (
                  formatItem.length > 0 ? (
                    formatItem.map((item) => (
                      <Grid item key={item.videoUUID} lg={4} md={6} xs={12}>
                        <LandingCard
                          item={item}
                          videoNumber={'#' + getFirstUUID(item.videoUUID)}
                          openEditModalHandler={() =>
                            openEditModalHandler(item.videoUUID)
                          }
                        />
                      </Grid>
                    ))
                  ) : (
                    <Box
                      sx={{
                        height: '650px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant="h5">
                        You don't have any video with this tag
                      </Typography>
                    </Box>
                  )
                ) : (
                  <LandingInitial />
                )}
              </Grid>
            </Box>
          </Container>
        )}
      </Box>
      <UploadModal />
      <EditModal />
      <HelpModal />
    </>
  );
};

export default Landing;
