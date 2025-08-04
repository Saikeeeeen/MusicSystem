import React, { useState, useEffect, useRef } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './ActivityLog.css';
import { format } from 'date-fns';

const ActivityLog = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [showPicker, setShowPicker] = useState(false);
  const dateRangeRef = useRef(null);
  const [selectedTable, setSelectedTable] = useState('cubicles');
  const [data, setData] = useState([]);
  const [cubicleType, setCubicleType] = useState('All');
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:3001/activity-log`;
        const params = new URLSearchParams();
        params.append('table', selectedTable);
        if (selectedTable === 'cubicles' && cubicleType !== 'All') {
          params.append('type', cubicleType);
        }
        params.append('startDate', format(dateRange[0].startDate, 'yyyy-MM-dd'));
        params.append('endDate', format(dateRange[0].endDate, 'yyyy-MM-dd'));
        params.append('startTime', startTime);
        params.append('endTime', endTime);
        url += `?${params.toString()}`;

        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedTable, cubicleType, dateRange[0].startDate, dateRange[0].endDate, startTime, endTime]);

  const handleClickOutside = (event) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
      <main className="main-content" role="main" aria-label="Activity Log">
        <h1>Activity Log</h1>
        <p className="description">Track your room booking requests, instrument borrowing requests, confirmations, and updates—all in one place.</p>

        <section className="filters-box" aria-label="Filters">
          <div className="filters-header">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
</svg>
            Filters:
          </div>
          <div className="filter-buttons" role="group" aria-label="Filter by Cubicle type">
            <button type="button" onClick={() => setSelectedTable('cubicles')} className={selectedTable === 'cubicles' ? 'active' : ''}>Cubicles</button>
            <button type="button" onClick={() => setSelectedTable('instruments')} className={selectedTable === 'instruments' ? 'active' : ''}>Instrument</button>
          </div>
          <form className="filter-form" aria-label="Filter form">
            {(selectedTable === 'cubicles') && (
              <div className="filter-group">
                <label htmlFor="cubicle-type">Cubicle type</label>
                <div className="custom-select-wrapper">
                  <select id="cubicle-type" name="cubicle-type" className="custom-select" onChange={(e) => setCubicleType(e.target.value)} value={cubicleType}>
                    <option>All</option>
                    <option>Guitar</option>
                    <option>Piano</option>
                  </select>
                </div>
              </div>
            )}
            {(selectedTable === 'cubicles' || selectedTable === 'instruments') && (
              <div className="filter-group" ref={dateRangeRef}>
                <label htmlFor="date-range">Date</label>
                <div className="date-range-picker-wrapper">
                  <div className="date-range-input" onClick={() => setShowPicker(!showPicker)}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span>{`${format(dateRange[0].startDate, 'MM/dd/yyyy')} - ${format(dateRange[0].endDate, 'MM/dd/yyyy')}`}</span>
                  </div>
                  {showPicker && (
                    <div className="date-range-picker" style={{ position: 'absolute', zIndex: 1}}>
                      <DateRangePicker
                        onChange={item => {
                          setDateRange([item.selection]);
                        }}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={dateRange}
                        direction="horizontal"
                      />
                      <div style={{textAlign: 'right', padding: '10px'}}>
                        <button onClick={() => setShowPicker(false)} className="done-button">Done</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="filter-group">
              <label htmlFor="time-range">Time Range</label>
              <div className="time-range-inputs">
                <input type="time" id="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <span>-</span>
                <input type="time" id="end-time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div>
          </form>
        </section>

        <section className="table-section" aria-label="Activity log table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Yr & Sec</th>
                {selectedTable === 'cubicles' ? (
                  <>
                    <th>Cubicle Type</th>
                    <th>Cubicle No.</th>
                  </>
                ) : (
                  <>
                    <th>Instrument Type</th>
                    <th>Instrument No.</th>
                  </>
                )}
                <th>Time in</th>
                <th>Time out</th>
                <th>Hours Consumed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.yr_sec}</td>
                  <td>{row.item_type}</td>
                  <td>{row.item_number}</td>
                  <td>{(() => {
                    try {
                      return format(new Date(row.time_in), 'hh:mm a');
                    } catch (e) {
                      return 'N/A';
                    }
                  })()}</td>
                  <td>{(() => {
                    try {
                      return row.time_out ? format(new Date(row.time_out), 'hh:mm a') : 'N/A';
                    } catch (e) {
                      return 'N/A';
                    }
                  })()}</td>
                  <td>{row.total_hours !== undefined ? row.total_hours.toFixed(2) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default ActivityLog;