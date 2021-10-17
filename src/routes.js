import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Home from 'src/pages/Home';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import Landing from './pages/Landing';

const routes = (isLoggedIn) => [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/" />,
    children: [
      { path: 'landing', element: <Landing /> },
      { path: 'dashboard/:videoUUID', element: <Dashboard /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/landing" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Home /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
