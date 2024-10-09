// import library
import React from 'react';

// import templates
import Header from './templates/header';
import Content from './templates/content';
import Footer from './templates/footer';

// import styles
import './styles/layout.css';
import './styles/header.css';
import './styles/taskbar.css';
import './styles/offcanvas.css';
import './styles/content.css';
import './styles/footer.css';

function App() {
  return (
    <body>
      <Header />
      <Content />
      <Footer />
    </body>
  );
}

export default App;
