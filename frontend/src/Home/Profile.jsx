import React, { useState, useEffect } from 'react';
import './Profile.css';
// import './DailyLoginTracker.css';
import axios from 'axios';
import Navbbar from '../Navbar/Navbbar';

const Profile = () => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/user/loggedin')
      .then(response => {
        if (response.data) {
          console.log(response.data);
          setUser(response.data);
          setUserId(response.data.userId);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const generateWeeks = (days) => {
    const weeks = [];
    let week = [];
    days.forEach((day, index) => {
      week.push(day);
      if (week.length === 7 || index === days.length - 1) {
        weeks.push(week);
        week = [];
      }
    });
    return weeks;
  };

  // Static data for the entire year
  const days = Array.from({ length: 365 }, (_, index) => ({
    date: new Date(2024, 0, index + 1), // Assuming the year 2024
    loggedIn: Math.random() > 0.5 // Randomly setting loggedIn status
  }));

  // Generate months with days and weeks
  const months = Array.from({ length: 12 }, (_, monthIndex) => {
    const start = new Date(2024, monthIndex, 1);
    const end = new Date(2024, monthIndex + 1, 0);
    const monthDays = Array.from({ length: end.getDate() }, (_, dayIndex) => {
      const date = new Date(2024, monthIndex, dayIndex + 1);
      // Ensure the day has a loggedIn status
      const dayData = days.find(d => d.date.toDateString() === date.toDateString());
      return {
        date,
        loggedIn: dayData ? dayData.loggedIn : false
      };
    });
    return generateWeeks(monthDays);
  });

  return (
    <>
      <Navbbar />
      <div className="profile-overlay">
        <div className="profile-content">
          <div className="profile-table-container">
            <h2>Profile</h2>
            <table className="profile-table">
              <tbody>
                <tr>
                  <th>Email:</th>
                  <td>{user.email || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Username:</th>
                  <td>{user.username || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Mobile:</th>
                  <td>{user.mobileNumber || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Date of Joining:</th>
                  <td>{user.dateOfJoining || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Time of Joining:</th>
                  <td>{user.timeOfJoining || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="calendar-container">
            <h2>Daily Login Tracker</h2>
            <div className="calendar">
              {months.map((month, monthIndex) => (
                <div className="month" key={monthIndex}>
                  {month.map((week, weekIndex) => (
                    <div className="week" key={weekIndex}>
                      {week.map((day, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`day ${day.loggedIn ? 'logged-in' : ''}`}
                        >
                          {day.date.getDate()}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
