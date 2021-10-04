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
import { url } from './utils/globalVariable';

const App = () => {
  const [user, setUser] = useState({
    userId: '',
    isAuthentication: false
  });
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      let verifyTokenUrl = `${url}/verifyToken?token=${token}`;
      axios
        .get(verifyTokenUrl)
        .then((res) => {
          setUser((prevUser) => {
            return {
              ...prevUser,
              ...res.data
            };
          });
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          } else if (error.request) {
            console.log(error.request);
          } else if (error.message) {
            console.log(error.message);
          }
        });
    }
  }, []);

  const routing = useRoutes(routes(user));

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
