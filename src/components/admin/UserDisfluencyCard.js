import { Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import UserDisfluencyChart from './UserDIsfluencyChart';

const UserDisfluencyCard = (props) => {
  const adminState = useSelector((state) => state.admin);
  const { allUserBaseline } = adminState;
  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="To monitoring user average disfluency count"
          title="All User Average Disfluency Count"
        />
        <Divider />
        <CardContent>
          <UserDisfluencyChart allUserBaseline={allUserBaseline} />
        </CardContent>
      </Card>
    </form>
  );
};

export default UserDisfluencyCard;
