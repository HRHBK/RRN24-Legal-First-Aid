import React from 'react';
import Header from './Home/Header';
import Footer from './Home/Footer';


const PageLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  )
}

export default PageLayout