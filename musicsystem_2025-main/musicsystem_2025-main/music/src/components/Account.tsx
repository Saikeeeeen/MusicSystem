import React from 'react';
import './Account.css';

const Account = () => {
  return (
    <div className="account-container">
      <h2>Account Details</h2>
      <div className="subtitle">
        Manage your account details—including name, ID, role, and email—effortlessly in one secure place.
      </div>

      <div className="card">
        <div className="profile-section">
          <div className="avatar">
            <span></span>
          </div>
          <div className="profile-buttons">
            <button>
              <span></span> Upload Photo
            </button>
            <button>
              <span>️</span> Remove
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-title">Basic Information</div>
        <div className="basic-info-grid">
          <div className="form-group">
            <label htmlFor="name">NAME</label>
            <input type="text" id="name" value="Eric A. Moreno" readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="role">ROLE</label>
            <input type="text" id="role" value="Music Dean" readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input type="email" id="email" value="email @uic.edu.ph" readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="phone">PHONE NO.</label>
            <input type="text" id="phone" value="09123456789" readOnly />
          </div>
        </div>
        <button className="edit-btn">Edit</button>
        <div style={{ clear: 'both' }}></div>
      </div>

      <div className="card change-password-section">
        <div className="section-title">Change Password</div>
        <div style={{ fontSize: '0.97rem', color: '#444', marginBottom: '10px' }}>
          To keep your account secure, please remember to update your password regularly.
        </div>
        <div style={{ fontSize: '0.97rem', color: '#444' }}>
          Click the 'Change Password' button below to set a new password.
        </div>
        <button className="change-password-btn">Change Password</button>
        <div style={{ clear: 'both' }}></div>
      </div>
    </div>
  );
};

export default Account;