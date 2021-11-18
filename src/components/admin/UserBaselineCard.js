import { Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import UserBaselineChart from './UserBaselineChart';

const UserBaselineCard = (props) => {
  const adminState = useSelector((state) => state.admin);
  const { allUserBaseline } = adminState;
  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="To monitoring all user baseline"
          title="All User Baseline"
        />
        <Divider />
        <CardContent>
          <UserBaselineChart allUserBaseline={allUserBaseline} />
        </CardContent>
      </Card>
    </form>
  );
};

export default UserBaselineCard;
