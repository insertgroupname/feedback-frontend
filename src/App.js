import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState, useEffect, useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import Cookies from 'js-cookie';
import axios from 'axios';
import { UserContext } from './contexts/UserContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const providerValue = useMemo(
    () => ({ isLoggedIn, setIsLoggedIn }),
    [isLoggedIn, setIsLoggedIn]
  );

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      let verifyTokenUrl =
        'http://10.4.56.44:81/api/v1/verifyToken?token=' + token;
      axios
        .get(verifyTokenUrl)
        .then((res) => {
          console.log(res);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else if (error.message) {
            console.log(error.message);
          }
          setIsLoggedIn(false);
        });
    }
  }, []);

  const routing = useRoutes(routes(isLoggedIn));

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={providerValue}>
        <GlobalStyles />
        {routing}
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
