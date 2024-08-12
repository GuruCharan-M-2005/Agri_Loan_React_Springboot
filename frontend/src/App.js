import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loginpg from './Loginpg/Login';
import Register from './Signuppg/Signup';
import Navbbar from './Navbar/Navbbar';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import MyApplications from './Application/MyApplications';
import LoanApplicationForm from './Application/ApplicationPage';
import AdminLogin from './Adminportal/Loginpage/AdminLogin';

import Adminportal from './Adminportal/Adminportal';
import LoanApplications from './Adminportal/components/LoanApplications';
import Users from './Adminportal/components/Users';
import Contact from './Contact/Contact';
import RepaymentTracking from './Adminportal/components/RepaymentTracking';
import Profile from './Home/Profile';
import LoanTracker from './Home/LoanTracker';


function App() {
  const [submittedApplications, setSubmittedApplications] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path='/user/login' element={<Loginpg />} />
          <Route path='/' element={<Home />} />
          <Route path='/loantracker' element={<LoanTracker />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin/home' element={<Adminportal />} />
          <Route path='/Signup' element={<Register />} />
          <Route path='/Navbar' element={<Navbbar />} />
          <Route path='/Footer' element={<Footer />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<Adminportal />} />
          <Route path='/admin/LoanApplications' element={<LoanApplications />} />
          <Route path='/admin/repaymentTracking' element={<RepaymentTracking />} />
          <Route path='/admin/Users' element={<Users />} />
          <Route
            path="/apply"
            element={<LoanApplicationForm setSubmittedApplications={setSubmittedApplications} />}
          />
          <Route
            path="/my-applications"
            element={<MyApplications applications={submittedApplications} />}
          />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
