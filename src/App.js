import 'react-perfect-scrollbar/dist/css/styles.css';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import { getItems } from './redux/actions/itemsActions';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authentication);
  const { isAuthenticated } = authState;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getItems());
    }
  }, [dispatch, isAuthenticated]);

  const routing = useRoutes(routes(isAuthenticated));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
