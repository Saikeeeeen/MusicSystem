
import React from 'react';

const Dashboard = () => {
  return (
    <main className="main">
      <header className="header">
        <img src="/musicpic.png" alt="College of Music Logo" className="logo" />
        <h1>Good Morning, Admin!</h1>
        <p className="date">Today is Saturday, February 07, 2025</p>
      </header>

      <section className="quick-actions" aria-label="Quick Actions">
        <div title="Book a Room" tabIndex={0}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-clock-icon lucide-file-clock"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="M8 14v2.2l1.6 1"/><circle cx="8" cy="16" r="6"/></svg>
          <span>Book a Room</span>
        </div>
        <div title="Student Logs" tabIndex={0}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
          </svg>
          <span>Student Logs</span>
        </div>
        <div title="Borrow Instrument" tabIndex={0}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-drum-icon lucide-drum"><path d="m2 2 8 8"/><path d="m22 2-8 8"/><ellipse cx="12" cy="9" rx="10" ry="5"/><path d="M7 13.4v7.9"/><path d="M12 14v8"/><path d="M17 13.4v7.9"/><path d="M2 9v8a10 5 0 0 0 20 0V9"/></svg>
          <span>Borrow Instrument</span>
        </div>
        <div title="Instrument Logs" tabIndex={0}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-clock-icon lucide-file-clock"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="M8 14v2.2l1.6 1"/><circle cx="8" cy="16" r="6"/></svg>
          <span>Instrument Logs</span>
        </div>
      </section>

      <section className="logs" aria-label="Today's Logs">
        <h2>Today's Logs</h2>
        <p className="subtitle">Booking Summary</p>

        <div className="booking-summary">
          <div className="card-group">
            <h3>Music Cubicles</h3>
            <p className="desc">Total and available cubicles</p>
            <div className="cards">
              <div className="card pink">
                <div className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="white" stroke="none" width="16" height="16"><rect x="3" y="7" width="18" height="13" rx="2" ry="2"/></svg>
                </div>
                <div className="number">6</div>
                <div className="label">Piano Cubicles</div>
                <div className="sub-label">3 Piano Cubicles Available</div>
              </div>
              <div className="card yellow">
                <div className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="white" stroke="none" width="16" height="16"><rect x="3" y="7" width="18" height="13" rx="2" ry="2"/></svg>
                </div>
                <div className="number">3</div>
                <div className="label">Guitar Cubicles</div>
                <div className="sub-label">No Guitar Cubicles Available</div>
              </div>
            </div>
          </div>

          <div className="card-group">
            <h3>Music Instruments</h3>
            <p className="desc">Total and available instruments</p>
            <div className="cards">
              <div className="card green">
                <div className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="white" stroke="none" width="16" height="16"><circle cx="12" cy="12" r="10"/></svg>
                </div>
                <div className="number">5</div>
                <div className="label">Violins</div>
                <div className="sub-label" style={{color:"#22c55e"}}>2 Violins Available</div>
              </div>
              <div className="card purple">
                <div className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="white" stroke="none" width="16" height="16"><rect x="3" y="7" width="18" height="13" rx="2" ry="2"/></svg>
                </div>
                <div className="number">4</div>
                <div className="label">Guitars</div>
                <div className="sub-label">3 Guitars Available</div>
              </div>
            </div>
          </div>
        </div>

        <div className="instruments">
          <h3>Instruments</h3>
          <p className="desc">The college provides instruments and cubicles that students can book and borrow upon request.</p>
          <div className="stats">
            <div className="stat-card yellow">
              <div className="label">Guitars:</div>
              <div className="value">5</div>
            </div>
            <div className="stat-card pink">
              <div className="label">Piano Cubicles:</div>
              <div className="value">8</div>
            </div>
            <div className="stat-card purple">
              <div className="label">Violins:</div>
              <div className="value">8</div>
            </div>
            <div className="stat-card purple">
              <div className="label">Guitar Cubicles:</div>
              <div className="value">3</div>
            </div>
            <div className="stat-card blue">
              <div className="label">MTL Cubicle:</div>
              <div className="value">1</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
