import React, { useState, useEffect } from 'react';
import './StudentInformation.css';

const StudentInformation = () => {
  const [selectedYear, setSelectedYear] = useState('Year');
  const [selectedSection, setSelectedSection] = useState('Section');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentData, setStudentData] = useState([]);

  // Placeholder data for demonstration
  const allStudents = [
    { id: 1, studentId: '230000001763', name: 'Renz Xaviery O. Pastrana', course: 'BSIT', yrSec: '2A', remainingTime: '6.12 hrs left', status: 'green' },
    { id: 2, studentId: '230000001764', name: 'Renz Xaviery O. Pastrana', course: 'BSIT', yrSec: '4A', remainingTime: '6 hrs left', status: 'green' },
    { id: 3, studentId: '230000001765', name: 'Renz Xaviery O. Pastrana', course: 'BSIT', yrSec: '3A', remainingTime: '3 hrs left', status: 'yellow' },
    { id: 4, studentId: '230000001766', name: 'Renz Xaviery O. Pastrana', course: 'BSIT', yrSec: '4A', remainingTime: '3.76 hrs left', status: 'yellow' },
    { id: 5, studentId: '230000001767', name: 'Renz Xaviery O. Pastrana', course: 'BSIT', yrSec: '1B', remainingTime: '0.5 hrs left', status: 'red' },
    { id: 6, studentId: '230000001768', name: 'Renz Xaviery O. Pastrana', course: 'BSIT', yrSec: '2B', remainingTime: '1.12 hrs left', status: 'orange' },
    { id: 7, studentId: '230000001769', name: 'Renz Xaviery O. Pastrana', course: 'BSIT', yrSec: '2B', remainingTime: '1.58 hrs left', status: 'orange' },
    { id: 8, studentId: '230000001770', name: 'Renz Xaviery O. Pastrana', course: 'BSIT', yrSec: '1B', remainingTime: '0.9 hrs left', status: 'red' },
    { id: 9, studentId: '230000001771', name: 'Renz Xaviery O. Pastrana', course: 'BSIT', yrSec: '2B', remainingTime: '3.12 hrs left', status: 'yellow' },
  ];

  useEffect(() => {
    let filteredData = allStudents;

    if (selectedYear !== 'Year') {
      filteredData = filteredData.filter(student => student.yrSec.startsWith(selectedYear));
    }

    if (selectedSection !== 'Section') {
      filteredData = filteredData.filter(student => student.yrSec.endsWith(selectedSection));
    }

    if (searchQuery) {
      filteredData = filteredData.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setStudentData(filteredData);
  }, [selectedYear, selectedSection, searchQuery]);

  return (
    <div className="student-information-container">
      <h2>Student Information</h2>
      <div className="desc">
        Keep all your student details—name, ID, section, year, and email—organized and accessible in one convenient place.
      </div>
      <div className="filters-box">
        <div className="filters-header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
          </svg>
          Filters:
        </div>
        <form className="filter-form">
          <div className="filter-group">
            <label htmlFor="year-select">Year</label>
            <select id="year-select" onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear}>
              <option>Year</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="section-select">Section</label>
            <select id="section-select" onChange={(e) => setSelectedSection(e.target.value)} value={selectedSection}>
              <option>Section</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="search-input">Search</label>
            <input type="text" id="search-input" placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
          </div>
        </form>
      </div>
      <div className="actions">
        <button className="add-student-btn">Add student</button>
        <button className="remove-student-btn">Remove student</button>
        <span className="search-bar">
          <input type="text" placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th>STUDENT ID</th>
            <th>NAME</th>
            <th>COURSE/PROGRAM</th>
            <th>YR&SEC</th>
            <th>REMAINING MTL SESSION TIME</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((student) => (
            <tr key={student.id} className={`row-${student.status}`}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>{student.course}</td>
              <td>{student.yrSec}</td>
              <td>{student.remainingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentInformation;
