import { Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import UserPaceChart from './UserPaceChart';

const UserPaceCard = (props) => {
  const adminState = useSelector((state) => state.admin);
  const { allUserBaseline } = adminState;
  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="To monitoring user average pace"
          title="All User Average Pace"
        />
        <Divider />
        <CardContent>
          <UserPaceChart allUserBaseline={allUserBaseline} />
        </CardContent>
      </Card>
    </form>
  );
};

export default UserPaceCard;
