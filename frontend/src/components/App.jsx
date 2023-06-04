import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import NotFound from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignUp from './SignUpPage.jsx';
import routes from '../routes.js';
import Header from './Header.jsx';
import PrivateRoute from './PrivatePage.jsx';

const App = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <Router>
        <Header />
        <Routes>
          <Route path={routes.chatPagePath} element={<PrivateRoute />} />
          <Route path={routes.loginPagePath} element={<LoginPage />} />
          <Route path={routes.signupPagePath} element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </div>
);

export default App;
