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

const LandingCard = ({ user, ...rest }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      {...rest}
    >
      <CardContent>
        <Typography color="textPrimary" gutterBottom variant="h4">
          Video Name: {user.videoName}
        </Typography>
        <Typography color="textPrimary" variant="body1">
          Video UUID: {user.videoUUID}
        </Typography>
        <Typography color="textPrimary" variant="body1">
          Status: {user.status}
        </Typography>
        <Typography color="textPrimary" variant="body1">
          Created at:{' '}
          {moment(user.createDate).format('MMMM Do YYYY, h:mm:ss a')}
        </Typography>
      </CardContent>
      {user.status === 'Done' && (
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              navigate(`/app/dashboard/${user.videoUUID}`, { replace: true });
            }}
          >
            SHOW DETAIL
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

LandingCard.propTypes = {
  user: PropTypes.object.isRequired
};

export default LandingCard;
