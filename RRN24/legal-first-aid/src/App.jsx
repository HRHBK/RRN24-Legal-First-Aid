import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';  // Corrected import
import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Form from './Components/LoginSignup/Form.jsx';
import Question_Answers from './Pages/Question_Answers';
import PrivacyPolicy from './Pages/PrivacyPolicy.jsx';
import TermsOfServices from './Pages/TermsOfServices.jsx';


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
  }
]);

const App = () => {
  return <RouterProvider router={router} />  // Corrected RouterProvider
}

export default App;
