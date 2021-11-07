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
          height: '100%'
        }}
      >
        <CardContent>
          <Typography color="textPrimary" gutterBottom variant="h4">
            {props.item.videoName}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Description: {props.item.description}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Status: {props.item.status}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Created at:{' '}
            {moment(props.item.createDate).format('MMMM Do YYYY, h:mm:ss a')}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Updated at:{' '}
            {moment(props.item.lastUpdate).format('MMMM Do YYYY, h:mm:ss a')}
          </Typography>
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
        </CardContent>
        {props.item.status === 'Done' && (
          <CardActions
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'stretch'
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
