import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Button,
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
            Video Name: {props.item.videoName}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Video UUID: {props.item.videoUUID}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Status: {props.item.status}
          </Typography>
          <Typography color="textPrimary" variant="body1">
            Created at:{' '}
            {moment(props.item.createDate).format('MMMM Do YYYY, h:mm:ss a')}
          </Typography>
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
              onClick={props.handleClickOpen}
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
