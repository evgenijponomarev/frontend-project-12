import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/hooks.js';
import routes from '../routes.js';
import ChatPage from './componentsChat/ChatPage.jsx';

const PrivateRoute = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.loggedIn) return <ChatPage />;

  return (
    <Navigate
      to={routes.loginPagePath}
      state={{ from: location }}
    />
  );
};

export default PrivateRoute;
