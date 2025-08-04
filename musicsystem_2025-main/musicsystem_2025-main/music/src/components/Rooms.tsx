import React, { useState, useEffect } from 'react';
import './Rooms.css';

const Rooms = () => {
  const [pianoPage, setPianoPage] = useState(1);
  const [guitarPage, setGuitarPage] = useState(1);
  const [mtlPage, setMtlPage] = useState(1);

  // Placeholder data for demonstration
  const pianoCubicles = [
    { id: 1, cubicleNo: 1, status: 'Occupied', name: 'Renz Xaviery O. Pastrana', yrSec: 'BSIT-2B', timeIn: '2025-03-15 10:30 AM' },
    { id: 2, cubicleNo: 2, status: 'Available', name: '-', yrSec: '-', timeIn: '-' },
    { id: 3, cubicleNo: 3, status: 'Occupied', name: 'Jane Doe', yrSec: 'BSCS-1A', timeIn: '2025-07-20 09:00 AM' },
    { id: 4, cubicleNo: 4, status: 'Available', name: '-', yrSec: '-', timeIn: '-' },
  ];

  const guitarCubicles = [
    { id: 1, cubicleNo: 1, status: 'Occupied', name: 'John Smith', yrSec: 'BSECE-3C', timeIn: '2025-07-20 11:00 AM' },
    { id: 2, cubicleNo: 2, status: 'Available', name: '-', yrSec: '-', timeIn: '-' },
    { id: 3, cubicleNo: 3, status: 'Occupied', name: 'Alice Johnson', yrSec: 'BSIT-4A', timeIn: '2025-07-20 01:00 PM' },
    { id: 4, cubicleNo: 4, status: 'Available', name: '-', yrSec: '-', timeIn: '-' },
    { id: 5, cubicleNo: 5, status: 'Available', name: '-', yrSec: '-', timeIn: '-' },
  ];

  const mtlCubicles = [
    { id: 1, cubicleNo: 1, status: 'Occupied', name: 'Bob Williams', yrSec: 'BSCS-2B', timeIn: '2025-07-20 02:30 PM' },
    { id: 2, cubicleNo: 2, status: 'Available', name: '-', yrSec: '-', timeIn: '-' },
  ];

  const itemsPerPage = 1;

  const paginate = (data, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <main className="main-content" role="main" aria-label="Room Overview">
        <h1>Room overview</h1>
        <p className="description">
          View all music room cubicles and their real-time status at a glance. Check which rooms are available or occupied to plan your practice or booking efficiently.
        </p>

        {/* Piano Cubicles */}
        <section className="table-section" aria-label="Piano Cubicles Table">
          <div className="section-header">
            <span className="icon-pink">
              {/* Piano SVG */}
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2 0v14h14V5H5zm2 2h2v8a1 1 0 1 1-2 0V7zm4 0h2v8a1 1 0 1 1-2 0V7zm4 0h2v8a1 1 0 1 1-2 0V7z"/></svg>
            </span>
            <span className="section-title">Piano Cubicles</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Cubicle No.</th>
                <th>Status</th>
                <th>Name</th>
                <th>Yr & Sec</th>
                <th>Time in</th>
              </tr>
            </thead>
            <tbody>
              {paginate(pianoCubicles, pianoPage).map((row) => (
                <tr key={row.id}>
                  <td>{row.cubicleNo}</td>
                  <td>{row.status}</td>
                  <td>{row.name}</td>
                  <td>{row.yrSec}</td>
                  <td>{row.timeIn.includes(' ') ? <>{row.timeIn.split(' ')[0]}<br/>{row.timeIn.split(' ')[1]} {row.timeIn.split(' ')[2]}</> : row.timeIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => setPianoPage(prev => Math.max(1, prev - 1))}>&lt;</button>
            <span>{pianoPage} of {Math.ceil(pianoCubicles.length / itemsPerPage)}</span>
            <button onClick={() => setPianoPage(prev => Math.min(Math.ceil(pianoCubicles.length / itemsPerPage), prev + 1))}>&gt;</button>
          </div>
        </section>

        {/* Guitar Cubicles */}
        <section className="table-section" aria-label="Guitar Cubicles Table">
          <div className="section-header">
            <span className="icon-pink">
              {/* Guitar SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-guitar-icon lucide-guitar"><path d="m11.9 12.1 4.514-4.514"/><path d="M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z"/><path d="m6 16 2 2"/><path d="M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z"/></svg>
            </span>
            <span className="section-title">Guitar Cubicles</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Cubicle No.</th>
                <th>Status</th>
                <th>Name</th>
                <th>Yr & Sec</th>
                <th>Time in</th>
              </tr>
            </thead>
            <tbody>
              {paginate(guitarCubicles, guitarPage).map((row) => (
                <tr key={row.id}>
                  <td>{row.cubicleNo}</td>
                  <td>{row.status}</td>
                  <td>{row.name}</td>
                  <td>{row.yrSec}</td>
                  <td>{row.timeIn.includes(' ') ? <>{row.timeIn.split(' ')[0]}<br/>{row.timeIn.split(' ')[1]} {row.timeIn.split(' ')[2]}</> : row.timeIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => setGuitarPage(prev => Math.max(1, prev - 1))}>&lt;</button>
            <span>{guitarPage} of {Math.ceil(guitarCubicles.length / itemsPerPage)}</span>
            <button onClick={() => setGuitarPage(prev => Math.min(Math.ceil(guitarCubicles.length / itemsPerPage), prev + 1))}>&gt;</button>
          </div>
        </section>

        {/* MTL Cubicle */}
        <section className="table-section" aria-label="MTL Cubicles Table">
          <div className="section-header">
            <span className="icon-pink">
              {/* MTL SVG (using a stylized guitar for demo) */}
                          <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M21.7 2.3a1 1 0 0 0-1.4 0l-2.3 2.3-1.3-1.3a1 1 0 1 0-1.4 1.4l1.3 1.3-8.6 8.6a4 4 0 1 0 1.4 1.4l8.6-8.6 1.3 1.3a1 1 0 0 0 1.4-1.4l-1.3-1.3 2.3-2.3a1 1 0 0 0 0-1.4zM7 19a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
            </span>
            <span className="section-title">MTL Cubicles</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Cubicle No.</th>
                <th>Status</th>
                <th>Name</th>
                <th>Yr & Sec</th>
                <th>Time in</th>
              </tr>
            </thead>
            <tbody>
              {paginate(mtlCubicles, mtlPage).map((row) => (
                <tr key={row.id}>
                  <td>{row.cubicleNo}</td>
                  <td>{row.status}</td>
                  <td>{row.name}</td>
                  <td>{row.yrSec}</td>
                  <td>{row.timeIn.includes(' ') ? <>{row.timeIn.split(' ')[0]}<br/>{row.timeIn.split(' ')[1]} {row.timeIn.split(' ')[2]}</> : row.timeIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => setMtlPage(prev => Math.max(1, prev - 1))}>&lt;</button>
            <span>{mtlPage} of {Math.ceil(mtlCubicles.length / itemsPerPage)}</span>
            <button onClick={() => setMtlPage(prev => Math.min(Math.ceil(mtlCubicles.length / itemsPerPage), prev + 1))}>&gt;</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Rooms;
