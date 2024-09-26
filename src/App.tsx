import React from 'react';
import './styles/test.css';

function App() {
  return (
    <body>

      {/* HEADER */}
      <header>
        <div className='banner'>
          <h1>Banner</h1>
        </div>
        <div className='taskBar'>
          <h1>taskBar</h1>
        </div>
      </header>

      {/* CONTENT */}
      <div className='mainContent'>
        <div className='contentContainer'>
          <h1>contenContainer</h1>
        </div>
        <div className='sideBar'>
          <h1>sideBar</h1>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className='upRow'>
          <div className='contact'>
            <h1>contact</h1>
          </div>
          <div className='footerContent'>
            <h1>footerContain</h1>
          </div>
        </div>
        <div className='copyright'>
          copyright
        </div>
      </footer>
    </body>
  );
}

export default App;
