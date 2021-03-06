import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Chip,
  Button,
  Box,
  Typography
} from '@material-ui/core';
import moment from 'moment';

const LandingCard = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography color="textPrimary" gutterBottom variant="h4">
              {props.item.videoName}
            </Typography>
            <Typography color="textPrimary" gutterBottom variant="h4">
              {props.videoNumber}
            </Typography>
          </Box>
          {props.item.description.length > 0 ? (
            <Typography color="textPrimary" variant="body1">
              Description: {props.item.description}
            </Typography>
          ) : null}
          <Typography color="textPrimary" variant="body1">
            Status: {props.item.status}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Created at:{' '}
            {moment(props.item.createDate).format('DD/MM/YYYY, h:mm:ss')}
          </Typography>
          {props.item.status === 'Done' && (
            <Typography color="textPrimary" variant="body1">
              Updated at:{' '}
              {moment(props.item.lastUpdate).format('DD/MM/YYYY, h:mm:ss')}
            </Typography>
          )}
          {props.item.tags.length > 0 ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography color="textPrimary" variant="body1">
                Tags:
              </Typography>
              {props.item.tags.map((tag) => (
                <Chip key={tag} color="primary" sx={{ m: 0.5 }} label={tag} />
              ))}
            </Box>
          ) : null}
        </CardContent>
        {props.item.status === 'Done' && (
          <CardActions
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              size="small"
              color="primary"
              onClick={props.openEditModalHandler}
            >
              EDIT
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                navigate(`/app/dashboard/${props.item.videoUUID}`, {
                  replace: true
                });
              }}
            >
              SHOW DETAIL
            </Button>
          </CardActions>
        )}
      </Card>
    </>
  );
};

LandingCard.propTypes = {
  item: PropTypes.object.isRequired
};

export default LandingCard;
