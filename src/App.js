import 'react-perfect-scrollbar/dist/css/styles.css';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from './redux/actions/authActions';

const App = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authentication);
  const { token } = authState;

  useEffect(() => {
    if (token) {
      dispatch(verifyToken(token));
    }
  }, [token, dispatch]);

  const routing = useRoutes(routes(!!token));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
