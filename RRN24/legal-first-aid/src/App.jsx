import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Form from './Components/LoginSignup/Form.jsx';
import Question_Answers from './Pages/Question_Answers';
import PrivacyPolicy from './Pages/PrivacyPolicy.jsx';
import TermsOfServices from './Pages/TermsOfServices.jsx';
import UserDashboard from './Pages/UserDashboard.jsx';
import ErrorBoundary from './Components/ErrorBoundary';

// Move these ABOVE the router
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

const RedirectToLogin = () => (
  <div style={{ textAlign: 'center', padding: '50px' }}>
    <h1>Access Denied</h1>
    <p>You must be logged in to perform this action.</p>
    <a href="/login" style={{ color: '#0073b1', textDecoration: 'none' }}>
      Go to Login
    </a>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/login',
    element: <Form />,
  },
  {
    path: '/q&a',
    element: <Question_Answers />,
  },
  {
    path: '/termsofservice',
    element: <TermsOfServices />,
  },
  {
    path: '/privacypolicy',
    element: <PrivacyPolicy />,
  },
  {
    path: '/dashboard',
    element: isAuthenticated() ? <UserDashboard /> : <RedirectToLogin />,
  },
  {
    path: '*',
    element: (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/" style={{ color: '#0073b1', textDecoration: 'none' }}>
          Go Back
        </a>
      </div>
    ),
  },
]);

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
