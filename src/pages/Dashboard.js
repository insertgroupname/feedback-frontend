import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import AveragePace from 'src/components/dashboard/AveragePace';
import Pace from 'src/components/dashboard/Pace';
import Fillers from 'src/components/dashboard/Fillers';
import FillersChart from 'src/components/dashboard/FillersChart';
import RepetitionWords from 'src/components/dashboard/RepetitionWords';
import Vocabulary from 'src/components/dashboard/Vocabulary';
import Keyword from 'src/components/dashboard/Keyword';
import Transcript from 'src/components/dashboard/Transcript';
import SoundDetail from 'src/components/dashboard/SoundDetail';
import Soundwave from 'src/components/dashboard/Soundwave';
import axios from 'axios';

const Dashboard = () => {
  let { videoUUID } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState({
    videoName: ''
  });
  const [soundDetailData, setSoundDetailData] = useState();
  // const [averagePaceData, setAveragePaceData] = useState();
  const [paceData, setPaceData] = useState();
  // const [filterData, setFilterData] = useState();
  const [filterChartData, setFilterChartData] = useState();
  const [repetitionWordData, setRepetitionWordData] = useState();
  const [vocabularyData, setVocabularyData] = useState();
  const [keywordData, setKeywordData] = useState();
  const [transcriptData, setTranscriptData] = useState();
  useEffect(() => {
    const fetchDetailData = async () => {
      let userId = '0000';
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://10.4.56.44:81/api/v1/records/${userId}/${videoUUID}`
        );
        setIsLoading(false);
        const responseData = response.data[0];
        console.log('Response', responseData);
        setVideoData({
          videoUUID: responseData.videoUUID,
          videoName: responseData.videoName,
          status: responseData.status
        });
        setFilterChartData(responseData.postProcessing.hestiation_.marker);
        setPaceData(responseData.postProcessing.avg_wpm);
        setSoundDetailData(responseData.postProcessing);
        setRepetitionWordData(responseData.postProcessing.word_frequency);
        setVocabularyData(responseData.postProcessing.vocab);
        setKeywordData(responseData.postProcessing.keyword);
        setTranscriptData(responseData.results);
      } catch (e) {
        if (e.response) {
          console.log(e.response.data);
          console.log(e.response.status);
          console.log(e.response.headers);
        } else if (e.request) {
          console.log(e.request);
        } else {
          console.log('e', e.message);
        }
        setIsLoading(false);
      }
    };
    fetchDetailData();
  }, [videoUUID]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Container maxWidth={false}>
            <Typography variant="h3" style={{ paddingBottom: '1rem' }}>
              {videoData.videoName}
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={9} md={12} xl={9} xs={12}>
                <Soundwave uuid={videoUUID} />
              </Grid>
              <Grid item lg={3} md={12} xl={3} xs={12}>
                <SoundDetail sound={soundDetailData} sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={8} md={12} xl={8} xs={12}>
                <AveragePace />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <Pace pace={paceData} sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={6} md={12} xl={6} xs={12}>
                <Fillers sx={{ height: '100%' }} />
              </Grid>
              <Grid item lg={6} md={12} xl={6} xs={12}>
                <FillersChart fillerchart={filterChartData} />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <RepetitionWords repetition={repetitionWordData} />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <Vocabulary vocabulary={vocabularyData} />
              </Grid>
              <Grid item lg={4} md={12} xl={4} xs={12}>
                <Keyword keyword={keywordData} />
              </Grid>
              <Grid item lg={12} md={12} xl={12} xs={12}>
                <Transcript transcript={transcriptData} />
              </Grid>
            </Grid>
          </Container>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
