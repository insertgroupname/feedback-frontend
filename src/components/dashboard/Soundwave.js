import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect
} from 'react';
import { useSelector } from 'react-redux';
import { WaveSurfer, WaveForm, Region } from 'wavesurfer-react';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography
} from '@material-ui/core';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

const Soundwave = (props) => {
  const itemDetailState = useSelector((state) => state.itemDetail);
  const { item, videoRequired, streaming } = itemDetailState;

  const hesitation =
    item.report && item.report.postProcessing
      ? item.report.postProcessing.hestiation_.marker
      : {};

  const wavesurferRef = useRef();
  const initialZoom = 0;
  const [zoom, setZoom] = useState(initialZoom);

  const [isPlaying, setIsPlaying] = useState(false);

  const zoomIn = useCallback(() => {
    setZoom((prevZoom) => prevZoom + 5);
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prevZoom) => prevZoom - 5);
  }, []);

  useEffect(() => {
    wavesurferRef.current.zoom(zoom);
  });

  const skipForward = useCallback(() => {
    wavesurferRef.current.skipForward(5);
  }, []);

  const skipBackward = useCallback(() => {
    wavesurferRef.current.skipBackward(5);
  }, []);

  const timeIntervalHandler = useCallback((pxPerSec) => {
    let chunkInterval;
    if (pxPerSec >= 25 * 100) {
      chunkInterval = 0.01;
    } else if (pxPerSec >= 25 * 40) {
      chunkInterval = 0.025;
    } else if (pxPerSec >= 25 * 10) {
      chunkInterval = 0.1;
    } else if (pxPerSec >= 25 * 4) {
      chunkInterval = 0.25;
    } else if (pxPerSec >= 25) {
      chunkInterval = 1;
    } else if (pxPerSec * 5 >= 25) {
      chunkInterval = 5;
    } else if (pxPerSec * 15 >= 25) {
      chunkInterval = 15;
    } else {
      chunkInterval = Math.ceil(0.5 / pxPerSec) * 120;
    }
    return chunkInterval;
  }, []);

  let formatHesitation = [];

  // very small less than 1 sec not show
  for (const [, value] of Object.entries(hesitation)) {
    for (let i of value.words) {
      formatHesitation.push({
        start: i[1],
        end: i[2],
        color: 'rgba(255,0,0,0.4)',
        drag: false,
        resize: false
      });
    }
  }

  const [regions, setRegions] = useState(formatHesitation);

  const regionsRef = useRef(regions);

  useEffect(() => {
    regionsRef.current = regions;
  }, [regions]);

  const regionCreatedHandler = useCallback(
    (region) => {
      setRegions([...regionsRef.current, { ...region }]);
    },
    [regionsRef]
  );

  const plugins = useMemo(() => {
    return [
      {
        plugin: TimelinePlugin,
        options: {
          container: '#timeline',
          backend: 'MediaElement',
          timeInterval: timeIntervalHandler
        }
      },
      {
        plugin: RegionsPlugin,
        options: { dragSelection: false }
      }
    ].filter(Boolean);
  }, [timeIntervalHandler]);

  const handleWSMount = useCallback(
    (waveSurfer) => {
      wavesurferRef.current = waveSurfer;
      if (wavesurferRef.current) {
        if (videoRequired) {
          wavesurferRef.current.load(streaming);
          wavesurferRef.current.on('region-created', regionCreatedHandler);
          wavesurferRef.current.on('seek', () => {
            if (wavesurferRef.current.isPlaying()) {
              wavesurferRef.current.play();
            }
          });
        }
      }
    },
    [regionCreatedHandler, streaming, videoRequired]
  );

  const togglePlayPause = useCallback(() => {
    wavesurferRef.current.playPause();
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <Card {...props}>
      <Box display="flex" justifyContent="space-between">
        <CardHeader
          title="Soundwave Visualization"
          subheader="Tone of voice and disfluency from your presentation"
        />
        <Box p={1}>
          <IconButton onClick={zoomIn}>
            <ZoomInIcon />
          </IconButton>
          <IconButton onClick={zoomOut} disabled={!zoom}>
            <ZoomOutIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box display="flex" justifyContent="center" p={2}>
        <hr
          style={{
            transform: 'rotate(90deg)',
            borderColor: 'red',
            margin: '0 1rem'
          }}
        />
        <Typography color="red">disfluency</Typography>
      </Box>
      <CardContent>
        <Box
          sx={{
            height: 420
          }}
        >
          <WaveSurfer plugins={plugins} onMount={handleWSMount}>
            <WaveForm
              id="waveform"
              height={330}
              barWidth={3}
              waveColor="#c6c6c6"
              progressColor="#3f51b5"
            >
              {regions.map((regionProps, index) => (
                <Region key={index} {...regionProps} />
              ))}
            </WaveForm>
            <Box id="timeline" />
          </WaveSurfer>
          <Box display="flex" justifyContent="center" p={2}>
            <Box>
              <IconButton onClick={skipBackward} disabled={!skipBackward}>
                <SkipPreviousIcon />
              </IconButton>
              <IconButton onClick={togglePlayPause}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={skipForward}>
                <SkipNextIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Soundwave;
